import React from "react";
import { ChromePicker } from "react-color";
import ModelWrapper from "../../../../../Components/Model/ModelWrapper";
import { Controller, useFormContext } from "react-hook-form";

export default function PickColor(props) {
    const { onClose } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <ModelWrapper onClose={onClose} header="Select color">
                <div className="mr-2 my-6">
                    <Controller
                        name="color"
                        control={control}
                        rules={{ required: "Please select a color" }}
                        render={({ field: { onChange, value } }) => (
                            <ChromePicker
                                color={value ?? "#51A447"}
                                onChange={(color) => onChange(color.hex)}
                                disableAlpha={true}
                                onChangeComplete={(color) => onChange(color.hex)}
                            />
                        )}
                    />
                    {errors.color && <div className="text-red-500 text-sm mt-1 font-normal">{errors.color.message}</div>}
                </div>
            </ModelWrapper>
        </>
    );
}
