import React from "react";
import InputField from "../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import { FileUploader } from "../../../Components/Input/FileInput";

export default function Pressure() {
    const { control } = useForm();

    const positions = [
        { label: "Main", value: "main" },
        { label: "Amedite", value: "amedite" },
        { label: "Solvent", value: "solvent" },
        { label: "Empty C.", value: "emptyC" },
    ];

    return (
        <>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Position</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Set Value</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Trip Value</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Disable</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Method</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Selected Method</th>
                    </tr>
                </thead>

                <tbody>
                    {positions.map((el, index) => {
                        return (
                            <tr key={index} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                <td className="py-3 px-6">
                                    <span>{el.label}</span>
                                </td>

                                <td className="py-3 px-6">
                                    <InputField className="mt-2" control={control} name={`${el.value}.setValue"`} placeholder="Enter Set Value" />
                                </td>

                                <td className="py-3 px-6">
                                    <InputField className="mt-2" control={control} name="setValue" placeholder="Enter Trip Value" />
                                </td>

                                <td className="py-3 px-6">
                                    <InputField control={control} name="disable" type="checkbox" className="h-5" width="w-5" wrapperClassName="mt-2" />
                                </td>

                                <td className="py-3 px-6">
                                    <FileUploader />
                                </td>

                                <td className="py-3 px-6">No file is selected</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
