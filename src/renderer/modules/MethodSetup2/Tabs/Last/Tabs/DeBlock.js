import React from "react";
import { useFormContext } from "react-hook-form";
import AmediteSection, { RadioSection, WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection";

export default function DeBlock() {
    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">De - Block Settings</h3>

                    <AmediteSection
                        names={{ solvent: "last_deSolvent", volume: "last_deVolume", xFactor: "last_deXFactor", flowRate: "last_deFlowRate" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />
                    <AmediteSection
                        names={{ solvent: "last_deWashSolvent", volume: "last_deWashVolume", xFactor: "last_deWashXFactor", flowRate: "last_deWashFlowRate" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                        title="Wash Setting"
                    />

                    <RadioSection title="UV Setting" radioName="last_deUVEnable" control={control} checkName="last_deCheck" />
                </div>

                <WasteColumnSelection name="last_deWaste" control={control} />
            </div>
        </>
    );
}
