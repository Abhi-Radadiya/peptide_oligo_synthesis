import { useFormContext } from "react-hook-form"
import InputField from "../../../../../Components/Input/Input"

export default function AmediteExcessFactor() {
    const { control } = useFormContext()

    return (
        <>
            <div className="space-y-2">
                <label htmlFor="amedite-excess">Amedite Excess Factor</label>
                <InputField
                    control={control}
                    name="amediteExcessFactor"
                    placeholder="Enter amedite excess factor"
                    type="number"
                    step="0.1"
                    className="w-full"
                    rules={{ required: "Please enter amedite excess factor" }}
                />
            </div>
        </>
    )
}
