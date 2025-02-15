import { EditIcon } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, ConfirmationButton } from "../../Components/Buttons/Buttons";
import { deleteCommand } from "../../../redux/reducers/commands/commands";

export default function SequenceCommand() {
    const commands = useSelector((state) => state.commands.commands);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectRow = (event, id) => {
        setSelectedRows(event.target.checked ? [...selectedRows, id] : selectedRows.filter((item) => item !== id));
    };

    const handleSelectAll = (event) => {
        setSelectedRows(event.target.checked ? commands.map((item) => item.id) : []);
    };

    const handleDelete = () => {
        dispatch(deleteCommand(selectedRows));
        setSelectedRows([]);
    };

    return (
        <>
            <div className="flex flex-row items-center p-2 justify-between mb-4 border-b border-neutral-300 pb-4">
                <span className="text-2xl font-semibold text-neutral-800">Sequence Command</span>

                <div className="flex flex-row gap-4">
                    <ConfirmationButton actionFn={handleDelete} disabled={!selectedRows.length} />
                    <Button label="Create New" bgClassName="bg-green-300" onClick={() => navigate("/command-editor")} />
                </div>
            </div>

            <div className="overflow-x-auto border border-neutral-300 my-4 rounded-lg shadow-lg overflow-auto scrollbar-style" style={{ height: "auto" }}>
                <table className="min-w-full divide-y divide-gray-200 overflow-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Index</th>

                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <div className="flex flex-row gap-4 items-center">
                                    {!!selectedRows.length && (
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 focus:ring-1 ring-neutral-500 ring-offset-1 rounded-lg"
                                            onChange={(e) => handleSelectAll(e)}
                                            checked={!!selectedRows.length && selectedRows.length === commands.length}
                                        />
                                    )}

                                    <span>Name</span>
                                </div>
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {commands?.length ? (
                            commands.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}.</td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-row items-center gap-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 focus:ring-1 ring-neutral-500 ring-offset-1"
                                                onChange={(e) => handleSelectRow(e, item.id)}
                                                checked={selectedRows.includes(item.id)}
                                            />
                                            {item.fileName}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-row items-center">
                                            <Link
                                                to={`/command-editor/${item.id}`}
                                                state={item}
                                                className="text-indigo-600 hover:text-indigo-900 mr-2 focus:ring-1 ring-neutral-500 ring-offset-1"
                                            >
                                                <EditIcon stroke="#433db8" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="py-8 text-center font-medium text-lg text-neutral-700" colSpan={3}>
                                    No sequence command at this moment !
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
