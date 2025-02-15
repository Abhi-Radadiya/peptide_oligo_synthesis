import React from "react";
import { Controller } from "react-hook-form";

const InputField = (props) => {
    const {
        control,
        name,
        label,
        rules,
        placeholder,
        type = "text",
        wrapperClassName,
        className,
        width,
        disabled,
        borderClass = "border",
        labelClassName = "text-gray-700 leading-[17px] font-normal",
        rightFixItem,
    } = props;

    const handleKeyDown = (e) => {
        if (e.key === "e" || e.key === "E") {
            e.preventDefault();
        }

        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
        }
    };

    const handleWheel = (e) => {
        e.target.blur();
    };

    const numberInputProps = {
        onKeyDown: handleKeyDown,
        onWheel: handleWheel,
    };

    return (
        <div className={`${wrapperClassName}`}>
            {label && <label className={`block pb-2 ${labelClassName}`}>{label}</label>}
            <Controller
                control={control}
                name={name}
                rules={rules}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                        <input
                            {...field}
                            value={field.value ?? ""}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            className={`px-3 py-2 ${rightFixItem ? "pl-3 pr-12" : "px-3"} ${borderClass} shadow-md focus:ring-1 ring-offset-2 ring-neutral-900 rounded-lg ${
                                error ? "border-red-500" : "border-neutral-600"
                            } ${className} ${width ?? "w-full"}`}
                            {...(type === "number" ? numberInputProps : {})}
                            {...(type === "checkbox" ? { checked: field.value ?? false } : {})}
                        />
                        {rightFixItem && <span className="absolute right-4 top-2">{rightFixItem}</span>}
                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

export default InputField;
