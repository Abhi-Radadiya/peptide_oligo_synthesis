import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ControllerDropdown } from "../../../Components/Dropdown/Dropdown";
import { Button, SaveButton } from "../../../Components/Buttons/Buttons";
import ColumnDetailsModel from "./Component/ColumnDetailsModel";
import InputField from "../../../Components/Input/Input";

const positionDetails = {
    fullName: "",
    unit: "",
    maxPressure: "",
    maxFlowRate: "",
    diameter: "",
    height: "",
    liquidVolume: "",
    loadingVolume: "",
};

const ColumnEditor = () => {
    const {
        control,
        reset,
        register,
        control: formControl,
    } = useForm({
        defaultValues: {
            positions: [
                { name: "10 Barrel", chemical: "" },
                { name: "50 Barrel", chemical: "" },
                { name: "5 MLS", chemical: "" },
                { name: "20 MLS", chemical: "" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: formControl,
        name: "positions",
    });

    const chemicals = [
        { label: "Chm. 1", value: "chm1" },
        { label: "Chm. 2", value: "chm2" },
        { label: "Chm. 3", value: "chm3" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [isViewMode, setIsViewMode] = useState(true);
    const [selectedPosition, setSelectedPosition] = useState(null);

    const openModal = (position, mode) => {
        setSelectedPosition(position);
        setIsViewMode(mode === "view");
        setIsOpen(true);
        reset(positionDetails);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const addRow = () => {
        append({ name: "", chemical: "" });
    };

    const onSubmit = () => {};

    return (
        <div className="container w-full mt-4">
            <div className="flex flex-row gap-4 justify-end mb-4">
                <Button label="Add Chemical" onClick={addRow} bgClassName="bg-amber-200 hover:bg-amber-300 border-amber-300" />
                <SaveButton label="Save" onClick={onSubmit} bgClassName="bg-green-200 hover:bg-green-300 border-green-300" header="Saved Successfully" />
            </div>

            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 w-[10%] text-left text-gray-600 font-semibold">Index</th>
                        <th className="py-3 px-6 w-[30%] text-left text-gray-600 font-semibold">Name</th>
                        <th className="py-3 px-6 w-[30%] text-left text-gray-600 font-semibold">Chemical</th>
                        <th className="py-3 px-6 w-[30%] text-left text-gray-600 font-semibold">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {fields.map((position, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">
                                {index < 4 ? position.name : <InputField control={control} name={`positions.${index}.name`} />}
                                {/* need to add this one in database */}
                            </td>

                            <td className="py-3 px-6">
                                <ControllerDropdown
                                    control={formControl}
                                    name={`positions.${index}.chemical`}
                                    menuItem={chemicals}
                                    label={`Select Chemical`}
                                    className="max-w-[200px]"
                                />
                            </td>

                            <td className="py-3 px-6 space-x-4">
                                <Button bgClassName="bg-sky-300 hover:bg-sky-400" label="View" onClick={() => openModal(position, "view")} />
                                <Button bgClassName="bg-amber-200 hover:bg-amber-300" label="Edit" onClick={() => openModal(position, "edit")} />
                                <Button bgClassName="bg-red-300 hover:bg-red-400" label="Remove" onClick={() => remove(index)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isOpen && <ColumnDetailsModel isViewMode={isViewMode} selectedPosition={selectedPosition} closeModal={closeModal} positionDetails={positionDetails} />}
        </div>
    );
};

export default ColumnEditor;
