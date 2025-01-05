import React, { useMemo } from "react";
import RadioButton from "../../../../../Components/FormController/RadioButton";
import { useFormContext } from "react-hook-form";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
import { methodOption } from "../../../../../Helpers/Constant";

export default function ModeSelection() {
    const { watch, control } = useFormContext();

    const modeRadioButton = [
        { label: "Auto", value: "auto" },
        { label: "Manual", value: "manual" },
    ];

    const isManualMode = useMemo(() => {
        return watch("mode") === "manual";
    }, [watch("mode")]);

    return (
        <>
            <div className="flex flex-row items-center gap-4">
                <RadioButton
                    buttons={modeRadioButton}
                    control={control}
                    name="mode"
                    className={`flex flex-row gap-3 ${isManualMode && "border-r pr-4 border-neutral-500"}`}
                    header="Mode: "
                />

                {isManualMode && (
                    <SelectionController
                        control={control}
                        height={44}
                        name="manualMethodOption"
                        placeholder="Select method option"
                        menuItem={methodOption}
                        rules={{ required: "Please select option" }}
                    />
                )}
            </div>
        </>
    );
}
