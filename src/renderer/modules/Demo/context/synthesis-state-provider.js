import React, { createContext, useContext, useState } from "react"
import { useSelector } from "react-redux"

const SynthesisStateContext = createContext()

export const SynthesisStateProvider = ({ children }) => {
    const [selectedSynthesisCommand, setSelectedSynthesisCommand] = useState(null)

    const { commands } = useSelector((state) => state.commands)

    const commandProcedureMenuItem = commands.map((el) => ({ label: el.name, id: el.id }))

    return <SynthesisStateContext.Provider value={{ selectedSynthesisCommand, setSelectedSynthesisCommand, commandProcedureMenuItem }}>{children}</SynthesisStateContext.Provider>
}

export const UseSynthesisStateProvider = () => {
    return useContext(SynthesisStateContext)
}
