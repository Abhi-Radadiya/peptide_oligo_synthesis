import React, { useEffect, useState } from "react";
import AddConfigurationPopup from "../../Components/AddConfigurationPopup";
import { deleteBottleMappingDetails, getBottleMappingDetails, saveBottleMappingDetails, updateBottleMappingDetails } from "../../../../../function/electronFunctionDeclaration";
import _ from "lodash";

const SolventConfiguration = () => {
    const [data, setData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editAmediteDetails, setEditAmediteDetails] = useState({});

    const updateDetails = async (data) => {
        try {
            const response = await updateBottleMappingDetails(data, "solvent");
            if (response.success) {
                loadAmediteList();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log(`error : `, error);
        }
    };

    const addNewDetails = async (data) => {
        try {
            const response = await saveBottleMappingDetails(data, "solvent");

            if (response.success) {
                setIsModalOpen(false);
                loadAmediteList();
            }
        } catch (error) {
            console.log(`error : `, error);
        }
    };

    const handleForm = async (data) => {
        _.isEmpty(editAmediteDetails) ? addNewDetails(data) : updateDetails(data);
    };

    const loadAmediteList = async () => {
        try {
            const response = await getBottleMappingDetails("solvent");
            setData(response.data);
        } catch (error) {
            console.log(`error : `, error);
        }
    };

    useEffect(() => {
        loadAmediteList();
    }, []);

    const handleEdit = (item) => {
        setEditAmediteDetails(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteBottleMappingDetails(id, "solvent");
            loadAmediteList();
        } catch (error) {
            console.log(`error : `, error);
        }
    };

    return (
        <div className="overflow-x-auto p-4 border border-neutral-300 rounded-xl bg-neutral-50">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-xl font-medium">Solvent</h1>

                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleEdit(null)}>
                    Add Solvent
                </button>
            </div>

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Full Name</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">WM</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Case No.</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">MSDS</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold">Concentration</th>
                        <th className="py-3 px-6 text-center text-gray-600 font-semibold">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                            <td className="py-3 px-6">{item.full_name}</td>
                            <td className="py-3 px-6">{item.wm}</td>
                            <td className="py-3 px-6">{item.case_no}</td>
                            <td className="py-3 px-6">{item.msds}</td>
                            <td className="py-3 px-6">{item.concentration}</td>
                            <td className="py-3 px-6 text-center">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700" onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <AddConfigurationPopup
                    editingData={editAmediteDetails}
                    onSubmit={handleForm}
                    togglePopup={() => {
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default SolventConfiguration;
