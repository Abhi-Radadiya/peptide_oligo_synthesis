import React, { useEffect, useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import ToggleSwitch from "../../../../../../Components/FormController/Switch";
import { ModelButton } from "../../../../../../Components/Buttons/Buttons";
import { useFormContext } from "react-hook-form";

export default function RgValveActionModel(props) {
    const { onClose } = props;

    const { setValue, watch } = useFormContext();

    const [rgValveStatus, setRgValveStatus] = useState("");

    const handleSave = () => {
        console.log(`rgValveStatus : `, rgValveStatus);

        setValue("manualModeRunFlow.rgValveStatus", rgValveStatus);

        onClose();
    };

    useEffect(() => {
        setRgValveStatus(watch("manualModeRunFlow.rgValveStatus"));
    }, []);

    return (
        <ModelWrapper header="RG Valve Status" desc="Select valve status" width="w-[450px]" onClose={onClose}>
            <div className="space-y-6 mt-4 border p-4 border-neutral-300 rounded-lg">
                <ToggleSwitch
                    className="justify-between"
                    label="Open to Flow Waste Valve - Pump 2"
                    handleChange={() => setRgValveStatus("valve2Pump2")}
                    checkedBgColor="checked:bg-blue-500"
                    offBgColor="bg-slate-200"
                    checked={rgValveStatus === "valve2Pump2"}
                />

                <ToggleSwitch
                    className="justify-between"
                    label="Open to Flow Reagent - Pump 2"
                    handleChange={() => setRgValveStatus("reagent2Pump2")}
                    checkedBgColor="checked:bg-blue-500"
                    checked={rgValveStatus === "reagent2Pump2"}
                    offBgColor="bg-slate-200"
                />

                <ToggleSwitch
                    className="justify-between"
                    label="Close Valve"
                    checked={rgValveStatus === "closeValve"}
                    handleChange={() => setRgValveStatus("closeValve")}
                    checkedBgColor="checked:bg-blue-500"
                    offBgColor="bg-slate-200"
                />
            </div>
            <ModelButton onCancel={onClose} handleSave={handleSave} />
        </ModelWrapper>
    );
}
