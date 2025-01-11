import React, { useState } from "react";
import { Button } from "../../Components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as EditIcon } from "../../Assets/edit.svg";
import { ReactComponent as ViewIcon } from "../../Assets/pos.svg";
import ConfirmationPopup from "../../Components/Popup/ConfirmationPopup";
import { deleteSequence } from "../../../redux/reducers/sequenceReducer";
import SequenceStringPopup from "./Model/SequenceStringPopup";
import { openToast } from "../../../redux/reducers/toastStateReducer/toastStateReducer";
import { SUCCESS } from "../../Helpers/Icons";

export default function AvailableSequence() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedIds, setSelectedIds] = useState([]);

    const onConfirmDelete = () => {
        selectedIds.forEach((id) => {
            dispatch(deleteSequence(id));
        });
        setShowDeleteSeqPopup(false);
        setSelectedIds([]);
        dispatch(openToast({ text: "Sequence deleted successfully.", icon: SUCCESS }));
    };

    const [showDeleteSeqPopup, setShowDeleteSeqPopup] = useState(false);

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) => (prevSelectedIds.includes(id) ? prevSelectedIds.filter((selectedId) => selectedId !== id) : [...prevSelectedIds, id]));
    };

    const sequence = useSelector((state) => state.sequence.sequence);

    const [selectedSequence, setSelectedSequence] = useState(null);

    return (
        <>
            <div className="px-4 relative">
                <div className="justify-between flex mb-4 items-center border-b border-neutral-300 py-4 sticky top-0 -mx-4 px-4 bg-neutral-50 z-10">
                    <div className="flex flex-row items-center">
                        <Button
                            label={`${sequence.length === selectedIds.length ? "Unselect All" : "Select All"}`}
                            onClick={() => setSelectedIds((prevState) => (!prevState?.length ? sequence.map((el) => el.id) : []))}
                        />
                        <Button
                            disabled={!selectedIds.length}
                            label="Delete Selected"
                            onClick={() => setShowDeleteSeqPopup(true)}
                            bgClassName="ml-2 bg-[#fa5757] text-white disabled:bg-red-200 disabled:text-neutral-500"
                        />
                    </div>
                    <Button label="Create New Sequence" onClick={() => navigate("/sequence-editor")} />
                </div>

                <table className="w-full border-collapse mb-6">
                    <thead>
                        <tr>
                            <th className="border p-2 text-left">No.</th>
                            <th className="border p-2 text-left">No. Block</th>
                            <th className="border p-2 text-left">File Name</th>
                            <th className="border p-2 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sequence?.map((el, index) => (
                            <tr key={index}>
                                <td className="border p-2 text-left">{index + 1}</td>
                                <td className="border p-2 text-left">
                                    <div className="flex flex-row items-center gap-4">
                                        <input className="h-4 w-4" type="checkbox" checked={selectedIds.includes(el.id)} onChange={() => handleCheckboxChange(el.id)} />

                                        {el?.block?.length ?? 0}
                                    </div>
                                </td>
                                <td className="border p-2 text-left">{el.name}</td>
                                <td className="border p-2 text-left">
                                    <div className="flex flex-row gap-4">
                                        <div
                                            className="w-fit cursor-pointer hover:border-b hover:-mb-1 border-[#433db8]"
                                            onClick={() => navigate(`/sequence-editor/${el.id}`)}
                                        >
                                            <EditIcon stroke="#433db8" />
                                        </div>
                                        <div
                                            className="w-fit cursor-pointer hover:border-b hover:-mb-1 border-[#433db8]"
                                            onClick={() => setSelectedSequence(el.sequenceString)}
                                        >
                                            <ViewIcon stroke="#433db8" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmationPopup
                isOpen={showDeleteSeqPopup}
                closePopup={() => setShowDeleteSeqPopup(false)}
                handleConfirm={onConfirmDelete}
                desc="Are you sure want to delete selected sequence?"
                header="Delete sequence !"
            />

            {!!selectedSequence && <SequenceStringPopup selectedSequence={selectedSequence} onClose={() => setSelectedSequence(null)} />}
        </>
    );
}
