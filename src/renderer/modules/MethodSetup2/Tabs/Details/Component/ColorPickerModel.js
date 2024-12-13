import React, { useState } from "react";
import { ChromePicker } from "react-color";
import ModelWrapper from "../../../../../Components/Model/ModelWrapper";
import { Button } from "../../../../../Components/Buttons/Buttons";

export default function PickColor(props) {
    const { onClose } = props;

    const [selectedColor, setSelectedColor] = useState(props?.selectedColor ?? "#000");

    const handleColorChange = (newColor) => {
        setSelectedColor?.(newColor);
    };

    const handleChangeCurrentColor = (color) => {
        setSelectedColor?.(color);
    };

    return (
        <>
            <ModelWrapper onClose={onClose} header="Select color">
                <div className="mr-2 my-6">
                    <ChromePicker color={selectedColor} onChange={handleColorChange} disableAlpha={true} onChangeComplete={handleChangeCurrentColor} />
                </div>

                <div className="flex justify-end">
                    <Button
                        label="Submit"
                        onClick={() => {
                            props.setSelectedColor(selectedColor.hex);
                            onClose();
                        }}
                    />
                </div>
            </ModelWrapper>
        </>
    );
}
