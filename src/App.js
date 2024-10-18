import React, { useState } from "react";
import { Tabs } from "./renderer/Components/Tabs/Tab";
import Settings from "./renderer/modules/Settings/Settings";
import MethodSetup from "./renderer/modules/MethodSetup/MethodSetup";

export default function App() {
    const tabs = [
        { label: "Method Setup", value: "methodSetup", component: MethodSetup },
        { label: "Settings", value: "settings", component: Settings },
    ];

    const [activeTab, setActiveTab] = useState(tabs[1].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    return (
        <>
            <div className="p-4">
                <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4 pb-4 border-b border-neutral-300" />

                <ComponentToRender />
            </div>
        </>
    );
}
