import React from "react";
import { useFormContext } from "react-hook-form";
import AmediteSection, { WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection";

export default function DEA() {
    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-16">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">DEA Settings</h3>

                    <AmediteSection
                        names={{ solvent: "last_deaSolvent", volume: "last_deaVolume", xFactor: "last_deaXFactor", flowRate: "last_deaFlowRate" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />
                    <AmediteSection
                        names={{ solvent: "last_deaWashSolvent", volume: "last_deaWashVolume", xFactor: "last_deaWashXFactor", flowRate: "last_deaWashFlowRate" }}
                        title="Wash Setting"
                    />
                </div>

                <WasteColumnSelection name="last_deaWaste" control={control} />
            </div>
        </>
    );
}
