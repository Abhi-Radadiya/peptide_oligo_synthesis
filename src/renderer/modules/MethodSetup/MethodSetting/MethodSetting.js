import React from "react";
import { ControllerDropdown } from "../../../Components/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import InputField from "../../../Components/Input/Input";
import { useWindowSize } from "@uidotdev/usehooks";
import Footer from "../Component/Footer/Footer";

export default function MethodSetting(props) {
    const { setActiveStep } = props;

    const { control } = useForm();

    const tempMenuItems = [
        { label: "Test 1", value: "test1" },
        { label: "Test 2", value: "test2" },
    ];

    const { height } = useWindowSize();

    const saveMethods = () => {
        setActiveStep("initialSynthesisStep");
    };

    return (
        <>
            <div className="overflow-auto scrollbar-style pb-4 pr-3.5" style={{ height: height - 105 }}>
                <div className="pb-6 mb-6 border-b border-neutral-400">
                    <span className="text-xl font-semibold">Column Setting</span>
                    <div className="flex flex-row gap-6 max-w-[700px] mb-6 mt-4">
                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Column Type :</div>
                            <ControllerDropdown control={control} label="Select Column Type" name="columnType" menuItem={tempMenuItems} />
                        </div>
                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Column Position:</div>
                            <ControllerDropdown control={control} label="Select Column Position" name="columnPosition" menuItem={tempMenuItems} />
                        </div>
                    </div>

                    <div className="flex flex-row gap-6 w-full max-w-[700px]">
                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Pressure Limit Per Column:</div>
                            <InputField control={control} name="pressureLimit" placeholder="Enter Pressure Limit" />
                        </div>

                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Synthesis Scale:</div>
                            <InputField control={control} name="synthesisScale" placeholder="Enter Synthesis Scale" />
                        </div>
                    </div>
                </div>

                <div className="mb-6 border-b border-neutral-400 pb-6">
                    <span className="text-xl font-semibold">UV Monitoring Setting</span>

                    <div className="flex flex-row max-w-[900px] mt-4">
                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">UV 1 :</div>
                            <div className="flex flex-row gap-4 items-center">
                                <InputField
                                    rules={{
                                        min: {
                                            value: 190,
                                            message: "Value must be between 190 - 700",
                                        },
                                        max: {
                                            value: 700,
                                            message: "Value must be between 190 - 700",
                                        },
                                    }}
                                    placeholder={`Enter UV Value [190-700]`}
                                    type={"number"}
                                    control={control}
                                    name="uv1.value"
                                />
                                <InputField width="w-5" className="h-5" control={control} name={`uv1.checked`} type={"checkbox"} />
                            </div>
                        </div>

                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">UV 2 :</div>
                            <div className="flex flex-row gap-4 items-center">
                                <InputField
                                    rules={{
                                        min: {
                                            value: 190,
                                            message: "Value must be between 190 - 700",
                                        },
                                        max: {
                                            value: 700,
                                            message: "Value must be between 190 - 700",
                                        },
                                    }}
                                    placeholder={`Enter UV Value [190-700]`}
                                    type={"number"}
                                    control={control}
                                    name="uv2.value"
                                />
                                <InputField width="w-5" className="h-5" control={control} name={`uv2.checked`} type={"checkbox"} />
                            </div>
                        </div>

                        <div className="gap-6 w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">UV 3 :</div>
                            <div className="flex flex-row gap-4 items-center">
                                <InputField
                                    rules={{
                                        min: {
                                            value: 190,
                                            message: "Value must be between 190 - 700",
                                        },
                                        max: {
                                            value: 700,
                                            message: "Value must be between 190 - 700",
                                        },
                                    }}
                                    placeholder={`Enter UV Value [190-700]`}
                                    type={"number"}
                                    control={control}
                                    name="uv3.value"
                                />
                                <InputField width="w-5" className="h-5" control={control} name={`uv3.checked`} type={"checkbox"} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-6 mb-6 border-b border-neutral-400">
                    <span className="text-xl font-semibold">Pressure Setting</span>

                    <div className="flex flex-row gap-6 items-center mt-4 max-w-[700px]">
                        <div className="flex flex-row gap-3 items-center">
                            <div className="font-medium text-base text-neutral-500 leading-7 mb-2">Enable Solvent A Valve :</div>

                            <InputField width="w-5" className="h-5" control={control} name={`solventAValveAlarm.checked`} type={"checkbox"} />
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <div className="font-medium text-base text-neutral-500 leading-7 mb-2">Enable Solvent B Valve :</div>

                            <InputField width="w-5" className="h-5" control={control} name={`solventBValveAlarm.checked`} type={"checkbox"} />
                        </div>
                    </div>
                </div>

                <div className="pb-6 mb-6">
                    <span className="text-xl font-semibold">Detritylation Purge & Auto Zero</span>
                    <div className="mt-4 w-full max-w-[338px]">
                        <InputField control={control} type="number" name={`detritylationPurge.volume`} placeholder="Enter Volume in ml" />
                    </div>
                </div>
            </div>

            <Footer onSave={saveMethods} />
        </>
    );
}
