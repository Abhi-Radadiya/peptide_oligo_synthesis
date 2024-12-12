import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../../../Components/Input/Input";
import { setDetectors } from "../../../../redux/reducers/settings/uvSetting";

export default function UVSetting() {
    const dispatch = useDispatch();

    const detectors = useSelector((state) => state.uvSetting.detectors);

    const { control, handleSubmit } = useForm({
        defaultValues: detectors.reduce((form, item) => {
            form[item.position] = {
                value: item.value,
                checked: item.checked,
            };
            return form;
        }, {}),
    });

    const saveUVSetting = async (data) => {
        const uvSettings = detectors.map((detector) => ({
            position: detector.position,
            value: data[detector.position]?.value || "",
            checked: data[detector.position]?.checked || false,
        }));

        dispatch(setDetectors(uvSettings));
    };

    return (
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
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Disable</th>
                    </tr>
                </thead>

                <tbody>
                    {detectors.map((el) => (
                        <tr key={el.position} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                            <td className="py-3 px-6">
                                <span>{el.position}</span>
                            </td>
                            <td className="py-3 px-6">
                                <InputField
                                    control={control}
                                    rules={{ min: { value: 190, message: "Value must be between 190 - 700" }, max: { value: 700, message: "Value must be between 190 - 700" } }}
                                    name={`${el.position}.value`}
                                    placeholder={`Enter UV Value [190-700]`}
                                    type="number"
                                />
                            </td>
                            <td className="py-3 px-6">
                                <InputField className="h-5" width="w-5" control={control} name={`${el.position}.checked`} type="checkbox" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
