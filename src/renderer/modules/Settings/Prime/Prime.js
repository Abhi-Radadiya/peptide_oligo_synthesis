import React, { useState } from "react";
import { Tabs } from "../../../Components/Tabs/Tab";
import Amedites from "./Components/Amedites";

export default function Prime() {
    const tabs = [
        { label: "Amedites", value: "amedites" },
        { label: "Solvents", value: "solvents" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <>
            <Tabs setActiveTab={setActiveTab} tabs={tabs} className="mb-4 pb-4 border-b border-neutral-300" />

            {activeTab == tabs[0].value ? <Amedites /> : <React.Fragment />}
        </>
    );
}