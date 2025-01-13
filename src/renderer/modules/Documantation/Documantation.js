import React, { useState } from "react";
import { Tabs } from "../../Components/Tabs/Tab";
import Setting from "./Tabs/Setting/Setting";
import MethodSetup from "./Tabs/MethodSetup/MethodSetup";
import AvailableSequence from "./Tabs/AvailableSequence/AvailableSequence";
import Synthesis from "./Tabs/Synthesis/Synthesis";

export default function Documantation() {
    const tabs = [
        { label: "Setting", value: "setting", component: Setting },
        { label: "Method Setup", value: "methodSetup", component: MethodSetup },
        { label: "Sequence", value: "sequence", component: AvailableSequence },
        { label: "Synthesis", value: "synthesis", component: Synthesis },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    return (
        <>
            <div className="px-4 pb-4">
                <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4 py-4 border-b border-neutral-300 sticky top-0 bg-white z-10" />

                <ComponentToRender />
            </div>
        </>
    );
}
