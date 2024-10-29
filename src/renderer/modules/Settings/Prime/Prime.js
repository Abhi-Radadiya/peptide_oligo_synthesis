import React, { useState } from "react";
import { Tabs } from "../../../Components/Tabs/Tab";
import Amedites from "./Components/Amedites";
import Solvents from "./Components/Solvents";

export default function Prime() {
    const tabs = [
        { label: "Amedites", value: "amedites" },
        { label: "Solvents", value: "solvents" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4" />
            {activeTab == tabs[0].value ? <Amedites /> : <Solvents />}
        </>
    );
}
