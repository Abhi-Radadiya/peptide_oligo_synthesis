import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

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
                } border border-neutral-700 bg-neutral-50 focus:outline-none justify-between font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full`}
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
                    className="absolute z-10 bg-white top-[42px] divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDelayButton">
                        {menuItem.map((el, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    onSelectItem(el.value);
                                    setIsOpen(false);
                                }}
                            >
                                <span className="block px-4 py-2 font-normal text-base hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {el.label}
                                </span>
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
                <div className={`w-full ${className}`}>
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

export function SelectionController(props) {
    const { control, name, menuItem, rules, isDisabled, className, placeholder, width, isClearable = true, height, handleChange } = props;

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            color: "#fff",
            width,
            borderColor: state.isFocused ? "#d4d4d4" : "#d4d4d4",
            boxShadow: state.isFocused ? "0 0 0 1px #333" : "none",
            "&:hover": {
                borderColor: "#d4d4d4",
            },
            height: height,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#dedcdc" : "white",
            color: state.isDisabled ? "#c4c2c2" : "#000",
            "&:hover": {
                backgroundColor: state.isDisabled ? "#fff" : "#f5f5f5",
            },
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: "#c4c0c0",
            };
        },
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div className={`${className}`}>
                    <Select
                        value={value}
                        isSearchable
                        className={`basic-single placeholder:text-neutral-200 ${className}`}
                        classNamePrefix="select"
                        isDisabled={isDisabled}
                        isClearable={isClearable}
                        options={menuItem}
                        placeholder={placeholder}
                        styles={customStyles}
                        onChange={(option) => {
                            onChange(option);
                            handleChange?.(option);
                        }}
                    />
                    {error && <p className="text-red-500 text-sm">{error.message}</p>}
                </div>
            )}
        />
    );
}

export const Selection = (props) => {
    const { onChange, menuItem, value, isDisabled, className, placeholder, width, isClearable = true, height, isMulti = false } = props;

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: "#f4f4f4",
            color: "#333",
            width,
            borderColor: state.isFocused ? "#dedcdc" : "#2d2e2e",
            boxShadow: state.isFocused ? "0 0 0 1px #333" : "none",
            "&:hover": {
                borderColor: "#f5f5f5",
            },
            height: height,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#dedcdc" : "white",
            color: "#333",
            "&:hover": {
                backgroundColor: "#f5f5f5",
            },
            "&:focus": {
                backgroundColor: "#f5f5f5",
            },
        }),
    };

    return (
        <Select
            value={value}
            isSearchable
            className={`basic-single ${className}`}
            classNamePrefix="select"
            isDisabled={isDisabled}
            isClearable={isClearable}
            options={menuItem}
            placeholder={placeholder}
            styles={customStyles}
            onChange={onChange}
            isMulti={isMulti}
        />
    );
};
