import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import Lucide icons

function formatKey(key) {
    return key
        .replace(/^[^_]*_/, "") // Remove everything before and including the first underscore
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

export default function SchematicFlowDetailsCard() {
    const { watch } = useFormContext();
    const executingCurrentBlock = watch("executingCurrentBlock");
    const [isOpen, setIsOpen] = useState(true); // State to manage dropdown open/close

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full border border-neutral-200 transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
                    <p className="text-lg font-semibold text-neutral-800">
                        {executingCurrentBlock ? (
                            <>
                                Block : <strong>{executingCurrentBlock?.block ?? ""}</strong>
                                <span className="ml-4">
                                    Method Option : <strong>{executingCurrentBlock.label}</strong>
                                </span>
                            </>
                        ) : (
                            "No block executing"
                        )}
                    </p>
                    <div className="transition-transform duration-300 transform">{isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}</div>
                </div>

                <div className={`${isOpen ? "h-44 p-4" : "h-0"} overflow-hidden transition-all duration-300`}>
                    {!!executingCurrentBlock && (
                        <div className="w-full rounded-lg">
                            <div className="grid grid-cols-4 gap-4">
                                {Object.entries(executingCurrentBlock?.operationData ?? {})?.map(([key, value]) => {
                                    const formattedKey = formatKey(key);
                                    return (
                                        <div key={key} className="flex space-x-3 bg-neutral-200 rounded-lg px-3 py-1.5 justify-between">
                                            <span className="text-gray-600 font-medium">{formattedKey}:</span>
                                            <span className="text-gray-800 font-bold">{value?.label || value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
