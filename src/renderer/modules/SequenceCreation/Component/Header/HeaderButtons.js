import React, { useState } from "react";
import { Tabs } from "../../../../Components/Tabs/Tab";
import SequenceEditing from "../../Tabs/SequenceEditing/SequenceEditing";
import MethodAssign from "../../Tabs/MethodAssign/MethodAssign";

export default function HeaderButtons() {
    const tabs = [
        { label: "Sequence Editing", value: "sequence-editing", component: SequenceEditing },
        { label: "Method Assign", value: "method-assign", component: MethodAssign },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4 pb-4 border-b border-neutral-300" />
            <ComponentToRender />
        </>
    );
}
