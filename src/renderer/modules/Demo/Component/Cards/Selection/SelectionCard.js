import React, { useMemo, useState } from "react";
import { SmallButton } from "../../../../../Components/Buttons/Buttons";
import { Settings } from "lucide-react";
import ConfigurationModel from "../../../Model/Configuration/ConfigurationModel";
import { useFormContext } from "react-hook-form";

export default function SelectionCard() {
    const { watch } = useFormContext();
    const [showConfigurationModel, setShowConfigurationModel] = useState(false);

    // Fetch selected block details dynamically
    const configuration = useMemo(() => {
        if (!watch("isSavedOne"))
            return {
                columnPosition: "-",
                column: "-",
                sequence: "-",
                option: "-",
                resin: "-",
            };

        return {
            columnPosition: watch("columnPosition")?.label,
            column: watch("column")?.label,
            sequence: watch("sequence")?.label,
            option: watch("option") + "'",
            resin: watch("resin") == "universal" ? "Universal" : "Standard",
        };
    }, [watch("isSavedOne"), watch("columnPosition"), watch("column"), watch("sequence"), watch("option"), watch("resin")]);

    // Define the labels for each field
    const fieldLabels = {
        columnPosition: "Column Position",
        column: "Column",
        sequence: "Sequence",
        option: "Option",
        resin: "Resin",
    };

    return (
        <>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden min-w-[400px] w-[400px] border border-neutral-200 transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold text-neutral-800">Configuration</h2>
                        <SmallButton
                            bgClassName="bg-green-300 hover:bg-green-400 transition-colors duration-200 flex items-center"
                            label={
                                <span className="flex items-center">
                                    <Settings className="mr-2" size={16} /> Configure
                                </span>
                            }
                            onClick={() => setShowConfigurationModel(true)}
                        />
                    </div>
                </div>

                <div className="p-4">
                    <ul className="space-y-2">
                        {Object.entries(configuration).map(([key, value]) => (
                            <li key={key} className="bg-neutral-50 p-2 rounded-md hover:bg-neutral-100 transition-colors duration-200 flex justify-between">
                                <span className="font-medium text-neutral-600">{fieldLabels[key]}:</span>
                                <span className="text-neutral-800 font-semibold">{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {showConfigurationModel && <ConfigurationModel onClose={() => setShowConfigurationModel(false)} />}
        </>
    );
}
