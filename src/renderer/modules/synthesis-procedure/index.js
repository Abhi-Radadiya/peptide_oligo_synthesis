import React, { useState } from "react"
import { Tabs } from "../../Components/Tabs/Tab"
import CreateSynthesisProcedure from "./create-synthesis-procedure"
import ProcedureList from "./procedure-list/index.js"

export default function SynthesisProcedure() {
    const tabs = [
        { label: "Procedure List", value: "procedureList" },
        { label: "Create Procedure", value: "createProcedure" }
    ]

    const [activeTab, setActiveTab] = useState(tabs[0].value)

    return (
        <>
            <div className="p-4">
                <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4" />

                {activeTab === tabs[0].value ? <ProcedureList /> : <CreateSynthesisProcedure />}
            </div>
        </>
    )
}
