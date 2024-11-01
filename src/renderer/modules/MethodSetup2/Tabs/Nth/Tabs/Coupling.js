import React from "react";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import RadioButton from "../../../../../Components/FormController/RadioButton";
import Checkbox from "../../../../../Components/FormController/CheckBox";
import { wasteMenuItems } from "../../../Constant";
import InputField from "../../../../../Components/Input/Input";

export default function Coupling() {
    const { control } = useFormContext();

    const testSolvents = [
        { label: "Test Solvent 1", value: "solvent1", flowRate: 12 },
        { label: "Test Solvent 2", value: "solvent2", flowRate: 60 },
        { label: "Test Solvent 3", value: "solvent3", flowRate: 90 },
    ];

    const buttons = [
        { label: "High", value: "high" },
        { label: "Low", value: "low" },
    ];

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">Coupling Settings</h3>

                    <div className="flex flex-row items-center justify-between mb-4">
                        <div className="flex flex-row items-center gap-6 w-full  justify-between">
                            <SelectionController width={200} menuItem={testSolvents} control={control} name="coupling_solvent" placeholder="Select Solvent" />
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-6 justify-between border-b border-neutral-300 pb-4 mb-4">
                        <span className="font-bold text-neutral-600">X Factor</span>
                        <InputField name="1_x_factor" width="w-[220px]" wrapperClassName=" max-w-[220px]" control={control} type="number" placeholder="Enter X Factor" />
                    </div>

                    <span className="font-bold text-base underline underline-offset-4 text-neutral-600">Circulation</span>

                    <div className="flex flex-row justify-between my-2">
                        <InputField
                            name="coupling_flow_rate"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter Flow Rate"
                            label="Flow Rate"
                        />

                        <InputField
                            name="mix_time"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter mix time"
                            label="Mix Time"
                        />
                    </div>

                    <div className="flex flex-row justify-between mb-6 border-b border-neutral-300 pb-6">
                        <InputField
                            name="amedite_express_factor"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter Express Factor"
                            label="Amedite Express Factor"
                        />

                        <InputField
                            name="act_factor"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter Act Factor"
                            label="Act Factor"
                        />
                    </div>

                    <span className="font-bold text-base underline underline-offset-4 text-neutral-600">Wash Setting</span>

                    <div className="flex flex-row items-center justify-between my-4">
                        <div className="flex flex-row items-center gap-6 w-full  justify-between">
                            <SelectionController width={200} menuItem={testSolvents} control={control} name="wash_solvent" placeholder="Select Solvent" />
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-6 justify-between border-b border-neutral-300 pb-4 mb-4">
                        <span className="font-bold text-neutral-600">X Factor</span>
                        <InputField name="wash_x_factor" width="w-[220px]" wrapperClassName=" max-w-[220px]" control={control} type="number" placeholder="Enter X Factor" />
                    </div>

                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center gap-6 justify-between">
                            <span className="font-bold text-neutral-600">UV Setting</span>
                            <RadioButton className="max-w-[250px]" buttons={buttons} control={control} disabled name="coupling_uv_setting" />
                        </div>
                        <Checkbox labelClassName="font-bold text-neutral-600" className="flex-row-reverse gap-4" label="Enabled" name="enable_coupling" control={control} />
                    </div>
                </div>

                <div className="flex flex-row w-full max-w-[260px] items-center gap-3">
                    <span className="font-bold text-base">Waste Column : </span>
                    <SelectionController isClearable={false} width={120} menuItem={wasteMenuItems} control={control} name="coupling_block_waste" />
                </div>
            </div>
        </>
    );
}
