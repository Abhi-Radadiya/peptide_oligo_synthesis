import React from "react";
import { Controller } from "react-hook-form";

export default function RadioButton(props) {
    const { header, buttons, control, name, rules, disabled, className } = props;

    return (
        <>
            <div className={`${className}`}>
                {header && <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{header}</h3>}
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        disabled={disabled}
                        render={({ field }) =>
                            buttons.map((el, index) => (
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" key={index}>
                                    <div className="flex items-center ps-3">
                                        <input
                                            id={`${name}-${index}`}
                                            type="radio"
                                            value={el.value}
                                            checked={field.value === el.value}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
                                            onChange={(e) => field.onChange(e.target.value)}
                                            disabled={disabled}
                                        />
                                        <label htmlFor={`${name}-${index}`} className="w-full py-3 ms-2 me-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {el.label}
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                    />
                </ul>
            </div>
        </>
    );
}