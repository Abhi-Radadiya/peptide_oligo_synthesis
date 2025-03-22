import React, { useState } from "react";
import { Tabs } from "../../../Components/Tabs/Tab";
import AmediteSetup from "./components/amedite-setup";
import BoardConfiguration from "./components/board-configuration";

export default function HardwareSetup() {
    const tabs = [
        { label: "Board Configuration", value: "boardConfiguration" },
        { label: "Valve Configuration", value: "solvent" }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4" />

            <div className="h-[calc(100vh-200px)] -mr-3 pr-4 overflow-auto scrollbar-style">{activeTab === tabs[0].value ? <BoardConfiguration /> : <AmediteSetup />}</div>
        </>
    );
}
