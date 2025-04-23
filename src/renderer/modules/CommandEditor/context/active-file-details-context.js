import React, { createContext, useContext, useState } from "react"

const ActiveFileDetailsContext = createContext()

export const UseActiveFileDetailsProvider = ({ children }) => {
    const initialFileDetails = { activeId: null, name: "", commands: [] }
    const [fileDetails, setFileDetails] = useState(initialFileDetails)

    return <ActiveFileDetailsContext.Provider value={{ fileDetails, setFileDetails }}>{children}</ActiveFileDetailsContext.Provider>
}

export const UseActiveFileDetails = () => {
    return useContext(ActiveFileDetailsContext)
}
