import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./renderer/modules/Settings/Settings";
import MethodSetup2 from "./renderer/modules/MethodSetup2/MethodSetup2";
import NavigationPanel from "./renderer/Components/Navigation/NavigationPanel";
import Methods from "./renderer/modules/Methods/Methods";

export default function App() {
    const [isNavOpen, setIsNavOpen] = useState(true);

    return (
        <Router>
            <NavigationPanel isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
            <div className={`p-4 transition-all duration-300 ${isNavOpen ? "ml-64" : "ml-0"} overflow-auto h-screen scrollbar-style`}>
                <Routes>
                    <Route path="/method-setup/:id" element={<MethodSetup2 />} />
                    <Route path="/method-setup" element={<Methods />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
}
