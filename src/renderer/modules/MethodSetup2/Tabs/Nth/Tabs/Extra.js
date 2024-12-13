import React from "react";
import { useFormContext } from "react-hook-form";
import AmediteSection, { WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection";

export default function Extra(props) {
    const { disabled } = props;

    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">Extra Settings</h3>

                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_extraSolvent", volume: "n_extraVolume", xFactor: "n_extraXFactor", flowRate: "n_extraFlowRate" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />
                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_extraWashSolvent", volume: "n_extraWashVolume", xFactor: "n_extraWashXFactor", flowRate: "n_extraWashFlowRate" }}
                        title="Wash setting"
                    />
                </div>

                <WasteColumnSelection disabled={disabled} control={control} name="n_extraWaster" />
            </div>
        </>
    );
}
