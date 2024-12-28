import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePositions, updatePositions } from "../../../../redux/reducers/settings/pressure";
import PressureModal from "./Component/AddPressureModel";
import { Button } from "../../../Components/Buttons/Buttons";
import ConfirmationPopup from "../../../Components/Popup/ConfirmationPopup";
import ToggleSwitch from "../../../Components/FormController/Switch";
import { getUniqueId } from "../../../Helpers/Constant";
import { openToast } from "../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { SUCCESS } from "../../../Helpers/Icons";

export default function Pressure() {
    const dispatch = useDispatch();
    const positions = useSelector((state) => state.pressure.positions);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [editingPosition, setEditingPosition] = useState(null);

    const handleDelete = () => {
        dispatch(deletePositions(selectedPositions));
        setSelectedPositions([]);

        setShowConfirmation(false);

        dispatch(openToast({ text: "Position deleted successfully.", icon: SUCCESS }));
    };

    const handleEdit = (position) => {
        setEditingPosition(position);
        setIsModalOpen(true);
    };

    const handleSave = (data) => {
        if (editingPosition) {
            dispatch(updatePositions([data]));
        } else {
            dispatch(updatePositions([{ id: getUniqueId(), ...data }, ...positions]));
        }

        setIsModalOpen(false);

        dispatch(openToast({ text: "Position saved successfully.", icon: SUCCESS }));
    };

    const [showConfirmation, setShowConfirmation] = useState(false);

    return (
        <>
            <div className="overflow-x-auto p-4 border border-neutral-300 rounded-xl bg-neutral-50">
                <div className="justify-between flex mb-4 items-center border-b border-neutral-300 pb-4">
                    <div className="flex flex-row items-center">
                        <Button
                            label={`${selectedPositions.length === positions.length ? "Unselect All" : "Select All"}`}
                            onClick={() => setSelectedPositions((prevState) => (!prevState?.length ? positions.map((el) => el.id) : []))}
                        />
                        <Button
                            disabled={!selectedPositions.length}
                            label="Delete Selected"
                            onClick={() => setShowConfirmation(true)}
                            bgClassName="ml-2 bg-[#fa5757] text-white disabled:bg-red-200 disabled:text-neutral-500"
                        />
                    </div>
                    <Button label="Add position" onClick={() => setIsModalOpen(true)} />
                </div>

                <table className="bg-white shadow-md rounded-lg w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Index</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Position</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Set Value</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Trip Value</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Enable</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Method</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Selected Method</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((el, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                <td className="py-3 px-6">
                                    <span>{index + 1}.</span>
                                </td>
                                <td className="py-3 px-6">
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4"
                                            checked={selectedPositions.includes(el.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedPositions([...selectedPositions, el.id]);
                                                } else {
                                                    setSelectedPositions(selectedPositions.filter((id) => id !== el.id));
                                                }
                                            }}
                                        />
                                        <span>{el.position}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6">
                                    <span>{el.setValue}</span>
                                </td>
                                <td className="py-3 px-6">
                                    <span>{el.tripValue}</span>
                                </td>
                                <td className="py-3 px-6">
                                    <span>
                                        <ToggleSwitch checked={el.enable} disabled />
                                    </span>
                                </td>
                                <td className="py-3 px-6">
                                    <span>{el.file ? el.file.name : "No file selected"}</span>
                                </td>
                                <td className="py-3 px-6">
                                    {el.file ? (
                                        <div className="group relative">
                                            <span className="text-neutral-800 font-normal cursor-alias">{el.file.name}</span>
                                            <span className="hidden group-hover:block absolute right-0 bg-slate-200 text-xs py-0.5 rounded-lg px-2 top-6">
                                                {el.file.path}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-neutral-500">No file selected</span>
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    <Button
                                        bgClassName="bg-amber-200 hover:bg-amber-300"
                                        label="Edit"
                                        onClick={() => {
                                            handleEdit(el);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!!isModalOpen && <PressureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} initialData={editingPosition} />}

            <ConfirmationPopup
                header="Delete sequence !"
                isOpen={showConfirmation}
                desc="Are you sure you want to delete the selected position?"
                handleConfirm={handleDelete}
                closePopup={() => setShowConfirmation(false)}
            />
        </>
    );
}
