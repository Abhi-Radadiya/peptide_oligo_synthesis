import React, { useState } from "react";
import { Controller } from "react-hook-form";

export function Dropdown({ menuItem, onSelectItem, value, label, className, error }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div className={`relative inline-block text-left w-full ${className}`}>
            <button
                id="dropdownDelayButton"
                onClick={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${value ? "text-black" : "text-neutral-400"} ${
                    error && "ring-2 ring-red-300"
                } bg-neutral-300 focus:outline-none justify-between font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full`}
                type="button"
            >
                {value ? value : label}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdownDelay"
                    className="absolute z-10 bg-white top-10 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                        {menuItem.map((el, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    onSelectItem(el.value);
                                    setIsOpen(false);
                                }}
                            >
                                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{el.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export function ControllerDropdown(props) {
    const { control, name, menuItem, rules, label, className } = props;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div className={`flex flex-col w-full ${className}`}>
                    <Dropdown
                        menuItem={menuItem}
                        label={label}
                        value={menuItem.find((item) => item.value === value)?.label}
                        onSelectItem={onChange}
                        className={className}
                        error={error}
                    />
                </div>
            )}
        />
    );
}
