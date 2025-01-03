import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./renderer/modules/Settings/Settings";
import NavigationPanel from "./renderer/Components/Navigation/NavigationPanel";
import Methods from "./renderer/modules/Methods/Methods";
import MotorTesting from "./renderer/modules/MotorTesting/MotorTesting";
import Sequence from "./renderer/modules/Sequence/Sequence";
import AvailableSequence from "./renderer/modules/AvailableSequence/AvailableSequence";
import SequenceCreation from "./renderer/modules/SequenceCreation/SequenceCreation";
import MethodSetting from "./renderer/modules/MethodSetup2/MethodSetting";
import NotifyToaster from "./renderer/modules/NotifyToaster/NotifyToaster";

export default function App() {
    const [isNavOpen, setIsNavOpen] = useState(true);

    return (
        <>
            <NotifyToaster />

            <Router>
                <NavigationPanel isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

                <div
                    className={`transition-all duration-300 ${
                        isNavOpen ? "ml-64" : "ml-0"
                    } overflow-auto h-screen scrollbar-style bg-gradient-to-br from-slate-50 to-amber-50`}
                >
                    <Routes>
                        <Route path="/method-setup" element={<Methods />} />
                        <Route path="/method-setting/:id" element={<MethodSetting />} />
                        <Route path="/method-setting" element={<MethodSetting />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/sequence" element={<Sequence />} />
                        <Route path="/available-sequence" element={<AvailableSequence />} />
                        <Route path="/sequence-editor/new" element={<SequenceCreation />} />
                        <Route path="/sequence-editor/:id" element={<SequenceCreation />} />
                        <Route index element={<Methods />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}
