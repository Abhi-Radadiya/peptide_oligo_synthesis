import React, { useState } from "react";
import TextEditor from "./Model/TextEditor";
import { Button } from "../../Components/Buttons/Buttons";
import { FormProvider, useForm } from "react-hook-form";

const FileTable = () => {
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const [currentFile, setCurrentFile] = useState(null);

    const method = useForm();

    const handleCreate = () => {
        setCurrentFile(null);
        setShowModal(true);
    };

    const handleEdit = (file) => {
        setCurrentFile(file);
        setShowModal(true);
    };

    const handleDelete = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleSave = (text, fileName) => {
        if (currentFile) {
            const newFiles = files.map((file, index) => (index === currentFile.index ? { ...file, content: text, name: fileName } : file));
            setFiles(newFiles);
        } else {
            setFiles([...files, { content: text, name: fileName }]);
        }
    };

    const initialSequence =
        "ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT";

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentFile(null);
    };

    return (
        <FormProvider {...method}>
            <div className="p-4">
                <div className="justify-end flex mb-4">
                    <Button label="Create New Sequence" onClick={handleCreate} />
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2 text-left">No.</th>
                            <th className="border p-2 text-left">File Name</th>
                            <th className="border p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index}>
                                <td className="border p-2 text-left">{index + 1}</td>
                                <td className="border p-2 text-left">{file.name}</td>
                                <td className="border p-2 text-left">
                                    <button onClick={() => handleEdit({ ...file, index })} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && <TextEditor initialText={currentFile ? currentFile.content : ""} currentFile={currentFile} onSave={handleSave} onClose={handleCloseModal} />}
            </div>
        </FormProvider>
    );
};

export default FileTable;
