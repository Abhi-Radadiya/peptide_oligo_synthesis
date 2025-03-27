import { Plus } from "lucide-react";
import React from "react";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import ValveOperation from "./valve-operation";
import PumpOperation from "./pump-operation";
import { Button } from "../../../../../Components/Buttons/Buttons";

export default function OperationDefinition(props) {
    const { append } = props;

    const { control, watch } = useFormContext();

    const PROCESS_TYPES = [
        { label: "Valve Operation", value: "valveOperation" },
        { label: "Pump Operation", value: "pumpOperation" },
        { label: "Detect Liquid Sensor", value: "detectLiquidSensor" }
    ];

    return (
        <>
            <div className="space-y-2 border border-gray-400 rounded-lg px-3 py-2">
                <SelectionController label="Process Type" placeholder="Select Process Type" control={control} menuItem={PROCESS_TYPES} name={`processType`} />

                {watch("processType")?.value === "valveOperation" && <ValveOperation processType={watch("processType")} append={append} />}

                {watch("processType")?.value === "pumpOperation" && <PumpOperation append={append} processType={watch("processType")} />}
            </div>
        </>
    );
}
