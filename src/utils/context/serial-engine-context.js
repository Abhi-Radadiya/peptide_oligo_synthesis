import { createContext, useContext, useRef } from "react"
import { SerialEngine } from "../engine/serial-engine"

const EngineContext = createContext()

export const SerialEngineProvider = ({ children }) => {
    const engineRef = useRef(new SerialEngine())

    return <EngineContext.Provider value={engineRef.current}>{children}</EngineContext.Provider>
}

export const useSerialEngine = () => {
    const ctx = useContext(EngineContext)
    if (!ctx) throw new Error("useSerialEngine must be used within <SerialEngineProvider>")
    return ctx
}
