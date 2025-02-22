import React, { useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import ToggleSwitch from "../../../../../../Components/FormController/Switch";
import { Input } from "../../../../../../Components/Input/Input";
import { ModelButton } from "../../../../../../Components/Buttons/Buttons";

export default function BottleOperationModel(props) {
    const { onClose, handleOpenValve } = props;

    const [isAutoClose, setIsAutoClose] = useState(false);
    const [timeAfterClose, setTimeAfterClose] = useState("");

    const handleSave = (e) => {
        e.preventDefault();

        handleOpenValve(!!timeAfterClose ? Number(timeAfterClose) : "auto");
    };

    return (
        <>
            <ModelWrapper header="Open Valve" width="w-96" onClose={onClose}>
                <form onSubmit={handleSave}>
                    <div className="mt-6 space-y-4">
                        <ToggleSwitch
                            label="Auto close"
                            checked={isAutoClose}
                            handleChange={() => {
                                setIsAutoClose((prevState) => !prevState);
                                setTimeAfterClose("");
                            }}
                        />

                        <Input
                            name="timeAfterClose"
                            required={isAutoClose}
                            placeholder="Enter time in ms"
                            type="number"
                            disabled={!isAutoClose}
                            value={timeAfterClose}
                            onChange={setTimeAfterClose}
                        />

                        {isAutoClose ? (
                            <span className="text-sm italic text-neutral-600">
                                * After
                                <strong> {timeAfterClose ?? 0}ms </strong>
                                this valve will be closed automatically.
                            </span>
                        ) : (
                            <span className="text-sm italic text-neutral-600">
                                * If you don't enter time, valve <strong> will not be closed automatically</strong>.
                            </span>
                        )}

                        <ModelButton onCancel={onClose} label="Open Valve" type={"submit"} />
                    </div>
                </form>
            </ModelWrapper>
        </>
    );
}
