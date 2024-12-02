import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../../Components/Popup/ConfirmationPopup";
import { ReactComponent as EditIcon } from "../../Assets/edit.svg";
import { useWindowSize } from "@uidotdev/usehooks";
import { Button } from "../../Components/Buttons/Buttons";

export const testMethodData = [
    { name: "Test1", id: "test1", details: {} },
    { name: "Test2", id: "test2", details: {} },
    { name: "Test3", id: "test3", details: {} },
    { name: "Test4", id: "test4", details: {} },
    { name: "Test", id: "test5", details: {} },
    { name: "Test5", id: "test6", details: {} },
    { name: "Test6", id: "test7", details: {} },
    { name: "Test7", id: "test8", details: {} },
    { name: "Test8", id: "test9", details: {} },
    { name: "Test9", id: "tes1t", details: {} },
    { name: "Test10", id: "tes2t", details: {} },
    { name: "Test11", id: "tes3t", details: {} },
    { name: "Test12", id: "tes4t", details: {} },
    { name: "Test13", id: "tes45t", details: {} },
    { name: "Test14", id: "tes5t5", details: {} },
    { name: "Test15", id: "tes6", details: {} },
];

export default function Methods() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const { height: windowHeight } = useWindowSize();

    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = useMemo(() => testMethodData.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allRowIds = filteredData.map((row) => row.id);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (e, id) => {
        if (e.target.checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        }
    };

    return (
        <>
            <div className="p-4">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-neutral-300">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-neutral-300 rounded-md px-3 py-2"
                    />
                    <div className="flex flex-row gap-6">
                        <Button label="Delete" onClick={() => setIsModalOpen(true)} disabled={!selectedRows.length} />
                        <Link to={`/method-setting`} className="border font-medium border-neutral-300 rounded-lg px-5 py-1.5 bg-neutral-200 hover:bg-neutral-300 hover:text-black">
                            Add Method
                        </Link>
                    </div>
                </div>

                <div
                    className="overflow-x-auto border border-neutral-300 rounded-lg shadow-lg overflow-auto scrollbar-style"
                    style={{ height: filteredData.length > 11 ? windowHeight - 140 : "auto" }}
                >
                    <table className="min-w-full divide-y divide-gray-200 overflow-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-3">
                                    <input type="checkbox" className="w-4 h-4" checked={selectedRows.length == filteredData.length} onChange={handleSelectAll} />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Index</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="w-4 h-4" onChange={(e) => handleSelectRow(e, item.id)} checked={selectedRows.includes(item.id)} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}.</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-row items-center">
                                            <Link to={`/method-setting/${item.id}`} state={item} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                <EditIcon stroke="#433db8" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ConfirmationPopup
                    isOpen={isModalOpen}
                    closePopup={() => setIsModalOpen(false)}
                    handleConfirm={() => setIsModalOpen(false)}
                    desc={`Are you sure you want to delete selected method`}
                    header="Delete Method !"
                />
            </div>
        </>
    );
}
