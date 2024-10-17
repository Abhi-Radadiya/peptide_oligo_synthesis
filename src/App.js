import React, { useState } from "react";
import { Tabs } from "./renderer/Components/Tabs/Tab";
import BottleMapping from "../src/renderer/modules/Settings/BottleMapping/BottleMapping";
import Prime from "../src/renderer/modules/Settings/Prime/Prime";
import LiquidDetection from "../src/renderer/modules/Settings/LiquidDetection/LiquidDetection";
import UVSetting from "../src/renderer/modules/Settings/UVSetting/UVSetting";
import Configuration from "./renderer/modules/Settings/BottleMapping/Components/Configuration";

export default function App() {
    const tabs = [
        { label: "Bottle Mapping", value: "bottleMapping", component: BottleMapping },
        { label: "Prime", value: "prime", component: Prime },
        { label: "Liquid Detection", value: "liquidDetection", component: LiquidDetection },
        { label: "UV Setting", value: "uvSetting", component: UVSetting },
        { label: "Configuration", value: "configuration", component: Configuration },
    ];

    const [activeTab, setActiveTab] = useState(tabs[3].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4 pb-4 border-b border-neutral-300" />
            <ComponentToRender />
        </>
    );
}
