import React, { useEffect, useState } from "react";
import InputField from "../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import { getLiquidDetection, saveLiquidDetectionDetails } from "../../../function/electronFunctionDeclaration";

export default function LiquidDetection() {
    const [detector] = useState([{ position: "R1" }, { position: "R2" }, { position: "R3" }, { position: "R4" }, { position: "R5" }, { position: "A1" }]);

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: detector.reduce((form, item) => {
            form[`${item.position}`] = { threshold: "" };
            return form;
        }, {}),
    });

    const saveThreshold = async (data) => {
        try {
            const response = await saveLiquidDetectionDetails(data);
            console.log(`response : `, response);
        } catch (error) {
            console.log(`error saveThreshold : `, error);
        }
    };

    const fetchThreshold = async () => {
        try {
            const response = await getLiquidDetection();
            response.data.forEach((el) => {
                setValue(`${el.position}.threshold`, el.threshold);
                setValue(`${el.position}.checked`, !!el.checked);
            });
        } catch (error) {
            console.log(`error fetchThreshold : `, error);
        }
    };

    useEffect(() => {
        fetchThreshold();
    }, []);

    return (
        <>
            <div className="overflow-x-auto p-4 border border-neutral-300 rounded-xl bg-neutral-50 w-fit">
                <div className="flex flex-row justify-between mb-4">
                    <h1 className="text-xl font-medium">Threshold</h1>

                    <button className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]" onClick={handleSubmit(saveThreshold)}>
                        Save
                    </button>
                </div>

                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Position</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Threshold</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Disabled</th>
                        </tr>
                    </thead>

                    <tbody>
                        {detector.map((el, index) => {
                            return (
                                <tr key={index} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                    <td className="py-3 px-6">
                                        <span>{el.position}</span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <InputField control={control} name={`${el.position}.threshold`} placeholder={`Enter ${el.position} threshold`} type={"number"} />
                                    </td>
                                    <td className="py-3 px-6">
                                        <InputField width="w-5" className="h-5" control={control} name={`${el.position}.checked`} type={"checkbox"} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
