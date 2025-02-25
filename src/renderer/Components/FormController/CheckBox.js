import React, { useState } from "react";
import { Controller } from "react-hook-form";

export default function Checkbox(props) {
    const { control, name, label, rules, className, labelClassName = "text-sm font-medium text-gray-900", onChange, disabled } = props;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <div className={`flex items-center ${className}`}>
                    <input
                        id={name}
                        type="checkbox"
                        checked={field.value || false}
                        onChange={(e) => {
                            field.onChange(e.target.checked);
                            onChange?.(e.target.checked);
                        }}
                        disabled={disabled}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl cursor-pointer"
                    />
                    {label && (
                        <label htmlFor={name} className={`ms-2 ${labelClassName} dark:text-gray-300 cursor-pointer`}>
                            {label}
                        </label>
                    )}
                </div>
            )}
        />
    );
}

export function SimpleCheckBox({ id, checked = false, onChange, color = "purple", size = "md", disabled = false }) {
    const getColorClasses = (color) => {
        switch (color) {
            case "purple":
                return {
                    bgChecked: "bg-purple-500",
                    border: "border-purple-300",
                    bgHover: "bg-purple-100",
                };
            case "blue":
                return {
                    bgChecked: "bg-blue-500",
                    border: "border-blue-300",
                    bgHover: "bg-blue-100",
                };
            case "green":
                return {
                    bgChecked: "bg-green-500",
                    border: "border-green-300",
                    bgHover: "bg-green-100",
                };
            default:
                return {
                    bgChecked: "bg-purple-500",
                    border: "border-purple-300",
                    bgHover: "bg-purple-100",
                };
        }
    };

    const getSizeClasses = (size) => {
        switch (size) {
            case "sm":
                return "w-5 h-5";
            case "md":
                return "w-7 h-7";
            case "lg":
                return "w-9 h-9";
            default:
                return "w-7 h-7";
        }
    };

    const colorClasses = getColorClasses(color);
    const sizeClasses = getSizeClasses(size);

    return (
        <label
            className={`ios-checkbox relative inline-block cursor-pointer select-none transition-transform duration-300 hover:scale-105 ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            <input type="checkbox" id={id} checked={checked} onChange={onChange} disabled={disabled} className="hidden" />
            <div className={`checkbox-wrapper relative ${sizeClasses} rounded-lg transition-transform duration-200 ease-in-out`}>
                <div
                    className={`checkbox-bg absolute inset-0 rounded-lg border-2 ${checked ? colorClasses.bgChecked : "bg-white"} ${
                        colorClasses.border
                    } transition-all duration-200 ease-in-out`}
                ></div>
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className={`checkbox-icon absolute inset-0 m-auto w-4/5 h-4/5 text-white transform ${
                        checked ? "scale-100" : "scale-0"
                    } transition-all duration-200 ease-in-out`}
                >
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="3"
                        stroke="currentColor"
                        d="M4 12L10 18L20 6"
                        className={`check-path stroke-dasharray-40 stroke-dashoffset-40 transition-stroke-dashoffset duration-300 ease-in-out delay-100 ${
                            checked ? "stroke-dashoffset-0" : ""
                        }`}
                    ></path>
                </svg>
            </div>
        </label>
    );
}
