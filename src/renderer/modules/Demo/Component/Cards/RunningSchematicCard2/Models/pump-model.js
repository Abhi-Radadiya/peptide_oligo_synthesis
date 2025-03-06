import React, { useEffect, useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import InputField from "../../../../../../Components/Input/Input";
import { Button } from "../../../../../../Components/Buttons/Buttons";
import { ChevronRight } from "lucide-react";
import OpenValveToggleSwitch from "../Components/open-valve-toggle-switch";
import { useFormContext } from "react-hook-form";

export default function PumpModel(props) {
    const { onClose, pumpNumber } = props;

    const selectedPump = pumpNumber === 1 ? "pump1" : "pump2";

    const { watch, control, setValue, handleSubmit } = useFormContext();

    const [flowRate, setFlowRate] = useState("");

    const [isFlowRateMicroLitre, setIsFlowRateMicroLitre] = useState(true);

    const saveFlowRate = () => {
        setValue(`manualModeRunFlow.${selectedPump}.flowRate`, watch(`manualModeRunFlow.${selectedPump}.tempFlowRate`));
        setValue(`manualModeRunFlow.${selectedPump}.tempFlowRate`, null);
    };

    const handleNext = () => {
        saveFlowRate();
        onClose();
    };

    useEffect(() => {
        setValue(`manualModeRunFlow.${selectedPump}.tempFlowRate`, watch(`manualModeRunFlow.${selectedPump}.flowRate`));
    }, []);

    return (
        <>
            <ModelWrapper header="Select Pump" width="w-[450px]" onClose={onClose}>
                <div className="space-y-4">
                    <OpenValveToggleSwitch
                        isChecked={isFlowRateMicroLitre}
                        // TODO : transform unit of value
                        handleChange={setIsFlowRateMicroLitre}
                        leftSwitchLabel="Mili Litre / min"
                        label="Flow Rate Unit"
                        rightSwitchLabel="Micro Litre / s"
                    />

                    <InputField
                        required={true}
                        placeholder={`Enter Flow Rate in ${isFlowRateMicroLitre ? "micro-litre / s" : "mili-litre / min"}`}
                        type="number"
                        value={flowRate}
                        onChange={setFlowRate}
                        label="Flow Rate"
                        labelClassName="font-medium text-base"
                        className="w-72"
                        control={control}
                        name={`manualModeRunFlow.${selectedPump}.tempFlowRate`}
                        rules={{ required: "Flow rate is required" }}
                    />
                    {watch(`manualModeRunFlow.${selectedPump}.flowRate`) < watch(`manualModeRunFlow.${selectedPump}.tempFlowRate`) && (
                        // TODO : display flow rate max of column
                        <p className="text-red-500 text-sm mt-1">Flow rate cannot be more than column's maximum flow rate. </p>
                    )}
                </div>

                <div className="mt-6 flex justify-end">
                    <Button rightIcon={<ChevronRight />} label="Next" onClick={handleSubmit(handleNext)} bgClassName="bg-blue-300" />
                </div>
            </ModelWrapper>
        </>
    );
}
