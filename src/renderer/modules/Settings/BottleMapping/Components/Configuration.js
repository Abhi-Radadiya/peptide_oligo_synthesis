import React, { useState } from "react";
import { Tabs } from "../../../../Components/Tabs/Tab";
import AmediteConfiguration from "../Module/Amedite/AmediteConfiguration";
import ReagentConfiguration from "../Module/Reagent/ReagentConfiguration";

export default function Configuration() {
    const tabs = [
        { label: "Amedite", value: "amedite" },
        { label: "Solvent", value: "solvent" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4" />

            {activeTab === tabs[0].value ? <AmediteConfiguration /> : <ReagentConfiguration />}
        </>
    );
}
