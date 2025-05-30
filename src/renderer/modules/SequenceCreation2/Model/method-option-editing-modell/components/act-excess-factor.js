import React from "react"
import InputField from "../../../../../Components/Input/Input"
import { useFormContext } from "react-hook-form"

export default function ActExcessFactor() {
    const { control } = useFormContext()

    return (
        <>
            <div className="space-y-2">
                <label htmlFor="act-excess">ACT Excess Factor (%)</label>
                <InputField
                    control={control}
                    name="actExcessFactor"
                    placeholder="Enter act excess factor (%)"
                    type="number"
                    className="w-full"
                    rules={{ required: "Please enter act excess factor" }}
                />
            </div>
        </>
    )
}
