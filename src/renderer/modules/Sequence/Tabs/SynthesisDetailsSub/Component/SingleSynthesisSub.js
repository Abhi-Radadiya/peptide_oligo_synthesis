import React from "react";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../../Components/Input/Input";
import RadioButton from "../../../../../Components/FormController/RadioButton";

export default function SingleSynthesisSub() {
    const { control } = useFormContext();

    const buttons = [
        { label: "High", value: "high" },
        { label: "Low", value: "low" },
    ];

    const baseMenuItem = [
        { label: "A", value: "a" },
        { label: "C", value: "c" },
        { label: "mA", value: "mA" },
        { label: "fC", value: "fC" },
    ];

    const processMenuItem = [
        { label: "Oxidization", value: "oxidization" },
        { label: "Sulfurization", value: "sulfurization" },
        { label: "Cap A", value: "capA" },
        { label: "Cap B", value: "capB" },
        { label: "Act", value: "act" },
        { label: "Extra", value: "extra" },
    ];

    return (
        <>
            <div className="flex flex-row justify-between gap-4 mb-6">
                <div className="space-y-2 max-w-[200px] w-full">
                    <label className="font-bold text-neutral-600">Base</label>
                    <SelectionController control={control} menuItem={baseMenuItem} height={41.6} name="base" placeholder="Select base" />
                </div>

                <div className="space-y-2 max-w-[200px] w-full">
                    <label className="font-bold text-neutral-600">Process</label>
                    <SelectionController control={control} menuItem={processMenuItem} height={41.6} name="process" placeholder="Select process" />
                </div>

                <InputField type="number" label="Volume" labelClassName="font-bold text-neutral-600" name="volume" placeholder="Enter volume" />

                <InputField label="X Factor" type="number" labelClassName="font-bold text-neutral-600" name="xFactor" placeholder="Enter X factor" />

                <div className="flex flex-col gap-2">
                    <span className="font-bold text-neutral-600">UV Setting</span>
                    <RadioButton labelClassName="py-0" className="max-w-[250px]" wrapperClassName="h-[41.6px]" buttons={buttons} control={control} name="uvSetting" />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-bold text-neutral-600">Conductivity</span>
                    <RadioButton className="max-w-[250px]" buttons={buttons} wrapperClassName="h-[41.6px]" control={control} name="conductivity" />
                </div>

                <InputField label="Flow Rate" type="number" labelClassName="font-bold text-neutral-600" name="flowRate" placeholder="Enter flow rate" />
            </div>

            <p className="font-bold">** what should be pressure setting</p>
        </>
    );
}
