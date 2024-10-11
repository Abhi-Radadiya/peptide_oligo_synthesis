import React, { useState } from "react";
import Amedite from "../Module/Amedite/Amedite";
import Reagent from "../Module/Reagent/Reagent";
import { Tabs } from "../../../../Components/Tabs/Tab";

export default function BottleMapping() {
    const tabs = [
        { label: "Amedite", value: "amedite" },
        { label: "Reagent", value: "reagent" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <>
            <Tabs setActiveTab={setActiveTab} tabs={tabs} className="mb-4" />

            {activeTab == tabs[0].value ? <Amedite /> : <Reagent />}
        </>
    );
}
