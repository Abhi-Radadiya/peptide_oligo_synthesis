import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../Components/Input/Input";
import { FileUploader } from "../../../../Components/Input/FileInput";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";
import { ControlledSwitch } from "../../../../Components/FormController/Switch";
import { Button } from "../../../../Components/Buttons/Buttons";

const PressureModal = ({ onClose, onSave, initialData = {} }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: initialData,
    });

    const [file, setFile] = useState(initialData?.file || null);

    const onSubmit = (data) => {
        onSave({ ...data, file });
        onClose();
    };

    return (
        <ModelWrapper header="Pressure" onClose={onClose}>
            <div className="modal-content">
                <div className="my-4">
                    <InputField control={control} name="position" placeholder="Enter position" />
                </div>
                <div className="mb-4">
                    <InputField control={control} type="number" name="setValue" placeholder="Enter set value" />
                </div>
                <div className="mb-4">
                    <InputField control={control} type="number" name="tripValue" placeholder="Enter trip value" />
                </div>

                <div className="flex flex-row items-center gap-6 justify-between mb-4">
                    <ControlledSwitch control={control} name="enable" label="Enable" />
                    <FileUploader setSelectedFile={(file) => setFile(file)} />
                </div>
                <div className="flex justify-end space-x-3 mt-12">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 font-medium focus:ring-2 focus:ring-neutral-600 ring-offset-1"
                    >
                        Close
                    </button>
                    <Button label="Save" onClick={handleSubmit(onSubmit)} bgClassName="bg-green-200 hover:bg-green-300 border-green-300" />
                </div>
            </div>
        </ModelWrapper>
    );
};

export default PressureModal;
