import React from "react";
import { useFormContext } from "react-hook-form";
import AmediteSection, { RadioSection, WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection";

export default function Sulfurization(props) {
    const { disabled } = props;

    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">Sulfurization Settings</h3>

                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_sulfurizationSolvent", volume: "n_sulfurizationVolume", xFactor: "n_sulfurizationXFactor" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />

                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_sulfurizationWashSolvent", volume: "n_sulfurizationWashVolume", xFactor: "n_sulfurizationWashXFactor" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                        title="Wash Setting"
                    />

                    <RadioSection disabled={disabled} radioName="n_sulfurizationConductivityEnable" title="Conductivity" control={control} checkName="n_sulfurizationCheck" />
                </div>

                <WasteColumnSelection disabled={disabled} name="n_sulfurizationWaste" control={control} />
            </div>
        </>
    );
}
