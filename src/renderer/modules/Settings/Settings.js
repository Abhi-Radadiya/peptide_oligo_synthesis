import React, { useState } from "react";
import BottleMapping from "./BottleMapping/BottleMapping";
import Prime from "./Prime/Prime";
import LiquidDetection from "./LiquidDetection/LiquidDetection";
import UVSetting from "./UVSetting/UVSetting";
import Pressure from "./Pressure/Pressure";
import Configuration from "./BottleMapping/Components/Configuration";
import { Tabs } from "../../Components/Tabs/Tab";

export default function Settings() {
    const tabs = [
        { label: "Bottle Mapping", value: "bottleMapping", component: BottleMapping },
        { label: "Prime", value: "prime", component: Prime },
        { label: "Liquid Detection", value: "liquidDetection", component: LiquidDetection },
        { label: "UV Setting", value: "uvSetting", component: UVSetting },
        { label: "Pressure", value: "pressure", component: Pressure },
        { label: "Configuration", value: "configuration", component: Configuration },
    ];

    const [activeTab, setActiveTab] = useState(tabs[4].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4 pb-4 border-b border-neutral-300" />
            <ComponentToRender />
        </>
    );
}