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

    const method = useForm({ defaultValues: { "1_waste": { label: 1, value: 1 } } });

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
            <div className="relative">
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
