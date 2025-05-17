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

        // this._log({ type: "sent", content: cmd, time: performance.now() })

        const response = invoke("send_serial_command", { command: cmd })

        return response
    }

    getPorts() {
        return this.ports
    }

    getSelectedPort() {
        return this.selectedPort
    }

    async _handleHold(timeToHold) {
        await new Promise((res) => setTimeout(res, timeToHold))
    }

    async run(commandObj, { loop = false } = {}) {
        if (!commandObj || typeof commandObj !== "object" || Array.isArray(commandObj) || !Object.keys(commandObj).length) {
            throw new Error("Commands must be a non-empty object of arrays")
        }

        this.running = true
        this.stopped = false
        this.paused = false
        this.loop = loop

        const threadKeys = Object.keys(commandObj)
        const maxLen = Math.max(...threadKeys.map((k) => commandObj[k].length))

        do {
            const threadPromises = threadKeys.map(async (key) => {
                let chain = Promise.resolve() // Start an independent promise chain for each thread

                for (let i = 0; i < maxLen; i++) {
                    const cmd = commandObj[key][i] ?? null

                    // Immediately chain the next command to the thread's current promise
                    chain = chain
                        .then(async () => {
                            if (!cmd) {
                                return
                            }

                            // If it's a HOLD, we await it; otherwise we _executeCommand
                            if (/^HOLD\s*\d+;?$/.test(cmd)) {
                                const ms = parseInt(cmd.match(/\d+/)[0], 10)

                                this._log({
                                    type: "Execution started",
                                    content: `Command: ${cmd}`,
                                    time: performance.now(),
                                    thread: Number(key.at(-1))
                                })

                                await this._handleHold(ms)
                            } else {
                                console.log(`cmd : `, cmd)
                                // this._log({
                                //     type: "Execution started",
                                //     content: `Command: ${cmd}`,
                                //     time: performance.now(),
                                //     thread: Number(key.at(-1))
                                // })

                                await this._executeCommand(cmd, Number(key.at(-1)))
                            }
                        })
                        .catch((error) => {
                            console.error(`Thread ${key} error at index ${i}:`, error)
                            this.stopped = true
                            throw error
                        })
                }
                return chain // Return the final promise for this thread
            })

            // Wait for all threads to complete their entire sequence of commands
            // in this pass before potentially looping again.
            await Promise.all(threadPromises)

            console.log("--- All threads completed one full pass ---")
        } while (this.loop && !this.stopped)

        this.running = false
        console.log("Command processor finished.")
    }

    async _executeCommand(cmd, thread) {
        const type = this._getCommandType(cmd)

        switch (type) {
            case "HOLD":
                return await this._handleHold(cmd)
            case "SN":
            case "SL":
                return await this._handleWithDelay(cmd, thread)
            default:
                return await this._handleDefault(cmd, thread)
        }
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

    async _handleDefault(command, thread) {
        this._log({
            type: "Execution started",
            content: `Command: ${command}`,
            time: performance.now(),
            thread
        })
        this.sendCommand(command)
    }

    // Custom SN/SL handler (delay after sending)
    async _handleWithDelay(command, thread) {
        this.sendCommand(command)

        const parts = command.replace(";", "").split(",")

        const delay = parseInt(parts[parts.length - 1], 10)

        if (!isNaN(delay)) {
            try {
                // const result = await invoke("read_serial_response_within", { ms: delay })
                this._log({
                    type: "Execution started",
                    content: `Command: ${command}`,
                    time: performance.now(),
                    thread
                })

                this.sendCommand(command)
                await new Promise((res) => setTimeout(res, delay))
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
