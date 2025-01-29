import React, { useState } from "react";
import { ChromePicker } from "react-color";
import ModelWrapper from "../../../../../Components/Model/ModelWrapper";
import { useFormContext } from "react-hook-form";
import { ModelButton } from "../../../../../Components/Buttons/Buttons";

export default function PickColor(props) {
    const { onClose } = props;

    const { setValue, getValues } = useFormContext();

    const [tempColor, setTempColor] = useState(getValues("color") ?? "#000000");

    const handleSave = () => {
        setValue("color", tempColor);
        setTempColor("#000000");
        onClose();
    };

    return (
        <>
            <ModelWrapper width="w-[18vw]" onClose={onClose} header="Select color">
                <div className="mr-2 mt-6">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <span className="text-sm font-normal">Selected color : </span>
                        <div className="h-10 w-24 rounded-lg" style={{ background: tempColor }} />
                    </div>

                    <ChromePicker
                        color={tempColor}
                        onChange={(color) => setTempColor(color.hex)}
                        disableAlpha={true}
                        onChangeComplete={(color) => setTempColor(color.hex)}
                    />
                    <ModelButton onCancel={onClose} handleSave={handleSave} />
                </div>
            </ModelWrapper>
        </>
    );
}
