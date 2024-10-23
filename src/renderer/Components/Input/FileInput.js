import React, { useState } from "react";

const FileUploader = (props) => {
    const { setSelectedFile } = props;

    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/plain") {
            setSelectedFile(file);
            setErrorMessage("");
        } else {
            setErrorMessage("Only .txt files are allowed!");
            setSelectedFile(null);
        }
    };

    return (
        <div className="flex flex-row relative justify-between w-fit cursor-pointer">
            <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-500 text-white font-bold px-2 py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
                Select a File
                <input id="file-upload" type="file" accept=".txt" onChange={handleFileChange} className=" h-6 absolute top-0 left-0 w-full opacity-0 cursor-pointer" />
            </label>

            {errorMessage && (
                <div className="mt-4 text-sm text-red-500">
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export { FileUploader };
