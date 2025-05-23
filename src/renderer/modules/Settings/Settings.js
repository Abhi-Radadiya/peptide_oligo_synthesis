import React, { useState } from "react"
import BottleMapping from "./BottleMapping/bottle-mapping.js"
import Prime from "./Prime/Prime"
import LiquidDetection from "./LiquidDetection/LiquidDetection"
import UVSetting from "./UVSetting/UVSetting"
import Pressure from "./Pressure/Pressure"
import ColumnEditor from "./ColumnEditor/ColumnEditor"
import Configuration from "./Configuration/Configuration"
import ApplicationData from "./ApplicationData/ApplicationData.js"
import HardwareSetup from "./hardware-setup/hardware-setup"
import { Tabs } from "../../Components/Tabs/Tab"

export default function Settings() {
    const tabs = [
        { label: "Hardware Setup", value: "hardwareSetup", component: HardwareSetup },
        { label: "Bottle Mapping", value: "bottleMapping", component: BottleMapping },
        { label: "Prime", value: "prime", component: Prime },
        // { label: "Liquid Detection", value: "liquidDetection", component: LiquidDetection },
        // { label: "UV Setting", value: "uvSetting", component: UVSetting },
        { label: "Pressure", value: "pressure", component: Pressure },
        { label: "Column Editor", value: "columnEditor", component: ColumnEditor },
        { label: "Configuration", value: "configuration", component: Configuration },
        { label: "Application Data", value: "applicationData", component: ApplicationData }
    ]

    const [activeTab, setActiveTab] = useState(tabs[0].value)

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component

    return (
        <>
            <div className="px-4 pb-4">
                <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4 py-4 border-b border-neutral-500 sticky top-0 bg-white z-10 -mx-4 px-4" />

                <ComponentToRender />
            </div>
        </>
    )
}
