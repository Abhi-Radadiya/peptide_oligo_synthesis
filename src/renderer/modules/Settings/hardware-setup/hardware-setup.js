import React, { useState } from "react"
import { Tabs } from "../../../Components/Tabs/Tab"
import HardwareAssignment from "./components/hardware-assignment"
import BoardConfiguration from "./components/board-configuration"
import { Button } from "../../../Components/Buttons/Buttons"
import { HardDrive } from "lucide-react"

export default function HardwareSetup() {
    const tabs = [
        { label: "Board Configuration", value: "boardConfiguration" },
        { label: "Valve Configuration", value: "solvent" }
    ]

    const [activeTab, setActiveTab] = useState(tabs[1].value)

    return (
        <>
            <div className="border-b border-neutral-300 mb-4 flex flex-row justify-between pb-4">
                <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} />

                {/* TODO : while running test check if any valve assign twice ? */}
                {activeTab === tabs[1].value && <Button label="Run Hardware Test" bgClassName="bg-[#10B981] text-white" leftIcon={<HardDrive color="white" />} />}
            </div>

            <div className="h-[calc(100vh-200px)] -mr-3 pr-4 overflow-auto scrollbar-style">{activeTab === tabs[0].value ? <BoardConfiguration /> : <HardwareAssignment />}</div>
        </>
    )
}
