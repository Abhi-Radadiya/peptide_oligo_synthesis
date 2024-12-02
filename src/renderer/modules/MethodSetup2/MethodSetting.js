import React, { useState } from "react";
import FirstMethod from "./Tabs/First/FirstMethod";
import NthMethod from "./Tabs/Nth/NthMethod";
import LastMethod from "./Tabs/Last/LastMethod";
import { FormProvider, useForm } from "react-hook-form";
import LeftPanel from "../../Components/LeftPanel/LeftPanel";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams } from "react-router-dom";
import MethodDetails from "./Tabs/Details/MethodDetails";

export default function MethodSetting() {
    const { id } = useParams();

    const method = useForm({ defaultValues: { "1_waste": { label: 1, value: 1 }, hasOxidization: true } });

    const steps = [
        { label: "Details", value: "detail", component: MethodDetails },
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

    const [activeStep, setActiveStep] = useState(steps[0].value);

    const ComponentToRender = steps.find((el) => el.value == activeStep).component;

    const { height: windowHeight } = useWindowSize();

    return (
        <>
            <div className="relative p-4">
                <div className="flex flex-row">
                    <LeftPanel tabs={steps} activeStep={activeStep} setActiveStep={setActiveStep} />

                    <FormProvider {...method}>
                        <div className="border-l border-neutral-500 pl-6 w-full overflow-auto scrollbar-style pr-2" style={{ height: windowHeight - 36 }}>
                            <ComponentToRender setActiveStep={setActiveStep} />
                        </div>
                    </FormProvider>
                </div>
            </div>
        </>
    );
}

// import { useRef, useEffect } from "react";

// const useLoggedRef = (initialValue) => {
//     const ref = useRef(initialValue);

//     // Create a proxy to intercept changes to ref.current
//     const proxy = new Proxy(ref, {
//         set(target, property, value) {
//             if (property === "current") {
//                 // console.log(`dummyRef: ${value}`);
//             }
//             target[property] = value;
//             return true;
//         },
//     });

//     return proxy;
// };

// const MyComponent = () => {
//     const dummyRef = useLoggedRef(0);

//     const rrr = () => {
//         console.log("log 1");
//         dummyRef.current = 200; // Proxy logs automatically
//         console.log("log 2");
//         dummyRef.current = 2; // Proxy logs automatically
//         console.log("log 3");
//     };

//     console.log(`xxxxxx : `, dummyRef);

//     useEffect(() => {
//         rrr();
//     }, []);

//     return null;
// };

// export default MyComponent;

const flags = {
    n: {
        deBlock: ["n_deSolvent", "n_deVolume", "n_deXFactor", "n_deWashSolvent", "n_deWashVolume", "n_deWashXFactor", "n_deUVEnable", "n_deCheck", "n_deWaste"],
        amedite: [
            "n_couplingSolvent",
            "n_couplingVolume",
            "n_couplingXFactor",
            "n_couplingFlowRate",
            "n_couplingMixTime",
            "n_couplingAmediteVolume",
            "n_couplingActVolume",
            "n_couplingWashSolvent",
            "n_couplingWashVolume",
            "n_couplingWashXFactor",
            "n_couplingUVEnable",
            "n_couplingCheck",
            "n_couplingWaste",
        ],
        oxidization: [
            "n_oxidizationSolvent",
            "n_oxidizationVolume",
            "n_oxidizationXFactor",
            "n_oxidizationWashSolvent",
            "n_oxidizationWashVolume",
            "n_oxidizationWashXFactor",
            "n_oxidizationConductivity",
            "n_oxidizationCheck",
            "n_oxidizationWaste",
        ],
        sulfurization: [
            "n_sulfurizationSolvent",
            "n_sulfurizationVolume",
            "n_sulfurizationXFactor",
            "n_sulfurizationWashSolvent",
            "n_sulfurizationWashVolume",
            "n_sulfurizationWashXFactor",
            "n_sulfurizationConductivityEnable",
            "n_sulfurizationCheck",
            "n_sulfurizationWaste",
        ],
        extra: ["n_extraSolvent", "n_extraVolume", "n_extraXFactor", "n_extraWashSolvent", "n_extraWashVolume", "n_extraWashXFactor", "n_extraWaster"],
        capping: [
            "n_cappingASolvent",
            "n_cappingAVolume",
            "n_cappingAXFactor",
            "n_cappingBSolvent",
            "n_cappingBVolume",
            "n_cappingBXFactor",
            "n_cappingWashSolvent",
            "n_cappingWashVolume",
            "n_cappingWashXFactor",
            "n_cappingWaste",
        ],
    },
};
