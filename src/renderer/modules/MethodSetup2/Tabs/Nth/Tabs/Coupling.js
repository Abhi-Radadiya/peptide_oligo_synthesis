import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../../Components/Input/Input";
import AmediteSection, { RadioSection, WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection";

export default function Coupling() {
    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">Coupling Settings</h3>

                    <AmediteSection
                        names={{ solvent: "n_couplingSolvent", volume: "n_couplingVolume", xFactor: "n_couplingXFactor" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />

                    <span className="font-bold text-base underline underline-offset-4 text-neutral-600">Delivery System</span>

                    <div className="flex flex-row justify-between my-2">
                        <InputField
                            name="coupling_flow_rate"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter Flow Rate"
                            label="Flow Rate"
                            rightFixItem="ml/min"
                        />

                        <InputField
                            name="mix_time"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter mix time"
                            label="Mix Time"
                            rightFixItem="min"
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2">
                        <InputField
                            name="n_couplingDeliveryVolume"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter delivery volume"
                            label="Delivery volume"
                            rightFixItem="ml"
                        />

                        <InputField
                            name="n_couplingDeliveryWashVolume"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter delivery wash volume"
                            label="Wash volume"
                            rightFixItem="ml"
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

                    <AmediteSection
                        names={{ solvent: "n_couplingWashSolvent", volume: "n_couplingWashVolume", xFactor: "n_couplingWashXFactor" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                        title="Wash Setting"
                    />

                    <RadioSection radioName="n_couplingUVEnable" title="UV setting" control={control} checkName="n_couplingCheck" />
                </div>

                <WasteColumnSelection name="n_couplingWaste" control={control} />
            </div>
        </>
    );
}
