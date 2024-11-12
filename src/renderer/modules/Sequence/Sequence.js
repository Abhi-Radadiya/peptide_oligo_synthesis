import React, { useState } from "react";
import { Tabs } from "../../Components/Tabs/Tab";
import RunSequence from "./Tabs/RunSequence/RunSequence";
import SynthesisDetailsSub from "./Tabs/SynthesisDetailsSub/SynthesisDetailsSub";
import { FormProvider, useForm } from "react-hook-form";

export default function Settings() {
    const method = useForm({ defaultValues: { 3: "3" } });

    const tabs = [
        { label: "Run Sequence", value: "runSequence", component: RunSequence },
        { label: "Synthesis Details Sub", value: "synthesisDetailsSub", component: SynthesisDetailsSub },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    return (
        <>
            <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="mb-4 pb-4 border-b border-neutral-300" />

            <FormProvider {...method}>
                <ComponentToRender />
            </FormProvider>
        </>
    );
}
