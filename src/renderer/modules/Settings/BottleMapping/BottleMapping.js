import React, { useState } from "react";
import Configuration from "./Components/Configuration";
import { Tabs } from "../../../Components/Tabs/Tab";
import Position from "./Components/Position";

export default function BottleMapping() {
    const tabs = [
        { label: "Position", value: "positions" },
        { label: "Configuration", value: "configuration" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    console.log(`activeTab : `, activeTab);

    return (
        <>
            <Tabs setActiveTab={setActiveTab} tabs={tabs} className="mb-4 pb-4 border-b border-neutral-300" />

            {activeTab == tabs[0].value ? <Position /> : <Configuration />}
        </>
    );
}
