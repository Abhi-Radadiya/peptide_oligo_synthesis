// import React from "react";

// export default function ColumnEditor() {
//     return <>

//     </>;
// }

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ControllerDropdown } from "../../../Components/Dropdown/Dropdown";
import { Button } from "../../../Components/Buttons/Buttons";
import InputField from "../../../Components/Input/Input";
import ColumnDetailsModel from "./Component/ColumnDetailsModel";

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

const TableWithModal = () => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: positionDetails,
    });

    const positions = [
        { value: "10barrel", name: "10 Barrel" },
        { value: "50barrel", name: "50 Barrel" },
        { value: "5mls", name: "5 MLS" },
        { value: "20mls", name: "20 MLS" },
    ];

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
        reset(positionDetails); // Reset the form before editing/viewing
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        closeModal();
    };

    return (
        <div className="container mx-auto mt-8">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Position</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Chemical</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map((position) => (
                        <tr key={position.id} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                            <td className="py-3 px-6">{position.name}</td>

                            <td className="py-3 px-6">
                                <ControllerDropdown control={control} name={`${position.value}.value`} menuItem={chemicals} label={`Select Chemical`} className="max-w-[200px]" />
                            </td>

                            <td className="py-3 px-6 space-x-4">
                                <Button bgClassName="bg-sky-300 hover:bg-sky-400" label="View" onClick={() => openModal(position, "view")} />
                                <Button bgClassName="bg-amber-200 hover:bg-amber-300" label="Edit" onClick={() => openModal(position, "edit")} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isOpen && <ColumnDetailsModel isViewMode={isViewMode} selectedPosition={selectedPosition} closeModal={closeModal} positionDetails={positionDetails} />}
        </div>
    );
};

export default TableWithModal;
