import React, { useEffect } from "react";
import InputField from "../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import { getTableData, saveUVSettings } from "../../../function/electronFunctionDeclaration";

export default function UVSetting() {
    const detector = [{ position: "1" }, { position: "2" }, { position: "3" }];

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: detector.reduce((form, item) => {
            form[`${item.position}`] = { value: "" };
            return form;
        }, {}),
    });

    const saveUVSetting = async (data) => {
        try {
            const response = await saveUVSettings(data);
            console.log(`response : `, response);
        } catch (error) {
            console.log(`error saveUVSetting : `, error);
        }
    };

    const fetchUVSetting = async () => {
        try {
            const response = await getTableData("uv_setting");

            response.data.forEach((el) => {
                setValue(`${el.id}.value`, el.value);
                setValue(`${el.id}.checked`, !!el.checked);
            });
        } catch (error) {
            console.log(`error fetchThreshold : `, error);
        }
    };

    useEffect(() => {
        fetchUVSetting();
    }, []);

    return (
        <>
            <div className="overflow-x-auto p-4 border border-neutral-300 rounded-xl bg-neutral-50 w-fit">
                <div className="flex flex-row justify-between mb-4">
                    <h1 className="text-xl font-medium">UV Setting</h1>

                    <button className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]" onClick={handleSubmit(saveUVSetting)}>
                        Save
                    </button>
                </div>

                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Position</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">UV Value</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">*</th>
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
                                        <InputField
                                            control={control}
                                            rules={{
                                                min: {
                                                    value: 190,
                                                    message: "Value must be between 190 - 700",
                                                },
                                                max: {
                                                    value: 700,
                                                    message: "Value must be between 190 - 700",
                                                },
                                            }}
                                            name={`${el.position}.value`}
                                            placeholder={`Enter UV Value [190-700]`}
                                            type={"number"}
                                        />
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
