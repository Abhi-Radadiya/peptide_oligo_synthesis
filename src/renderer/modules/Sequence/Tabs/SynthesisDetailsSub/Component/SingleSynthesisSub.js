import React from "react";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../../Components/Input/Input";
import RadioButton from "../../../../../Components/FormController/RadioButton";
import { wasteMenuItems } from "../../../../MethodSetup2/Constant";

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
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="space-y-2 w-full">
                    <label className="font-bold text-neutral-600">Column</label>
                    <SelectionController
                        control={control}
                        height={45.6}
                        name="columnNo"
                        placeholder="Select Column"
                        isClearable={false}
                        menuItem={wasteMenuItems}
                        rules={{ required: "Please select column" }}
                    />
                </div>

                <div className="space-y-2 w-full">
                    <label className="font-bold text-neutral-600">Base</label>
                    <SelectionController control={control} menuItem={baseMenuItem} height={41.6} name="base" placeholder="Select base" />
                </div>

                <div className="space-y-2 w-full">
                    <label className="font-bold text-neutral-600">Process</label>
                    <SelectionController control={control} menuItem={processMenuItem} height={41.6} name="process" placeholder="Select process" />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
                <InputField type="number" label="Volume" labelClassName="font-bold text-neutral-600" name="volume" placeholder="Enter volume" />

                <InputField label="X Factor" type="number" labelClassName="font-bold text-neutral-600" name="xFactor" placeholder="Enter X factor" />

                <InputField label="Flow Rate" type="number" labelClassName="font-bold text-neutral-600" name="flowRate" placeholder="Enter flow rate" />

                <InputField label="Pressure Setting" type="number" labelClassName="font-bold text-neutral-600" name="pressureSetting" placeholder="Enter pressure setting" />

                <RadioButton
                    optionWidth=""
                    wrapperClassName=""
                    header="UV Setting"
                    className="flex flex-row gap-6 items-center bg-neutral-100 pl-4 rounded-lg justify-between w-full"
                    buttons={buttons}
                    control={control}
                    name="uvSetting"
                />

                <RadioButton
                    wrapperClassName=""
                    optionWidth=""
                    header="Conductivity"
                    className="flex flex-row gap-6 items-center bg-neutral-100 pl-4 rounded-lg justify-between w-full"
                    buttons={buttons}
                    control={control}
                    name="conductivity"
                />
            </div>

            {/* <p className="font-bold">Pressure setting get from setting -> pressure setting -> set value
             and all other details get from setting based on base & process selection </p> */}
        </>
    );
}
