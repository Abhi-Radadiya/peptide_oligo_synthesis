import { useWindowSize } from "@uidotdev/usehooks";
import React from "react";
import Footer from "../Component/Footer/Footer";
import InputField from "../../../Components/Input/Input";
import { useForm } from "react-hook-form";

export default function FinalSynthesis(props) {
    const { height } = useWindowSize();

    const { control } = useForm();

    const saveMethods = () => {};

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

                <div className="pb-6 mb-6 border-b border-neutral-400">
                    <span className="text-xl font-semibold">Detritylation Setting</span>

                    <InputField
                        wrapperClassName="flex flex-row item-center gap-4 mt-4"
                        label="Final Detritylation"
                        width="w-5"
                        className="h-5"
                        control={control}
                        name={`finalDetritylation`}
                        type={"checkbox"}
                    />

                    <div className="border border-neutral-300 p-4 rounded-lg max-w-[700px] mt-3 shadow-md">
                        <div className=" flex flex-row items-center justify-between">
                            <div className="font-medium text-base text-neutral-500">UV Wave Length :</div>

                            <InputField
                                wrapperClassName="flex flex-row-reverse item-center gap-4"
                                label="Use Method Setting Wavelength"
                                width="w-5"
                                className="h-5 block"
                                control={control}
                                name={`isMethodSettingWavelength`}
                                type={"checkbox"}
                            />
                        </div>

                        <InputField control={control} placeholder="Enter UV Wave Length" name="uvWaveLength" type="number" wrapperClassName="mt-2 max-w-[200px]" />
                    </div>

                    <div className="border border-neutral-300 p-4 rounded-lg max-w-[700px] mt-3 shadow-md space-y-4">
                        <InputField
                            wrapperClassName="flex flex-row item-center gap-4"
                            label="Use Setting from Previous Sequence Phase"
                            width="w-5"
                            className="h-5 block"
                            control={control}
                            name={`usePreviousSequence`}
                            type={"checkbox"}
                        />

                        <InputField
                            wrapperClassName="flex flex-row item-center gap-4"
                            label="Pre Swelling"
                            width="w-5"
                            className="h-5"
                            control={control}
                            name={`preSwelling`}
                            type={"checkbox"}
                        />

                        <div className="flex flex-row gap-6">
                            <div className="gap-6 w-full max-w-[500px]">
                                <div className="font-medium text-base text-neutral-500 w-full mb-2">Pre Swelling Flow Rate :</div>
                                <InputField
                                    wrapperClassName="flex flex-row item-center"
                                    control={control}
                                    name={`preSwellingFlowRate`}
                                    type={"number"}
                                    placeholder="Enter Flow Rate in cm/h [0 - 11459.1]"
                                />
                            </div>

                            <div className="gap-6 w-full max-w-[500px]">
                                <div className="font-medium text-base text-neutral-500 w-full mb-2">Pre Swelling Volume :</div>
                                <InputField
                                    wrapperClassName="flex flex-row item-center gap-4"
                                    placeholder="Enter Volume in CV"
                                    control={control}
                                    name={`preSwellingVolume`}
                                    type={"number"}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row gap-6">
                            <div className="gap-6 w-full max-w-[500px]">
                                <div className="font-medium text-base text-neutral-500 w-full mb-2">Flow Rate :</div>
                                <InputField
                                    wrapperClassName="flex flex-row item-center gap-4"
                                    placeholder="Enter Flow Rate in cm/h [0 - 11459.1]"
                                    control={control}
                                    name={`flowRate`}
                                    type={"number"}
                                />
                            </div>

                            <div className="gap-6 w-full max-w-[500px]">
                                <div className="font-medium text-base text-neutral-500 w-full mb-2">Wash Volume :</div>
                                <InputField
                                    wrapperClassName="flex flex-row item-center gap-4"
                                    placeholder="Enter Wash Volume in CV"
                                    control={control}
                                    name={`washVolume`}
                                    type={"number"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer label="Save" onSave={saveMethods} />
        </>
    );
}
