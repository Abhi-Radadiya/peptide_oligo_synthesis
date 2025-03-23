import React, { useState } from "react";
import { Tabs } from "../../../Components/Tabs/Tab";
import ValveSetup from "./components/valve-setup";
import BoardConfiguration from "./components/board-configuration";

export default function HardwareSetup() {
    const tabs = [
        { label: "Board Configuration", value: "boardConfiguration" },
        { label: "Valve Configuration", value: "solvent" }
    ];

    const [activeTab, setActiveTab] = useState(tabs[1].value);

    return (
        <>
            <div className="border-b border-neutral-300 mb-4">
                <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4" />
            </div>

            <div className="h-[calc(100vh-200px)] -mr-3 pr-4 overflow-auto scrollbar-style">{activeTab === tabs[0].value ? <BoardConfiguration /> : <ValveSetup />}</div>
        </>
    );
}
