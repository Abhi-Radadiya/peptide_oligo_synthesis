import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import InputField from "../../../../Components/Input/Input";
import { wasteMenuItems } from "../../Constant";
import Checkbox from "../../../../Components/FormController/CheckBox";
import { useSelector } from "react-redux";

export default function AmediteSection(props) {
    const {
        names: { solvent, volume, xFactor, flowRate },
        title,
        className,
        disabled,
        chemical = "reagent",
    } = props;

    const { control, setValue } = useFormContext();

    const chemicals = useSelector((state) => state[chemical][`${chemical}List`]);

    const chemicalFlowRates = chemicals.map((chemical) => {
        return {
            label: chemical.full_name,
            value: chemical.id,
        };
    });

    const handleSelectSolvent = (option) => {
        const flowRateEntry = chemicals.find((el) => el.id === option.value);

        setValue(flowRate, flowRateEntry.flowRate);
    };

    return (
        <>
            <div className={`max-w-[650px] w-full ${className}`}>
                {title && <span className="font-bold text-base underline underline-offset-4 text-neutral-600">{title}</span>}

                <div className="flex flex-row items-center justify-between my-4">
                    <div className="flex flex-row items-start gap-6 w-full justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <span className="font-bold text-neutral-600">{chemical === "reagent" ? "Solvent" : "Amedite"}</span>
                            <SelectionController
                                rules={{ required: "Please select solvent" }}
                                isDisabled={disabled}
                                width={220}
                                menuItem={chemicalFlowRates}
                                control={control}
                                name={solvent}
                                placeholder="Select Solvent"
                                handleChange={handleSelectSolvent}
                            />
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <span className="font-bold text-neutral-600">Flow Rate</span>
                            <InputField
                                rightFixItem="ml/min"
                                name={flowRate}
                                width="w-[220px]"
                                wrapperClassName="max-w-[220px]"
                                control={control}
                                type="number"
                                placeholder="Enter flow rate"
                                disabled={disabled}
                            />
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
                            placeholder="Enter volume"
                            disabled={disabled}
                        />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <span className="font-bold text-neutral-600">X Factor</span>
                        <InputField
                            disabled={disabled}
                            name={xFactor}
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px]"
                            control={control}
                            type="number"
                            placeholder="Enter X factor"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export const WasteColumnSelection = (props) => {
    const { name, control, disabled } = props;

    return (
        <div className="flex flex-row w-full max-w-[260px] items-center gap-3">
            <span className="font-bold text-base">Waste Column : </span>
            <SelectionController
                isDisabled={disabled}
                isClearable={false}
                width={120}
                menuItem={wasteMenuItems}
                control={control}
                name={name}
                rules={{ required: "* Select column" }}
            />
        </div>
    );
};

export const RadioSection = (props) => {
    const { radioName, title, control, checkName, disabled } = props;

    const buttons = [
        { label: "High", value: "high" },
        { label: "Low", value: "low" },
    ];

    return (
        <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row items-center gap-6 justify-between">
                {/* <span className="font-bold text-neutral-600">{title}</span>
                <RadioButton className="max-w-[250px]" disabled={true} buttons={buttons} control={control} name={radioName} /> */}
            </div>

            <Checkbox
                labelClassName="font-bold text-neutral-600"
                className="flex-row-reverse gap-4"
                label="Enabled"
                disabled={disabled}
                name={checkName}
                control={control}
            />
        </div>
    );
};
