import React, { useEffect } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { useFormContext } from "react-hook-form";
import { SelectionController } from "../../../../../../Components/Dropdown/Dropdown";
import { Button } from "../../../../../../Components/Buttons/Buttons";

export default function WasteBlockSelectionModel(props) {
    const { onClose } = props;

    const { setValue, watch, control, handleSubmit } = useFormContext();

    useEffect(() => {
        setValue("wasteBlock.tempSelectedBlock", watch("wasteBlock.selectedBlock") ?? null);
    }, []);

    const wasteMenuItems = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: 5, value: 5 },
    ];

    const handleSave = () => {
        setValue("wasteBlock.selectedBlock", watch("wasteBlock.tempSelectedBlock"));
    };

    return (
        <ModelWrapper header="Select Waste Column" width="w-96" onClose={onClose}>
            <div className="space-y-4">
                <SelectionController
                    labelClassName="font-medium text-base"
                    label="Waste block"
                    name="wasteBlock.tempSelectedBlock"
                    placeholder="Select waste block"    
                    control={control}
                    rules={{ required: "Select waste column" }}
                    menuItem={wasteMenuItems}
                />

                <div className="mt-6 flex justify-end">
                    <Button label="Save" onClick={handleSubmit(handleSave)} bgClassName="bg-blue-300" />
                </div>
            </div>
        </ModelWrapper>
    );
}
