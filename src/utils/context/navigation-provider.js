import { createContext, useContext, useState } from "react"

const NavigationContext = createContext()

export const NavigationProvider = ({ children }) => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(true)

    return <NavigationContext.Provider value={{ isNavbarOpen, setIsNavbarOpen }}>{children}</NavigationContext.Provider>
}

export const useNavigationPanel = () => {
    const ctx = useContext(NavigationContext)
    if (!ctx) throw new Error("useNavigationPanel must be used within <NavigationProvider>")
    return ctx
}
