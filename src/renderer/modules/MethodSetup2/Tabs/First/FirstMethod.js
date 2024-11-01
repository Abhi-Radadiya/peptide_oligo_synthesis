import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import InputField from "../../../../Components/Input/Input";
import { wasteMenuItems } from "../../Constant";

export default function FirstMethod() {
    const { control, watch } = useFormContext();

    const testSolvents = [
        { label: "Test Solvent 1", value: "solvent1", flowRate: 12 },
        { label: "Test Solvent 2", value: "solvent2", flowRate: 60 },
        { label: "Test Solvent 3", value: "solvent3", flowRate: 90 },
    ];

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">Column Wash Settings</h3>

                    <div className="flex flex-row items-center justify-between mb-4">
                        <div className="flex flex-row items-center gap-6 w-full  justify-between">
                            <SelectionController width={200} menuItem={testSolvents} control={control} name="dea_solvent" placeholder="Select Solvent" />

                            <p className="w-full max-w-[220px] border border-neutral-300 rounded-lg px-4 py-2 shadowd-lg">
                                <span className="font-bold text-base mr-2">Flow Rate : </span>
                                <span>{watch("dea_solvent")?.flowRate ?? "___  "} ml/min</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-6 justify-between">
                        <span className="font-bold text-neutral-600">X Factor</span>
                        <InputField name="dea_x_factor" width="w-[220px]" wrapperClassName="max-w-[220px]" control={control} type="number" placeholder="Enter X Factor" />
                    </div>
                </div>

                <div className="flex flex-row w-full max-w-[260px] items-center gap-3">
                    <span className="font-bold text-base">Waste Column : </span>
                    <SelectionController isClearable={false} width={120} menuItem={wasteMenuItems} control={control} name="dea_waste" />
                </div>
            </div>
        </>
    );
}
