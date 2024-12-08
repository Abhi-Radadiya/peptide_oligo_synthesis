import React, { useState } from "react";
import FileUploader from "./Tabs/FileUploader";
import SequenceImporter from "./Tabs/SequenceImporter";
import { Tabs } from "../../../../Components/Tabs/Tab";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";
import { Button } from "../../../../Components/Buttons/Buttons";
import ConfirmationPopup from "../../../../Components/Popup/ConfirmationPopup";
import { useFormContext } from "react-hook-form";

export default function ImportSequenceModel(props) {
    const { onClose } = props;

    const [confirmClose, setConfirmClose] = useState(false);

    const tabs = [
        { label: "File upload", value: "fileUpload", component: FileUploader },
        { label: "Predefined sequence", value: "importPredefined", component: SequenceImporter },
    ];

    const { setValue, watch, resetField } = useFormContext();

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    const importSequence = () => {
        setValue("sequence", watch("sequenceTemp"));
        resetField("sequenceTemp");
        onClose();
    };

    return (
        <>
            <ModelWrapper width="w-[80%] relative" header="Import sequence" onClose={() => setConfirmClose(true)}>
                <div className="sticky top-0 mt-4">
                    <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="pb-4 border-b border-neutral-300" />
                </div>

                <div className="h-[65vh] overflow-auto scrollbar-style">
                    <ComponentToRender />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button label="Cancel" onClick={() => setConfirmClose(true)} />
                    <Button
                        onClick={() => {
                            importSequence();
                        }}
                        label="Import selected sequence"
                        bgClassName="bg-amber-200 hover:bg-amber-300"
                    />
                </div>
            </ModelWrapper>

            <ConfirmationPopup
                isOpen={confirmClose}
                closePopup={() => {
                    setConfirmClose(false);
                }}
                handleConfirm={() => {
                    onClose();
                    setConfirmClose(false);
                }}
                header="Close import sequence?"
            />
        </>
    );
}
