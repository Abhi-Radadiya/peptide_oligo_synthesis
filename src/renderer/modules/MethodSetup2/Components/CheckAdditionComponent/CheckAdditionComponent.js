import React from "react";
import Checkbox from "../../../../Components/FormController/CheckBox";
import { useFormContext } from "react-hook-form";

export default function CheckAdditionComponent() {
    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-row gap-8">
                <div className="px-4 py-2 rounded-lg shadow-lg border border-neutral-300 mb-6 w-fit">
                    <Checkbox labelClassName="font-bold text-neutral-500 text-xl" className="gap-4" label="Add Oxidization" name="hasOxidization" control={control} />
                </div>
                <div className="px-4 py-2 rounded-lg shadow-lg border border-neutral-300 mb-6 w-fit">
                    <Checkbox labelClassName="font-bold text-neutral-500 text-xl" className="gap-4" label="Add Sulfurization" name="hasSulfurization" control={control} />
                </div>
                <div className="px-4 py-2 rounded-lg shadow-lg border border-neutral-300 mb-6 w-fit">
                    <Checkbox labelClassName="font-bold text-neutral-500 text-xl" className="gap-4" label="Add Extra" name="hasExtra" control={control} />
                </div>
            </div>
        </>
    );
}
