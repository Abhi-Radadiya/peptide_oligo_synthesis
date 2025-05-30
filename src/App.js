import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import NotifyToaster from "./renderer/modules/NotifyToaster/NotifyToaster"
import TabNavigation, { RouteHandler, TabProvider } from "./renderer/Components/Navigation/TabNavigation"
import { SerialEngineProvider } from "./utils/context/serial-engine-context"
import { NavigationProvider } from "./utils/context/navigation-provider"

export default function App() {
    return (
        <>
            <NotifyToaster />

            <Router>
                <NavigationProvider>
                    <SerialEngineProvider>
                        <TabProvider>
                            <div className={`transition-all duration-300 overflow-hidden h-screen bg-gradient-to-br from-slate-50 to-amber-50`}>
                                <RouteHandler />
                                <TabNavigation />
                            </div>
                        </TabProvider>
                    </SerialEngineProvider>
                </NavigationProvider>
            </Router>
        </>
    )
}
