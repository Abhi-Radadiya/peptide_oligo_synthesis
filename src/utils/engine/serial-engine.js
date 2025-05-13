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
        this.universalDelayTime = 0
    }

    setUniversalDelayTime(ms) {
        this.universalDelayTime = ms
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

        this._log({ type: "sent", content: cmd, time: performance.now() })

        const response = invoke("send_serial_command", { command: cmd })

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

            const handlerKey = this._getCommandType(command)

            const handler = this._handlers[handlerKey] || this._handlers.DEFAULT

            await new Promise((res) => setTimeout(res, this.universalDelayTime))

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

        this._log({ type: "Hold start", content: "Holded", time: performance.now() })

        await new Promise((res) => setTimeout(res, time))

        this._log({ type: "Hold End", content: "Hold over", time: performance.now() })
    }

    async _handleDefault(command) {
        this.sendCommand(command)
    }

    // Custom SN/SL handler (delay after sending)
    async _handleWithDelay(command) {
        this.sendCommand(command)

        const parts = command.replace(";", "").split(",")
        const delay = parseInt(parts[parts.length - 1], 10)

        if (!isNaN(delay)) {
            try {
                this._log({ type: "Serail sensor started", content: "*****", time: performance.now() })
                const result = await invoke("read_serial_response_within", { ms: delay })
                this._log({ type: "Close sensor", content: "*****", time: performance.now() })

                if (result == "true") return
                if (result == "false" || result === null) {
                    this._log({ type: "abort", content: "Aborted due to false or no response during delay", time: performance.now() })
                    this.stop()
                }
            } catch (err) {
                this._log({ type: "error", content: err.toString(), time: performance.now() })
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
