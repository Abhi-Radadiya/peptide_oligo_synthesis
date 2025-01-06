import React, { useState } from "react";
import FileUploader from "./Tabs/FileUploader";
import SequenceImporter from "./Tabs/SequenceImporter";
import { Tabs } from "../../../../Components/Tabs/Tab";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";
import { Button } from "../../../../Components/Buttons/Buttons";
import ConfirmationPopup from "../../../../Components/Popup/ConfirmationPopup";
import { useFormContext } from "react-hook-form";
import RadioButton from "../../../../Components/FormController/RadioButton";

export default function ImportSequenceModel(props) {
    const { onClose } = props;

    const [confirmClose, setConfirmClose] = useState(false);

    const tabs = [
        { label: "File upload", value: "fileUpload", component: FileUploader },
        { label: "Predefined sequence", value: "importPredefined", component: SequenceImporter },
    ];

    const { setValue, watch, resetField, control } = useFormContext();

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    const importSequence = () => {
        resetField("sequenceTemp");
        setValue("sequence", watch("sequenceTemp"));
        onClose();
    };

    const radioButtons = [
        { label: "1 per block", value: "1" },
        { label: "3 per block", value: "3" },
    ];

    return (
        <>
            <ModelWrapper width="w-[80%] relative" header="Import sequence" onClose={() => setConfirmClose(true)}>
                <div className="sticky top-0 mt-4 pb-4 border-b border-neutral-300">
                    <div className="flex flex-row justify-between items-center">
                        <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} className="" />

                        <RadioButton className="mt-2" buttons={radioButtons} control={control} name="blockOption" />
                    </div>
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
