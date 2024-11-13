import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import InputField from "../../../../Components/Input/Input";
import { wasteMenuItems } from "../../Constant";
import RadioButton from "../../../../Components/FormController/RadioButton";
import Checkbox from "../../../../Components/FormController/CheckBox";

export default function AmediteSection(props) {
    const {
        names: { solvent, volume, xFactor },
        title,
        className,
    } = props;

    const { control, watch } = useFormContext();

    const testSolvents = [
        { label: "Test Solvent 1", value: "solvent1", flowRate: 12 },
        { label: "Test Solvent 2", value: "solvent2", flowRate: 60 },
        { label: "Test Solvent 3", value: "solvent3", flowRate: 90 },
    ];

    return (
        <>
            <div className={`max-w-[650px] w-full ${className}`}>
                {title && <span className="font-bold text-base underline underline-offset-4 text-neutral-600">{title}</span>}

                <div className="flex flex-row items-center justify-between my-4">
                    <div className="flex flex-row items-center gap-6 w-full justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <span className="font-bold text-neutral-600">Solvent</span>
                            <SelectionController width={220} menuItem={testSolvents} control={control} name={solvent} placeholder="Select Solvent" />
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <span className="font-bold text-neutral-600">Flow Rate</span>
                            <p className={`w-[220px] px-3 py-2 rounded border-gray-300 border flex justify-between`}>
                                <span className={`${!watch(solvent)?.flowRate && "text-neutral-300"}`}>{watch(solvent)?.flowRate ?? "Flow rate"}</span>
                                <span className="justify-end flex">ml/min</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                        <span className="font-bold text-neutral-600">Volume</span>
                        <InputField
                            rightFixItem="ml"
                            name={volume}
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px]"
                            control={control}
                            type="number"
                            placeholder="Enter X Factor"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <span className="font-bold text-neutral-600">X Factor</span>
                        <InputField name={xFactor} width="w-[220px]" wrapperClassName="max-w-[220px]" control={control} type="number" placeholder="Enter X Factor" />
                    </div>
                </div>
            </div>
        </>
    );
}

export const WasteColumnSelection = (props) => {
    const { name, control } = props;

    return (
        <div className="flex flex-row w-full max-w-[260px] items-center gap-3">
            <span className="font-bold text-base">Waste Column : </span>
            <SelectionController isClearable={false} width={120} menuItem={wasteMenuItems} control={control} name={name} />
        </div>
    );
};

export const RadioSection = (props) => {
    const { radioName, title, control, checkName, disabled = true } = props;

    const buttons = [
        { label: "High", value: "high" },
        { label: "Low", value: "low" },
    ];

    return (
        <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row items-center gap-6 justify-between">
                <span className="font-bold text-neutral-600">{title}</span>
                <RadioButton className="max-w-[250px]" disabled={disabled} buttons={buttons} control={control} name={radioName} />
            </div>

            <Checkbox labelClassName="font-bold text-neutral-600" className="flex-row-reverse gap-4" label="Enabled" name={checkName} control={control} />
        </div>
    );
};
