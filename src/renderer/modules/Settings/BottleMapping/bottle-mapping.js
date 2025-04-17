import React, { useState } from "react"
import { Tabs } from "../../../Components/Tabs/Tab"
import Solvent from "./Tab/Solvent/Solvent"
import AmediteBottleMapping from "./Tab/amedite-bottle-mapping/amedite-bottle-mapping"

export default function Prime() {
    const tabs = [
        { label: "Amedite", value: "amedite" },
        { label: "Solvent", value: "solvent" }
    ]

    const [activeTab, setActiveTab] = useState(tabs[0].value)

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4" />
            {activeTab === tabs[0].value ? <AmediteBottleMapping /> : <Solvent />}
        </>
    )
}
