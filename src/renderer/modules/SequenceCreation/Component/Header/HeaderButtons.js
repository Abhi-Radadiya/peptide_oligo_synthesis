import React from "react";
import { Button } from "../../../../Components/Buttons/Buttons";

export default function HeaderButtons(props) {
    const { setIsShowImportModel, handleFileChange, fileInputRef, watch, handleSubmit, setShowGenerateBlockModel, handleAddSequence } = props;

    return (
        <>
            <div className="flex justify-between flex-row mb-4 pb-4 border-b border-neutral-800 sticky top-0 pt-4 bg-white z-10">
                <div className="flex flex-row item-center gap-4">
                    <Button label="Import sequence" onClick={() => setIsShowImportModel(true)} bgClassName="bg-indigo-200 hover:bg-indigo-300" />
                    <input type="file" accept=".txt" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                </div>

                {!watch("sequence")?.length && (
                    <div className="flex flex-row item-center gap-4">
                        <Button
                            label="Generate Blocks"
                            bgClassName="bg-amber-200 hover:bg-amber-300"
                            onClick={() => handleSubmit(() => setShowGenerateBlockModel(true))()}
                        />

                        <Button label="Save" disabled={!watch("block")?.length} onClick={() => handleSubmit(handleAddSequence)()} />
                    </div>
                )}
            </div>
        </>
    );
}
