import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../Components/Buttons/Buttons";
import ToggleSwitch from "../../../Components/FormController/Switch";
import FlowRateModal from "./Component/FlowRateMeodel";
import ConfirmationPopup from "../../../Components/Popup/ConfirmationPopup";
import { addFlowRate, deleteFlowRates, updateFlowRate } from "../../../../redux/reducers/settings/flowRate";

export default function FlowRate() {
    const dispatch = useDispatch();
    const flowRates = useSelector((state) => state.flowRate.items);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSave = (data) => {
        if (editingItem) {
            dispatch(updateFlowRate(data));
        } else {
            dispatch(addFlowRate(data));
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteFlowRates(selectedPositions));
        setSelectedPositions([]);
        setShowConfirmation(false);
    };

    const amedite = useSelector((state) => state.amedite.amediteList);

    return (
        <>
            <div className="justify-between flex mb-4 items-center border-b border-neutral-300 pb-4">
                <div className="flex flex-row items-center">
                    <Button
                        label={`${selectedPositions.length === flowRates.length ? "Unselect All" : "Select All"}`}
                        onClick={() => setSelectedPositions((prevState) => (!prevState?.length ? flowRates.map((el) => el.id) : []))}
                    />
                    <Button
                        disabled={!selectedPositions.length}
                        label="Delete Selected"
                        onClick={() => setShowConfirmation(true)}
                        bgClassName="ml-2 bg-[#fa5757] text-white disabled:bg-red-200 disabled:text-neutral-500"
                    />
                </div>
                <Button label="Add position" onClick={handleAdd} />
            </div>

            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Index</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Chemical</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Flow Rate</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Enable</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flowRates.map((item, index) => {
                        const chemical = amedite.find((el) => el.id === item.chemical)?.full_name;

                        return (
                            <tr key={item.id} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                <td className="py-3 px-6">
                                    <span>{index + 1}.</span>
                                </td>
                                <td className="py-3 px-6">
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4"
                                            checked={selectedPositions.includes(item.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedPositions([...selectedPositions, item.id]);
                                                } else {
                                                    setSelectedPositions(selectedPositions.filter((id) => id !== item.id));
                                                }
                                            }}
                                        />
                                        <span>{chemical}</span>
                                    </div>
                                </td>

                                <td className="py-3 px-6">
                                    <span>{item.flowRate}</span>
                                </td>
                                <td className="py-3 px-6">
                                    <ToggleSwitch checked={item.enable} disabled />
                                </td>
                                <td className="py-3 px-6">
                                    <Button
                                        bgClassName="bg-amber-200 hover:bg-amber-300"
                                        label="Edit"
                                        onClick={() => {
                                            handleEdit(item);
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {!!isModalOpen && <FlowRateModal onClose={() => setIsModalOpen(false)} onSave={handleSave} initialData={editingItem} />}

            <ConfirmationPopup
                header="Delete flow rate!"
                isOpen={showConfirmation}
                desc="Are you sure you want to delete the selected flow rate?"
                handleConfirm={handleDelete}
                closePopup={() => setShowConfirmation(false)}
            />
        </>
    );
}
