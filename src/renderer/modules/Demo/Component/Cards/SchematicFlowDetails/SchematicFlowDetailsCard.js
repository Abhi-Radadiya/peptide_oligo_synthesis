import React from "react";
import { SmallButton } from "../../../../../Components/Buttons/Buttons";
import { useFormContext } from "react-hook-form";

function formatKey(key) {
    // Remove the part before the first underscore and apply camel case spacing
    return key
        .replace(/^[^_]*_/, "") // Remove everything before and including the first underscore
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

export default function SchematicFlowDetailsCard() {
    const { watch } = useFormContext();
    const executingCurrentBlock = watch("executingCurrentBlock");

    return (
        <>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full border border-neutral-200 transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-green-100 to-green-200 p-4">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold text-neutral-800">Working Model</h2>
                        <div className="flex flex-row space-x-2">
                            <SmallButton
                                bgClassName="bg-amber-300 hover:bg-amber-400 transition-colors duration-200 flex items-center"
                                label={
                                    <span className="flex items-center">
                                        {/* <Settings className="mr-2" size={16} /> Configure */}
                                        name
                                    </span>
                                }
                            />
                            <SmallButton
                                bgClassName="bg-green-300 hover:bg-green-400 transition-colors duration-200 flex items-center"
                                label={
                                    <span className="flex items-center">
                                        {/* <Edit className="mr-2" size={16} /> */}
                                        Edit
                                    </span>
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="p-4 h-96">
                    {!!executingCurrentBlock && (
                        <div className="w-full max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
                            {/* Header with Label and Block */}
                            <div className="flex justify-center items-center space-x-2">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {executingCurrentBlock.label} Block {executingCurrentBlock.block}
                                </h2>
                            </div>

                            {/* Displaying Operation Data */}
                            <div className="space-y-4">
                                {Object.entries(executingCurrentBlock.operationData).map(([key, value]) => {
                                    const formattedKey = formatKey(key); // Format the key for better readability
                                    return (
                                        <div key={key} className="flex items-center space-x-3">
                                            {/* Display the label of the data */}
                                            <span className="text-gray-600 font-medium">{formattedKey}:</span>
                                            {/* Display the value or label if present */}
                                            <span className="text-gray-800">{value?.label || value}</span>
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
