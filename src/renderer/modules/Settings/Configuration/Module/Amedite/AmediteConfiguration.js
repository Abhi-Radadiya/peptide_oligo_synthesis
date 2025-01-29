// TODO handle error if same name appears

import React, { useEffect, useState } from "react";
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

    const amediteList = [
        {
            full_name: "U",
            mw: "434",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "040c4515-cb16-4a04-b497-aa51b27a8c46",
        },
        {
            full_name: "TL",
            mw: "475",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "2c994ab5-941b-46b5-b9c4-fe5d9c9b672e",
        },
        {
            full_name: "CL",
            mw: "457",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "bff37c40-a3ac-4c5b-b796-5461ccee0eb9",
        },
        {
            full_name: "GL",
            mw: "444",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "94150dac-88ee-4d82-8835-d21dd8806bd1",
        },
        {
            full_name: "AL",
            mw: "333",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "db8b2873-c437-46e1-823e-5e87eb0bed29",
        },
        {
            full_name: "eU",
            mw: "365",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "d68bd09a-e12b-461d-a33d-111a1e4d1588",
        },
        {
            full_name: "eC",
            mw: "355",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "743550d0-1dfb-4c78-ada7-41af56479848",
        },
        {
            full_name: "eG",
            mw: "345",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "c3d6938e-9eaf-4ba3-9f8c-7a3c6bcf99c9",
        },
        {
            full_name: "eA",
            mw: "234",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "d8d20415-2652-40d0-b27f-450fd326b79f",
        },
        {
            full_name: "dT",
            mw: "455",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "2722707e-db03-45f9-bb13-9c630b2dcf65",
        },
        {
            full_name: "dC",
            mw: "345",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "f5142c54-707b-41e1-898d-a8c5c90454f0",
        },
        {
            full_name: "dG",
            mw: "345",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "b3283ce6-3c8e-4457-ba3a-bd184605c4a6",
        },
        {
            full_name: "dA",
            mw: "333",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "d9d6a8a6-4f8d-41ac-b69b-1921530fcf50",
        },
        {
            full_name: "rU",
            mw: "306",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "bad958e2-80c4-467a-8890-b0d76937b0e6",
        },
        {
            full_name: "rG",
            mw: "345",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "ac2c127f-f104-4e1a-a0ed-e54aabbb42c0",
        },
        {
            full_name: "rC",
            mw: "305",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "6e26fa4a-d976-4c70-839e-1091660e194c",
        },
        {
            full_name: "rA",
            mw: "329",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "995e0f84-0dd7-4a6e-932c-2b8afde27971",
        },
        {
            full_name: "mU",
            mw: "345",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "30d5556a-a12d-47b3-88c2-2fb2fd3087fe",
        },
        {
            full_name: "mG",
            mw: "325",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "f3a780a2-9afb-4552-8250-5195db83265b",
        },
        {
            full_name: "mC",
            mw: "333",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "9203b683-06c3-4ed2-a9c2-bca8ae2cfb27",
        },
        {
            full_name: "mA",
            mw: "329",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "361a0de8-8f27-4dc2-88db-6f0f20c3e015",
        },
        {
            full_name: "T",
            mw: "304.19",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "4c9ab95f-b512-42cd-bc43-0bec87d08e29",
        },
        {
            full_name: "G",
            mw: "329.2",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "41b0c8b6-e56b-41f2-ae80-651fb7fa48e5",
        },
        {
            full_name: "C",
            mw: "289.18",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "8f1d8018-adec-4aad-9d2d-344e76bb6ad8",
        },
        {
            full_name: "A",
            mw: "313.2",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "04ef1c13-1ad9-45f5-b346-fc8656284bb8",
        },
        {
            full_name: "fU",
            mw: "308.16",
            case_no: "1",
            msds: "1",
            concentration: "1",
            flowRate: "1",
            id: "5e7a6c5f-198d-4d13-9e88-ee529da27a64",
        },
        {
            full_name: "fA",
            wm: "1",
            case_no: "1",
            msds: "1",
            concentration: "0.12",
            id: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
            mw: "331.2",
            flowRate: "1",
        },
        {
            full_name: "fC",
            wm: "12",
            case_no: "2",
            msds: "2",
            concentration: "2",
            id: "d60815e6-793b-4154-a46c-3cf8c68e9271",
            mw: "307.17",
            flowRate: "3",
        },
        {
            full_name: "fG",
            wm: "12",
            case_no: "3",
            msds: "3",
            concentration: "3",
            id: "9f44ee15-f48f-4731-8bcb-6eb7565833ed",
            mw: "347.2",
            flowRate: "3",
        },
    ];

    useEffect(() => {
        // amediteList.forEach((el) => dispatch(addAmedite(el)));
    }, []);

    const addNewDetails = async (data) => {
        amediteList.forEach((el) => dispatch(addAmedite(el)));

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
