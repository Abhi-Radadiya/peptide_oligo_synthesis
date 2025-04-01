import React from "react"

export default function StyledInput({ label, id, error, ...props }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={id}
                className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    error ? "ring-red-500 focus:ring-red-500" : ""
                }`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    )
}
