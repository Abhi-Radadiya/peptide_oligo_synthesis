import React from "react";

import { useForm } from "react-hook-form";

import { useWindowSize } from "@uidotdev/usehooks";
import Footer from "../Component/Footer/Footer";
import InputField from "../../../Components/Input/Input";

export default function InitialSynthesis(props) {
    const { setActiveStep } = props;

    const { control } = useForm();

    const { height } = useWindowSize();

    const saveMethods = () => {
        setActiveStep("sequence");
    };

    const amedites = [
        { label: "Test 1", position: "test1", value: false },
        { label: "Test 2", position: "test2", value: true },
        { label: "Test 3", position: "test3", value: false },
        { label: "Test 4", position: "test4", value: true },
        { label: "Test 5", position: "test5", value: true },
    ];

    return (
        <>
            <div className="overflow-auto scrollbar-style pb-4 pr-3.5" style={{ height: height - 105 }}>
                <div className="pb-6 mb-6 border-b border-neutral-400">
                    <span className="text-xl font-semibold">Column Wash Setting</span>

                    <div className="flex flex-row gap-6 max-w-[700px] mt-4">
                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Volume :</div>
                            <InputField control={control} placeholder="Enter Volume in ml" name="volume" type="number" />
                        </div>

                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Flow Rate :</div>
                            <InputField control={control} placeholder="Enter Flow Rate in ml/min" name="flowRate" type="number" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer onSave={saveMethods} />
        </>
    );
}
