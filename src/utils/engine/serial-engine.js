import { invoke } from "@tauri-apps/api/core"

export class SerialEngine {
    constructor() {
        this.ports = []
        this.selectedPort = null
        this.running = false
        this.paused = false
        this.stopped = false
        this.loop = false

        this._currentIndex = 0
        this._commands = []
        this._resolvePause = null

        this._handlers = {
            HOLD: this._handleHold.bind(this),
            DEFAULT: this._handleDefault.bind(this)
        }
        this._handlers["SN"] = this._handleWithDelay.bind(this)
        this._handlers["SL"] = this._handleWithDelay.bind(this)

        this._logger = null
    }

    setLogger(fn) {
        this._logger = fn
    }

    _log(entry) {
        if (this._logger) {
            this._logger(entry)
        }
    }

    // SERIAL METHODS
    async refreshPorts() {
        try {
            const res = await invoke("list_serial_ports")
            this.ports = res
            return res
        } catch (err) {
            this.ports = []
            throw err
        }
    }

    async openPort(port) {
        if (!port) throw new Error("No port selected")
        await this.closePort()
        await invoke("set_serial_port", { portName: port })
        this.selectedPort = port
    }

    async closePort() {
        await invoke("close_serial_port").catch(() => {})
        this.selectedPort = null
    }

    async sendCommand(cmd) {
        if (!this.selectedPort) throw new Error("No port selected")

        this._log({ type: "sent", content: cmd })
        const response = await invoke("send_serial_command", { command: cmd })
        this._log({ type: "response", content: response })

        return response
    }

    getPorts() {
        return this.ports
    }

    getSelectedPort() {
        return this.selectedPort
    }

    // FLOW EXECUTION METHODS
    async run(commands, { loop = false } = {}) {
        if (!Array.isArray(commands)) throw new Error("Commands must be an array")

        this._commands = commands
        this._currentIndex = 0
        this.running = true
        this.paused = false
        this.stopped = false
        this.loop = loop

        do {
            await this._execute()
        } while (this.loop && !this.stopped)
    }

    async _execute() {
        while (this._currentIndex < this._commands.length) {
            if (this.stopped) break
            if (this.paused) {
                await new Promise((resolve) => (this._resolvePause = resolve))
            }

            const command = this._commands[this._currentIndex++]

            console.log(`command : `, command)

            const handlerKey = this._getCommandType(command)

            const handler = this._handlers[handlerKey] || this._handlers.DEFAULT

            await handler(command)
        }

        this.running = false
    }

    _getCommandType(command) {
        if (command.startsWith("HOLD")) return "HOLD"
        const parts = command.split(",")
        if (parts.length > 3 && (parts[2] === "SN" || parts[2] === "SL")) return parts[2]
        return "DEFAULT"
    }

    async _handleHold(command) {
        const [, timeStr] = command.split(" ")
        const time = parseInt(timeStr, 10) || 0
        await new Promise((res) => setTimeout(res, time))
    }

    async _handleDefault(command) {
        console.log(`Sending: ${command}`)
        await this.sendCommand(command)
    }

    // Custom SN/SL handler (delay after sending)
    async _handleWithDelay(command) {
        const response = await this.sendCommand(command)

        const parts = command.replace(";", "").split(",")
        const delay = parseInt(parts[parts.length - 1], 10)

        if (!isNaN(delay)) {
            try {
                const result = await invoke("read_serial_response_within", { ms: delay })

                console.log(`result : `, `${result}`, `${result === true}`)

                this._log({ type: "response", content: `Delay read: ###${result}xxx` })

                if (result == "true") return
                if (result == "false" || result === null) {
                    this.stop()
                    this._log({ type: "abort", content: "Aborted due to false or no response during delay" })
                }
            } catch (err) {
                this._log({ type: "error", content: err.toString() })
                this.stop()
            }
        }
    }

    pause() {
        if (!this.running || this.paused) return
        this.paused = true
    }

    resume() {
        if (!this.paused) return
        this.paused = false
        if (this._resolvePause) {
            this._resolvePause()
            this._resolvePause = null
        }
    }

    stop() {
        this.running = false
        this.paused = false
        this.stopped = true
        this._commands = []
        this._currentIndex = 0
        if (this._resolvePause) {
            this._resolvePause()
            this._resolvePause = null
        }
    }
}
