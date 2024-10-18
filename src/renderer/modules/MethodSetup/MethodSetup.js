import React, { useState } from "react";
import LeftPanel from "../../Components/LeftPanel/LeftPanel";
import MethodSetting from "./MethodSetting/MethodSetting";
import InitialSynthesis from "./InitialSynthesis/InitialSynthesis";
import Sequence from "./Sequence/Sequence";
import FinalSynthesis from "./FinalSynthesis/FinalSynthesis";

export default function MethodSetup() {
    const steps = [
        { label: "Method Setting", value: "methodSetting", component: MethodSetting },
        { label: "Initial Synthesis Step", value: "initialSynthesisStep", component: InitialSynthesis },
        { label: "Sequence", value: "sequence", component: Sequence },
        { label: "Final Synthesis Step", value: "finalSynthesisStep", component: FinalSynthesis },
    ];

    const [activeStep, setActiveStep] = useState(steps[0].value);

    const ComponentToRender = steps.find((el) => el.value == activeStep).component;

    return (
        <>
            <div className="relative">
                <div className="flex flex-row">
                    <LeftPanel tabs={steps} activeStep={activeStep} setActiveStep={setActiveStep} />

                    <div className="border-l border-neutral-500 pl-6 w-full">
                        <ComponentToRender setActiveStep={setActiveStep} />
                    </div>
                </div>
            </div>
        </>
    );
}
