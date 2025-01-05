import React, { useState } from "react";
import OptionSelection from "../../Component/OptionSelection/OptionSelection";
import RunningSynthesis from "../RunningSynthesis/RunningSynthesis";
import Tab from "./Component/Tab";

export default function Settings() {
    const tab = [
        { label: "Option selection", value: "optionSelection", component: OptionSelection },
        { label: "Run Synthesis", value: "runSynthesis", component: RunningSynthesis },
    ];

    const [activeTab, setActiveTab] = useState(tab[0].value);

    const ComponentToRender = tab.find((el) => el.value === activeTab).component;

    return (
        <>
            <Tab tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-4 pt-4 border-t border-neutral-300">
                <ComponentToRender />
            </div>
        </>
    );
}
