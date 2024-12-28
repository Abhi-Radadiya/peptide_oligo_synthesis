import React, { useState } from "react";
import { Tabs } from "../../../Components/Tabs/Tab";
import Amedite from "./Tab/Amedite/Amedite";
import Solvent from "./Tab/Solvent/Solvent";

export default function Prime() {
    const tabs = [
        { label: "Amedite", value: "amedite" },
        { label: "Solvent", value: "solvent" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4" />
            {activeTab === tabs[0].value ? <Amedite /> : <Solvent />}
        </>
    );
}
