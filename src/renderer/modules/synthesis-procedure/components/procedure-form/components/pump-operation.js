import React, { useState } from "react";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import InputField from "../../../../../Components/Input/Input";
import OpenValveToggleSwitch from "../../../../Demo/Component/Cards/RunningSchematicCard2/Components/open-valve-toggle-switch";
import { Button } from "../../../../../Components/Buttons/Buttons";
import { Plus } from "lucide-react";

export default function PumpOperation(props) {
    const { append, processType } = props;

    const { control, setValue, watch, reset } = useForm({
        defaultValues: {
            selectedPump: "",
            pumpRPM: "",
            pumpTime: "",
            liquidVolume: ""
        }
    });

    const pumpMenuItem = [
        { label: "Pump 1", value: "pump1" },
        { label: "Pump 2", value: "pump2" }
    ];

    const [pumpInputType, setPumpInputType] = useState("pumpTime");

    const handleChangePumpInputType = () => {
        setPumpInputType(pumpInputType !== "pumpTime" ? "pumpTime" : "liquidVolume");
        setValue(pumpInputType, "");
    };

    const addNewProcess = () => {
        append({
            processType,
            selectedPump: watch("selectedPump"),
            pumpRPM: watch("pumpRPM"),
            pumpInputType,
            [pumpInputType]: watch(pumpInputType)
        });
        reset();
    };

    return (
        <>
            <SelectionController control={control} menuItem={pumpMenuItem} name={`selectedPump`} label="Select Pump" placeholder="Select Pump" />

            <InputField control={control} name="pumpRPM" placeholder="Enter pump RPM (Rotation per Minutes)" label="Pump RPM" />

            <OpenValveToggleSwitch
                isChecked={pumpInputType === "pumpTime"}
                handleChange={handleChangePumpInputType}
                leftSwitchLabel="Time"
                rightSwitchLabel="Liquid Volume"
                label="Input Type"
            />

            <InputField
                control={control}
                name={pumpInputType}
                placeholder={pumpInputType === "pumpTime" ? "Enter Pump Time in ms" : "Enter Discharge Volume in ml"}
                label={pumpInputType === "pumpTime" ? "Pump Time" : "Discharge Volume"}
            />

            <Button className="ml-auto" type="button" label="Add Process" leftIcon={<Plus color="blue" />} bgClassName="bg-blue-400" onClick={addNewProcess} />
        </>
    );
}
