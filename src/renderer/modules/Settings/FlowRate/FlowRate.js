import React from "react";
import { ControllerDropdown } from "../../../Components/Dropdown/Dropdown";
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../../../Components/Input/Input";
import { Button, SaveButton } from "../../../Components/Buttons/Buttons";

export default function FlowRate() {
    const chemicals = [
        { label: "chemical1", value: "chemical1" },
        { label: "chemical2", value: "chemical2" },
        { label: "chemical3", value: "chemical3" },
        { label: "chemical4", value: "chemical4" },
    ];

    const { control, handleSubmit } = useForm({
        defaultValues: {
            items: [{ value: "", checked: false }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const addRow = () => {
        append({ value: "", checked: false });
    };

    const onSubmit = (data) => {
        return true;
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-4 justify-end mb-4">
                    <Button label="Add Chemical" onClick={addRow} bgClassName="bg-amber-200 hover:bg-amber-300 border-amber-300" />
                    <SaveButton label="Save" onClick={onSubmit} bgClassName="bg-green-200 hover:bg-green-300 border-green-300" header="Saved Successfully" />
                </div>

                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Index</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Chemical</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Flow Rate</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Disable</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                <td className="py-3 px-6">
                                    <span>{index + 1}.</span>
                                </td>

                                <td className="py-3 px-6">
                                    <ControllerDropdown control={control} name={`${field.id}.value`} menuItem={chemicals} label={`Select Chemical`} className="max-w-[200px]" />
                                </td>

                                <td className="py-3 px-6">
                                    <InputField width="w-[200px]" control={control} name={`${field.id}.flowRate`} type="number" />
                                </td>

                                <td className="py-3 px-6">
                                    <InputField width="w-5" className="h-5" control={control} name={`${field.id}.checked`} type={"checkbox"} />
                                </td>
                                <td className="py-3 px-6">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)} // Remove row
                                        className="text-red-500 hover:text-red-700 font-bold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Button to add new row */}
            </form>

            {/* <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Position</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">UV Value</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">*</th>
                    </tr>
                </thead>

                <tbody>
                    {chemicals.map((el, index) => {
                        return (
                            <tr key={index} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                <td className="py-3 px-6">
                                    <span>{index}.</span>
                                </td>

                                <td className="py-3 px-6">
                                    <ControllerDropdown name={`${el.value}.value`} control={control} placeholder={`Enter flow rates`} type={"number"} />
                                </td>

                                <td className="py-3 px-6">
                                    <InputField width="w-5" className="h-5" control={control} name={`${el.value}.checked`} type={"checkbox"} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table> */}
        </>
    );
}
