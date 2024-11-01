import React, { useState } from "react";
import { Tabs } from "./renderer/Components/Tabs/Tab";
import Settings from "./renderer/modules/Settings/Settings";
import MethodSetup2 from "./renderer/modules/MethodSetup2/MethodSetup2";
//remove method setup if need to

export default function App() {
    const tabs = [
        { label: "Method Setup", value: "methodSetup", component: MethodSetup2 },
        { label: "Settings", value: "settings", component: Settings },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

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
