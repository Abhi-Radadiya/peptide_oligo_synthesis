import React from "react";
import { Controller } from "react-hook-form";

export default function RadioButton(props) {
    const {
        header,
        buttons,
        control,
        name,
        rules,
        disabled,
        className,
        labelClassName = "py-3",
        wrapperClassName = "w-full",
        optionWidth = "w-full",
        indication,
        handleIndicationClick,
    } = props;

    return (
        <>
            <div className={`${className}`}>
                <div className="flex flex-row justify-between items-center">
                    {header && <h3 className="font-semibold text-gray-900">{header}</h3>}
                    {indication && (
                        <span className="text-base cursor-pointer font-normal hover:underline text-[#885af2]" onClick={handleIndicationClick}>
                            {indication}
                        </span>
                    )}
                </div>

                <ul
                    className={`items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white ${wrapperClassName}`}
                >
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        disabled={disabled}
                        defaultValue=""
                        render={({ field }) =>
                            buttons.map((el, index) => (
                                <li className={`border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ${optionWidth}`} key={index}>
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
                                        <label
                                            htmlFor={`${name}-${index}`}
                                            className={`w-full ms-2 me-2 justify-center text-sm font-medium text-gray-900 dark:text-gray-300 ${labelClassName}`}
                                        >
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
