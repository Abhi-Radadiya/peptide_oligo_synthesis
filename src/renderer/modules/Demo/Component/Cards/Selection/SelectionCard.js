import React from "react";
import { SmallButton } from "../../../../../Components/Buttons/Buttons";
import { Edit, Settings } from "lucide-react";

export default function SelectionCard() {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden min-w-[400px] w-[400px] border border-neutral-200 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-lg font-semibold text-neutral-800">Configuration</h2>
                    <div className="flex flex-row space-x-2">
                        <SmallButton
                            bgClassName="bg-amber-300 hover:bg-amber-400 transition-colors duration-200 flex items-center"
                            label={
                                <span className="flex items-center">
                                    <Settings className="mr-2" size={16} /> Configure
                                </span>
                            }
                        />
                        <SmallButton
                            bgClassName="bg-green-300 hover:bg-green-400 transition-colors duration-200 flex items-center"
                            label={
                                <span className="flex items-center">
                                    <Edit className="mr-2" size={16} /> Edit
                                </span>
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="p-4">
                <ul className="space-y-2">
                    {[
                        { label: "Column Position", value: "1st column" },
                        { label: "Column", value: "10 MLS" },
                        { label: "Sequence", value: "Sequence xyz" },
                        { label: "Option", value: "3'" },
                        { label: "Resin", value: "Standard" },
                    ].map((item, index) => (
                        <li key={index} className="bg-neutral-50 p-2 rounded-md hover:bg-neutral-100 transition-colors duration-200 flex justify-between">
                            <span className="font-medium text-neutral-600">{item.label}:</span>
                            <span className="text-neutral-800 font-semibold">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
