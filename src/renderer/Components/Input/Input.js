import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({ control, name, label, rules, placeholder, type = "text", wrapperClassName }) => {
    return (
        <div className={`${wrapperClassName}`}>
            <label className="block text-gray-700">{label}</label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input {...field} type={type} placeholder={placeholder} className={`w-full px-3 py-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`} />
                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                    </>
                )}
            />
        </div>
    );
};

export default InputField;
