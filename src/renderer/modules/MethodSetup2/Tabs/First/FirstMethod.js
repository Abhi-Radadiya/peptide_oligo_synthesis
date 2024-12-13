import React from "react";
import { useFormContext } from "react-hook-form";
import AmediteSection, { WasteColumnSelection } from "../../Components/AmediteSection/AmediteSection";

export default function FirstMethod() {
    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[650px] w-full">
                    <h3 className="font-bold text-xl mb-6">Column Wash Settings</h3>

                    <AmediteSection names={{ solvent: "1_solvent", volume: "1_volume", xFactor: "1_XFactor", flowRate: "1_flowRate" }} />
                </div>

                <WasteColumnSelection name="1_waste" control={control} />
            </div>
        </>
    );
}
