import { Controller } from "react-hook-form";
import React from "react";

export default function ToggleSwitch(props) {
    const { checked, label, handleChange, disabled, offBgColor = "bg-neutral-200", checkedBgColor = "checked:bg-slate-800", className } = props;

    return (
        <>
            <div className={`flex flex-row gap-2 items-center ${className}`}>
                {label && (
                    <label htmlFor="" className="text-gray-700 leading-[17px] font-normal">
                        {label}
                    </label>
                )}
                <div className="relative inline-block w-11 h-5">
                    <input
                        disabled={disabled}
                        checked={checked}
                        onChange={handleChange}
                        id="switch-component"
                        type="checkbox"
                        className={`${offBgColor} ${checkedBgColor} peer appearance-none w-11 h-5 rounded-full cursor-pointer transition-colors duration-300 disabled:cursor-not-allowed`}
                    />
                    <label
                        htmlFor="switch-component"
                        className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer ${
                            disabled && "cursor-not-allowed"
                        }`}
                    ></label>
                </div>
            </div>
        </>
    );
}

export function ControlledSwitch(props) {
    const { name, label, control, offBgColor = "bg-neutral-200", checkedBgColor = "checked:bg-slate-800", handleToggle } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-row gap-2 items-center">
                    {label && (
                        <label htmlFor="" className="text-gray-700 leading-[17px] font-normal">
                            {label}
                        </label>
                    )}
                    <div className="relative inline-block w-11 h-5">
                        <input
                            checked={field.value ?? false}
                            onChange={(e) => {
                                field.onChange(e.target.checked);
                                handleToggle?.(e.target.checked);
                            }}
                            id={`${name}-switch-component`}
                            type="checkbox"
                            className={`${offBgColor} ${checkedBgColor} peer appearance-none w-11 h-5 rounded-full cursor-pointer transition-colors duration-300 disabled:cursor-not-allowed`}
                        />
                        <label
                            htmlFor={`${name}-switch-component`}
                            className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                        ></label>
                    </div>
                </div>
            )}
        />
    );
}
