import InputField from "../../../../../Components/Input/Input"
import { useFormContext } from "react-hook-form"

export default function AmediteConcentration() {
    const { control } = useFormContext()

    return (
        <>
            <div className="space-y-2">
                <label htmlFor="amedite-concentration">Amedite Concentration (mmol)</label>

                <InputField
                    name="amediteConcentration"
                    control={control}
                    placeholder="Enter amedite concentration (mmol)"
                    id="amedite-concentration"
                    type="number"
                    className="w-full"
                    rules={{ required: "Please enter amedite concentration " }}
                />
            </div>
        </>
    )
}
