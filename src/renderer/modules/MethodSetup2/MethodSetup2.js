import React, { useState } from "react";
import FirstMethod from "./Tabs/First/FirstMethod";
import NthMethod from "./Tabs/Nth/NthMethod";
import LastMethod from "./Tabs/Last/LastMethod";
import { FormProvider, useForm } from "react-hook-form";
import LeftPanel from "../../Components/LeftPanel/LeftPanel";
import { useWindowSize } from "@uidotdev/usehooks";

export default function MethodSetup2() {
    const method = useForm({ defaultValues: { "1_waste": { label: 1, value: 1 } } });

    const steps = [
        { label: "First Method", value: "firstMethod", component: FirstMethod },
        {
            label: (
                <>
                    N<sup>th</sup> Method
                </>
            ),
            value: "nThMethod",
            component: NthMethod,
        },
        { label: "Last Method", value: "lastMethod", component: LastMethod },
    ];

    const [activeStep, setActiveStep] = useState(steps[1].value);

    const ComponentToRender = steps.find((el) => el.value == activeStep).component;

    const { height: windowHeight } = useWindowSize();

    return (
        <>
            <div className="relative">
                <div className="flex flex-row">
                    <LeftPanel tabs={steps} activeStep={activeStep} setActiveStep={setActiveStep} />

                    <FormProvider {...method}>
                        <div className="border-l border-neutral-500 pl-6 w-full overflow-auto scrollbar-style pr-2" style={{ height: windowHeight - 105 }}>
                            <ComponentToRender setActiveStep={setActiveStep} />
                        </div>
                    </FormProvider>
                </div>
            </div>
        </>
    );
}
