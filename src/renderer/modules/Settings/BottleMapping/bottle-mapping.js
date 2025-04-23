import React, { useState } from "react"
import { Tabs } from "../../../Components/Tabs/Tab"
import Solvent from "./Tab/Solvent/Solvent"
import AmediteBottleMapping from "./Tab/amedite-bottle-mapping/amedite-bottle-mapping"
import { Selection } from "../../../Components/Dropdown/Dropdown"

export default function Prime() {
    const tabs = [
        { label: "Amedite", value: "amedite" },
        { label: "Solvent", value: "solvent" }
    ]

    const [activeTab, setActiveTab] = useState(tabs[0].value)

    const blockMenuItems = [
        { label: "Block 1", value: 1 },
        { label: "Block 2", value: 2 },
        { label: "Block 3", value: 3 }
    ]

    const [selectedBlock, setSelectedBlock] = useState({ label: "Block 1", value: 1 })

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4" />
                {/* {activeTab === tabs[0].value && <Selection onChange={setSelectedBlock} menuItem={blockMenuItems} value={selectedBlock} isClearable={false} width={200} />}{" "} */}
            </div>

            {activeTab === tabs[0].value ? <AmediteBottleMapping selectedBlock={selectedBlock.value} /> : <Solvent />}
        </>
    )
}
