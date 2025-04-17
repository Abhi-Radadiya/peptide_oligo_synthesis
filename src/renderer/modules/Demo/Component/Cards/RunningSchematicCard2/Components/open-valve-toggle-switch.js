import React from "react"
import ToggleSwitch from "../../../../../../Components/FormController/Switch"

export default function OpenValveToggleSwitch(props) {
    const { isChecked, handleChange, leftSwitchLabel, rightSwitchLabel, label } = props

    return (
        <>
            <div className="">
                <span className="font-medium text-base">{label}</span>

                <div className="flex flex-row items-center gap-2 mt-2">
                    <span className="text-sm">{leftSwitchLabel}</span>

                    <ToggleSwitch
                        checked={isChecked}
                        handleChange={() => {
                            handleChange((prevState) => !prevState)
                        }}
                    />

                    <span className="text-sm">{rightSwitchLabel}</span>
                </div>
            </div>
        </>
    )
}
