import React, { useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { Input } from "../../../../../../Components/Input/Input";
import { ModelButton } from "../../../../../../Components/Buttons/Buttons";
import OpenValveToggleSwitch from "../Components/open-valve-toggle-switch";

export default function BottleOperationModel(props) {
    const { onClose, bottleOperationDetails, handleOpenValve } = props;

    const [isMicroLitre, setIsMicroLitre] = useState(true);

    const [volume, setVolume] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        handleOpenValve(volume, isMicroLitre ? "microLitre" : "miliLitre");
    };

    return (
        <>
            <ModelWrapper header="Open Valve" width="w-96" onClose={onClose}>
                <form onSubmit={handleSave}>
                    <div className="mt-6 space-y-4">
                        {/* TODO need to transform this component into radio must not be switch */}
                        <OpenValveToggleSwitch
                            isChecked={isMicroLitre}
                            handleChange={setIsMicroLitre}
                            leftSwitchLabel="Mili Litre"
                            label="Volume Unit"
                            rightSwitchLabel="Micro Litre"
                        />

                        <Input
                            name="volume"
                            required={true}
                            placeholder={`Enter volume in ${isMicroLitre ? "micro" : "mili"} litre`}
                            type="number"
                            value={volume}
                            onChange={setVolume}
                            label="Volume"
                            labelClassName="font-medium text-base"
                        />

                        {!!volume && (
                            <span className="text-sm italic text-neutral-600">
                                *Valve will be opened until Amedite <strong>{bottleOperationDetails.label}</strong> flows{" "}
                                <strong>
                                    {volume} {isMicroLitre ? "micro" : "mili"} litre.
                                </strong>
                            </span>
                        )}
                        <ModelButton onCancel={onClose} type={"submit"} />
                    </div>
                </form>
            </ModelWrapper>
        </>
    );
}
