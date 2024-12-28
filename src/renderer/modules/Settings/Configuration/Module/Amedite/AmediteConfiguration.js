import React, { useState } from "react";
import _ from "lodash";
import { addAmedite, updateAmedite, deleteAmedites } from "../../../../../../redux/reducers/settings/amedite";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../../Components/Buttons/Buttons";
import ConfirmationPopup from "../../../../../Components/Popup/ConfirmationPopup";
import { useWindowSize } from "@uidotdev/usehooks";
import AddConfigurationPopup from "../../Model/AddConfigurationPopup";
import { openToast } from "../../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { SUCCESS } from "../../../../../Helpers/Icons";

const AmediteConfiguration = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editAmediteDetails, setEditAmediteDetails] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { height: windowHeight } = useWindowSize();

    const dispatch = useDispatch();
    const data = useSelector((state) => state.amedite.amediteList);

    const updateDetails = async (data) => {
        dispatch(updateAmedite(data));
        setIsModalOpen(false);
        setEditAmediteDetails({});
        dispatch(openToast({ text: "Amedite updated successfully.", icon: SUCCESS }));
    };

    const addNewDetails = async (data) => {
        dispatch(addAmedite(data));
        setIsModalOpen(false);
        setEditAmediteDetails({});
        dispatch(openToast({ text: "Amedite created successfully.", icon: SUCCESS }));
    };

    const handleForm = async (data) => {
        _.isEmpty(editAmediteDetails) ? addNewDetails(data) : updateDetails(data);
    };

    const handleEdit = (item) => {
        setEditAmediteDetails(item);
        setIsModalOpen(true);
    };

    const handleRowSelect = (id) => {
        setSelectedRows((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]));
    };

    const handleBulkDelete = () => {
        dispatch(deleteAmedites(selectedRows));
        setSelectedRows([]);
        setShowConfirmation(false);
        dispatch(openToast({ text: "Amedite deleted successfully.", icon: SUCCESS }));
    };

    return (
        <div className="overflow-x-auto p-4 border border-neutral-300 rounded-xl bg-neutral-50">
            <div className="justify-between flex mb-4 items-center border-b border-neutral-300 pb-4">
                <div className="flex flex-row items-center">
                    <Button
                        label={`${selectedRows.length === data.length ? "Unselect All" : "Select All"}`}
                        onClick={() => setSelectedRows((prevState) => (!prevState?.length ? data.map((el) => el.id) : []))}
                    />
                    <Button
                        disabled={!selectedRows.length}
                        label="Delete Selected"
                        onClick={() => setShowConfirmation(true)}
                        bgClassName="ml-2 bg-[#fa5757] text-white disabled:bg-red-200 disabled:text-neutral-500"
                    />
                </div>
                <Button label="Add Amedite" onClick={() => setIsModalOpen(true)} />
            </div>

            <div className="overflow-auto scrollbar-style" style={{ height: windowHeight - 270 }}>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Index</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Full Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">MW</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Case No.</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">MSDS</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Concentration</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Flow rate</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>

                    {data.length ? (
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={item.id} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                    <td className="py-3 px-6">{index + 1}.</td>

                                    <td className="py-3 px-6">
                                        <div className="flex flex-row items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => handleRowSelect(item.id)}
                                            />
                                            {item.full_name}
                                        </div>
                                    </td>

                                    <td className="py-3 px-6">{item.mw}</td>
                                    <td className="py-3 px-6">{item.case_no}</td>
                                    <td className="py-3 px-6">{item.msds}</td>
                                    <td className="py-3 px-6">{item.concentration}</td>
                                    <td className="py-3 px-6">{item.flowRate}</td>
                                    <td className="py-3 px-6 text-center">
                                        <Button bgClassName="bg-amber-200 hover:bg-amber-300" label="Edit" onClick={() => handleEdit(item)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                <td colSpan={10} className="py-10 text-neutral-500 font-bold px-6 text-center">
                                    No amedite reagent at this moment !
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

            {isModalOpen && (
                <AddConfigurationPopup
                    editingData={editAmediteDetails}
                    onSubmit={handleForm}
                    data={data}
                    togglePopup={() => {
                        setIsModalOpen(false);
                        setEditAmediteDetails({});
                    }}
                />
            )}

            {showConfirmation && (
                <ConfirmationPopup
                    header="Delete sequence !"
                    isOpen={showConfirmation}
                    desc="Are you sure you want to delete the selected amedite?"
                    handleConfirm={handleBulkDelete}
                    closePopup={() => setShowConfirmation(false)}
                />
            )}
        </div>
    );
};

export default AmediteConfiguration;
