import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../../Components/Popup/ConfirmationPopup";
import { ReactComponent as EditIcon } from "../../Assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../Assets/trash.svg";

export default function Methods({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const confirmDelete = () => {
        // Add delete logic here
        closeModal();
    };

    const testData = [
        { name: "Test1", id: "test1", details: {} },
        { name: "Test2", id: "test2", details: {} },
        { name: "Test3", id: "test3", details: {} },
        { name: "Test1", id: "test1", details: {} },
        { name: "Test2", id: "test2", details: {} },
        { name: "Test3", id: "test3", details: {} },
        { name: "Test1", id: "test1", details: {} },
        { name: "Test2", id: "test2", details: {} },
        { name: "Test3", id: "test3", details: {} },
        { name: "Test1", id: "test1", details: {} },
        { name: "Test2", id: "test2", details: {} },
        { name: "Test3", id: "test3", details: {} },
        { name: "Test1", id: "test1", details: {} },
        { name: "Test2", id: "test2", details: {} },
        { name: "Test3", id: "test3", details: {} },
        { name: "Test1", id: "test1", details: {} },
        { name: "Test2", id: "test2", details: {} },
        { name: "Test3", id: "test3", details: {} },
        { name: "Test1", id: "test1", details: {} },
        { name: "Test2", id: "test2", details: {} },
        { name: "Test3", id: "test3", details: {} },
    ];

    return (
        <>
            <div className="overflow-x-auto border border-neutral-300 rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Index</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {testData.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}.</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-row items-center">
                                        <Link to={`/method-setup/${item.id}`} state={item} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                            <EditIcon stroke="#433db8" />
                                        </Link>
                                        <button onClick={() => openModal(item)} className="text-red-600 hover:text-red-900">
                                            <DeleteIcon stroke="#ff0000" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmationPopup
                isOpen={isModalOpen}
                closePopup={closeModal}
                handleConfirm={confirmDelete}
                desc={`Are you sure you want to delete ${selectedItem?.name} method`}
                header="Delete Method !"
            />
        </>
    );
}
