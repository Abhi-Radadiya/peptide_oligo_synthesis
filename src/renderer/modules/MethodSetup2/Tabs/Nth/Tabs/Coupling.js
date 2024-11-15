import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../../Components/Input/Input";
import AmediteSection, { RadioSection, WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection";

export default function Coupling(props) {
    const { disabled } = props;

    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">Coupling Settings</h3>

                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_couplingSolvent", volume: "n_couplingVolume", xFactor: "n_couplingXFactor" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />

                    <span className="font-bold text-base underline underline-offset-4 text-neutral-600">Delivery System</span>

                    <div className="flex flex-row justify-between my-2">
                        <InputField
                            disabled={disabled}
                            name="n_couplingFlowRate"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter Flow Rate"
                            label="Flow Rate"
                            rightFixItem="ml/min"
                        />

                        <InputField
                            disabled={disabled}
                            name="n_couplingMixTime"
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
                            disabled={disabled}
                            name="n_couplingAmediteVolume"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter amedite volume"
                            label="Amedite volume"
                            rightFixItem="ml"
                        />

                        <InputField
                            disabled={disabled}
                            name="n_couplingActVolume"
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px] mt-2"
                            control={control}
                            type="number"
                            placeholder="Enter act volume"
                            label="Act volume"
                            rightFixItem="ml"
                        />
                    </div>

                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_couplingWashSolvent", volume: "n_couplingWashVolume", xFactor: "n_couplingWashXFactor" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                        title="Wash Setting"
                    />

                    <RadioSection disabled={disabled} radioName="n_couplingUVEnable" title="UV setting" control={control} checkName="n_couplingCheck" />
                </div>

                <WasteColumnSelection disabled={disabled} name="n_couplingWaste" control={control} />
            </div>
        </>
    );
}
