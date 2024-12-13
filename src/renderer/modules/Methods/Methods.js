import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../../Components/Popup/ConfirmationPopup";
import { ReactComponent as EditIcon } from "../../Assets/edit.svg";
import { Button } from "../../Components/Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { deleteMethodSetup } from "../../../redux/reducers/methodSetup/methodSetup";

export default function Methods() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const methods = useSelector((state) => state.methodSetup.method);

    const filteredData = useMemo(() => methods.filter((item) => item?.method_name?.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm, methods]);

    const handleSelectRow = (e, id) => {
        if (e.target.checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        }
    };

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleDeleteSelectedMethod = () => {
        dispatch(deleteMethodSetup(selectedRows));
        setSelectedRows([]);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="px-4 relative">
                <div className="justify-between flex items-center border-b border-neutral-300 py-4 -mx-4 px-4 sticky top-0 bg-white">
                    <div className="flex flex-row items-center">
                        <input
                            type="text"
                            placeholder="Search method"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-neutral-300 rounded-md px-3 py-2 mr-6"
                        />
                        <Button
                            disabled={!selectedRows.length}
                            label="Delete Selected"
                            onClick={() => setIsModalOpen(true)}
                            bgClassName="mr-2 bg-[#fa5757] text-white disabled:bg-red-200 disabled:text-neutral-500"
                        />

                        <Button
                            label={`${filteredData.length === selectedRows.length ? "Unselect All" : "Select All"}`}
                            onClick={() => setSelectedRows((prevState) => (!prevState?.length ? filteredData.map((el) => el.id) : []))}
                        />
                    </div>
                    <Button label="Create new method" onClick={() => navigate("/method-setting")} />
                </div>

                <div className="overflow-x-auto border border-neutral-300 my-4 rounded-lg shadow-lg overflow-auto scrollbar-style" style={{ height: "auto" }}>
                    <table className="min-w-full divide-y divide-gray-200 overflow-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Index</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Column</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Color</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredData?.length ? (
                                filteredData.map((item, index) => (
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
                                                {item.method_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.columnSize?.label}</td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`w-16 h-10 rounded-lg border border-neutral-300 bg-[${item.color}]`} style={{ background: item.color }} />
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-row items-center">
                                                <Link
                                                    to={`/method-setting/${item.id}`}
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
                                        No method at this moment !
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <ConfirmationPopup
                    isOpen={isModalOpen}
                    closePopup={() => setIsModalOpen(false)}
                    handleConfirm={handleDeleteSelectedMethod}
                    desc={`Are you sure you want to delete selected method`}
                    header="Delete Method !"
                />
            </div>
        </>
    );
}
