import React, { useState } from "react";
import { Tabs } from "../../../../Components/Tabs/Tab";
import AmediteConfiguration from "../Module/Amedite/AmediteConfiguration";
import ReagentConfiguration from "../Module/Reagent/ReagentConfiguration";
import SolventConfiguration from "../Module/Solvent/SolventConfiguration";

export default function Configuration() {
    const tabs = [
        { label: "Amedite", value: "amedite" },
        { label: "Reagent", value: "reagent" },
        { label: "Solvent", value: "solvent" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <>
            <Tabs setActiveTab={setActiveTab} tabs={tabs} className="mb-4" />

            {activeTab == tabs[0].value ? <AmediteConfiguration /> : activeTab == tabs[1].value ? <ReagentConfiguration /> : <SolventConfiguration />}
        </>
    );
}
