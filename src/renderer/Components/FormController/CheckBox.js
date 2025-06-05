import { Check } from "lucide-react"
import React, { useState } from "react"
import { Controller } from "react-hook-form"

export default function Checkbox(props) {
    const { control, name, label, rules, className, labelClassName = "text-sm font-medium text-gray-900", onChange, disabled } = props

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
                            field.onChange(e.target.checked)
                            onChange?.(e.target.checked)
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
    )
}

export const SimpleCheckBox = ({ checked, onChange }) => (
    <div
        onClick={onChange}
        className={`w-5 h-5 rounded border cursor-pointer flex items-center justify-center transition-all duration-200 ${
            checked ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-600" : "border-gray-300 bg-white hover:bg-gray-100"
        }`}
    >
        {checked && <Check size={14} className="text-white" />}
    </div>
)
