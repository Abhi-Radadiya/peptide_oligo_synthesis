import React, { createContext, useContext, useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"

const SerialContext = createContext(undefined)

export const SerialProvider = ({ children }) => {
    const [ports, setPorts] = useState([])
    const [selectedPort, setSelectedPort] = useState(null)

    const refreshPorts = async () => {
        try {
            const res = await invoke("list_serial_ports")
            setPorts(res)
        } catch (err) {
            console.error("Error listing ports", err)
            setPorts([])
        }
    }

    const closePort = async () => {
        await invoke("close_serial_port")
        setSelectedPort(null)
    }

    const openPort = async (port) => {
        if (!port) throw new Error("No port selected")
        closePort()
        const res = await invoke("set_serial_port", { portName: port })
        setSelectedPort(port)

        return res
    }

    const sendCommand = async (cmd) => {
        if (!selectedPort) throw new Error("No port selected")

        const res = await invoke("send_serial_command", { command: cmd })

        return res
    }

    useEffect(() => {
        refreshPorts()
    }, [])

    return <SerialContext.Provider value={{ ports, selectedPort, refreshPorts, closePort, sendCommand, openPort }}>{children}</SerialContext.Provider>
}

export const useSerialContext = () => {
    const ctx = useContext(SerialContext)
    if (!ctx) throw new Error("useSerialContext must be used inside <SerialProvider>")
    return ctx
}
