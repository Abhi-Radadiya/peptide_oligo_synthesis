import React from "react";
import { useFormContext } from "react-hook-form";
import AmediteSection, { RadioSection, WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection";

export default function Oxidization(props) {
    const { disabled } = props;

    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">Oxidization Settings</h3>

                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_oxidizationSolvent", volume: "n_oxidizationVolume", xFactor: "n_oxidizationXFactor" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />

                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_oxidizationWashSolvent", volume: "n_oxidizationWashVolume", xFactor: "n_oxidizationWashXFactor" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />

                    <RadioSection disabled={disabled} radioName="n_oxidizationConductivity" title="Conductivity" control={control} checkName="n_oxidizationCheck" />
                </div>

                <WasteColumnSelection disabled={disabled} name="n_oxidizationWaste" control={control} />
            </div>
        </>
    );
}
