import React, { useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import NavigationPanel from "./renderer/Components/Navigation/NavigationPanel"
import NotifyToaster from "./renderer/modules/NotifyToaster/NotifyToaster"
import TabNavigation, { RouteHandler, TabProvider } from "./renderer/Components/Navigation/TabNavigation"
import { SerialProvider } from "./utils/context/serial-context"

export default function App() {
    const [isNavOpen, setIsNavOpen] = useState(false)

    return (
        <>
            <NotifyToaster />

            <Router>
                <SerialProvider>
                    <TabProvider>
                        {isNavOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsNavOpen(false)} />}

                        <NavigationPanel isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

                        <div className={`transition-all duration-300 overflow-hidden h-screen bg-gradient-to-br from-slate-50 to-amber-50`}>
                            <RouteHandler />
                            <TabNavigation isNavOpen={isNavOpen} />
                        </div>
                    </TabProvider>
                </SerialProvider>
            </Router>
        </>
    )
}
