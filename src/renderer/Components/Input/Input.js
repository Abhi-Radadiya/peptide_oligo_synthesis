import React from "react";
import { Controller } from "react-hook-form";

const InputField = (props) => {
    const { control, name, label, rules, placeholder, type = "text", wrapperClassName, className, width } = props;

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
            {label && <label className="block text-gray-700 leading-[17px]">{label}</label>}
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            className={`px-3 py-2 border rounded ${error ? "border-red-500" : "border-gray-300"} ${className} ${width ?? "w-full"}`}
                            {...(type === "number" ? numberInputProps : {})}
                            {...(type === "checkbox" ? { checked: field.value ?? false } : {})}
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                    </>
                )}
            />
        </div>
    );
};

export default InputField;
