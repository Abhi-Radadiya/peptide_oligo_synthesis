import React from "react";
import { Button } from "../../Components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSequence } from "../../../redux/actions";

export default function AvailableSequence() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteSequence(id));
    };

    const sequence = useSelector((state) => state.sequence);

    return (
        <>
            <div className="p-4">
                <div className="justify-end flex mb-4">
                    <Button label="Create New Sequence" onClick={() => navigate("/sequence-creation/new")} />
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2 text-left">No.</th>
                            <th className="border p-2 text-left">No. Block</th>
                            <th className="border p-2 text-left">File Name</th>
                            <th className="border p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sequence.map((el, index) => (
                            <tr key={index}>
                                <td className="border p-2 text-left">{index + 1}</td>
                                <td className="border p-2 text-left">{el.block.length}</td>
                                <td className="border p-2 text-left">{el.name}</td>
                                <td className="border p-2 text-left">
                                    <button onClick={() => navigate(`/sequence-creation/${el.id}`)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(el.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
