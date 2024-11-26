import React, { useRef, useState } from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";
import { Button } from "../../../Components/Buttons/Buttons";
import { Selection } from "../../../Components/Dropdown/Dropdown";
import { amedites } from "../../MethodSetup2/Constant";

export default function TextEditor(props) {
    const { initialText, onSave, onClose, currentFile } = props;

    const fileInputRef = useRef(null);

    const [text, setText] = useState(initialText);

    const [fileName, setFileName] = useState(currentFile?.name);

    const [selectedAmedite, setSelectedAmedite] = useState(currentFile.amedite);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            !fileName && setFileName(file?.name?.split(".")[0]);

            const reader = new FileReader();

            reader.onload = (event) => {
                setText(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSave = () => {
        onSave(text, fileName, selectedAmedite);
        downloadTextFile(text);
    };

    const downloadTextFile = (text) => {
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sequence.txt";
        a.click();
        URL.revokeObjectURL(url);
        onClose();
    };

    const onSelectAmedite = (amedite) => {
        setSelectedAmedite(amedite);
    };

    return (
        <ModelWrapper header={initialText ? "Edit sequence" : "Create new sequence"} width="w-[100vh]" onClose={onClose}>
            <div className="flex justify-between my-4">
                <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} className="p-2 border border-gray-300 rounded" placeholder="File Name" />

                <Selection width={200} value={selectedAmedite} onChange={onSelectAmedite} height={41.6} placeholder="Select Amedite" menuItem={amedites} />
            </div>

            <textarea value={text} onChange={handleTextChange} rows="10" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter sequence here..." />

            <div className="flex gap-4 mt-4">
                <Button label="Save" onClick={handleSave} />

                <Button label="Select File" onClick={handleFileButtonClick} />

                <input type="file" accept=".txt" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
            </div>
        </ModelWrapper>
    );
}
