import InputField from "../../../../../Components/Input/Input"
import { useFormContext } from "react-hook-form"

export default function SynthesisScale() {
    const { control } = useFormContext()

    return (
        <>
            <div className="space-y-2">
                <label htmlFor="synthesis-scale">Synthesis Scale (μmol)</label>

                <InputField
                    control={control}
                    name="synthesisScale"
                    placeholder="Enter synthesis scale (μmol)"
                    type="number"
                    className="w-full"
                    rules={{ required: "Please enter synthesis scale" }}
                />
            </div>
        </>
    )
}
