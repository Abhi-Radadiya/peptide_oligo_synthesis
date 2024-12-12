import React, { useState } from "react";
import { Button } from "../../../Components/Buttons/Buttons";
import ColumnDetailsModel from "./Component/ColumnDetailsModel";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationPopup from "../../../Components/Popup/ConfirmationPopup";
import { deletePositions } from "../../../../redux/reducers/settings/columnEditor";

const ColumnEditor = () => {
    const columnEditor = useSelector((state) => state.columnEditor.positions);
    const dispatch = useDispatch();

    const [showModel, setShowModel] = useState(false);
    const [editingDetails, setEditingDetails] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleRowSelect = (id) => {
        setSelectedRows((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]));
    };

    const handleBulkDelete = () => {
        dispatch(deletePositions(selectedRows));
        setSelectedRows([]);
        setShowConfirmation(false);
    };

    return (
        <div className="w-full mt-4">
            <div className="justify-between flex mb-4 items-center border-b border-neutral-300 pb-4">
                <div className="flex flex-row items-center">
                    <Button
                        label={`${selectedRows.length === columnEditor.length ? "Unselect All" : "Select All"}`}
                        onClick={() => setSelectedRows((prevState) => (!prevState?.length ? columnEditor.map((el) => el.id) : []))}
                    />
                    <Button
                        disabled={!selectedRows.length}
                        label="Delete Selected"
                        onClick={() => setShowConfirmation(true)}
                        bgClassName="ml-2 bg-[#fa5757] text-white disabled:bg-red-200 disabled:text-neutral-500"
                    />
                </div>
                <Button label="Add position" onClick={() => setShowModel(true)} />
            </div>

            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Index</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Name</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Unit</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Max pressure</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Max flow rate</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Diameter</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Height</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Liquid Volume</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Loading Volume</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Actions</th>
                    </tr>
                </thead>

                {columnEditor?.length ? (
                    <tbody>
                        {columnEditor?.map((el, index) => {
                            return (
                                <tr key={el.id} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                    <td className="py-3 px-6">{index + 1}.</td>

                                    <td className="py-3 px-6">
                                        <div className="flex flex-row items-center gap-2">
                                            <input type="checkbox" className="h-4 w-4" checked={selectedRows.includes(el.id)} onChange={() => handleRowSelect(el.id)} />
                                            {el.name}
                                        </div>
                                    </td>

                                    <td className="py-3 px-6">{el.unit}</td>

                                    <td className="py-3 px-6">{el.maxPressure}</td>

                                    <td className="py-3 px-6">{el.maxFlowRate}</td>

                                    <td className="py-3 px-6">{el.diameter}</td>

                                    <td className="py-3 px-6">{el.height}</td>
                                    <td className="py-3 px-6">{el.liquidVolume}</td>
                                    <td className="py-3 px-6">{el.loadingVolume}</td>
                                    <td className="py-3 px-6 space-x-4 flex flex-row gap-4">
                                        <Button
                                            bgClassName="bg-amber-200 hover:bg-amber-300"
                                            label="Edit"
                                            onClick={() => {
                                                setEditingDetails(el);
                                                setShowModel(true);
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                ) : (
                    <tbody>
                        <tr className="border-b hover:bg-gray-100 even:bg-neutral-50">
                            <td colSpan={10} className="py-10 text-neutral-500 font-bold px-6 text-center">
                                No positions available at this moment !
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>

            {showModel && (
                <ColumnDetailsModel
                    editingDetails={editingDetails}
                    columnEditor={columnEditor}
                    closeModal={() => {
                        setShowModel(false);
                        setEditingDetails({});
                    }}
                />
            )}

            <ConfirmationPopup
                header="Delete sequence !"
                isOpen={showConfirmation}
                desc="Are you sure you want to delete the selected position?"
                handleConfirm={handleBulkDelete}
                closePopup={() => setShowConfirmation(false)}
            />
        </div>
    );
};

export default ColumnEditor;
