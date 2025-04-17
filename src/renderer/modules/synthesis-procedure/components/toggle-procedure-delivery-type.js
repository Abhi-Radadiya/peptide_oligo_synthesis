import React from "react"
import { useFormContext } from "react-hook-form"
import ToggleSwitch from "../../../Components/FormController/Switch"

export default function ToggleProcedureDeliveryType() {
    const { setValue, watch } = useFormContext()

    return (
        <>
            {/* <Controller
                            name={`steps.${stepIndex}.procedure.${actionIndex}.runningParameter`}
                            control={control}
                            render={({ field }) => (
                                <StyledToggle
                                    label="Control Basis"
                                    enabled={field.value === "liquidVolume"} // 'liquidVolume' means true (switch is on)
                                    onChange={(isChecked) => field.onChange(isChecked ? "liquidVolume" : "time")}
                                    optionLabels={{ true: pumpBasisOptions.liquidVolume, false: pumpBasisOptions.time }}
                                />
                            )}
                        /> */}

            <div className="flex flex-row items-center gap-2 mt-2">
                <span className="text-sm text-white font-medium">Volume</span>

                <ToggleSwitch
                    offBgColor="bg-green-400"
                    checkedBgColor="checked:bg-blue-500"
                    checked={watch("inputType") === "time"}
                    handleChange={() => {
                        setValue("inputType", watch("inputType") === "volume" ? "time" : "volume")
                    }}
                />

                <span className="text-sm text-white font-medium">Time</span>
            </div>
        </>
    )
}
