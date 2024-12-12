import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../Components/Input/Input";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";
import { Button } from "../../../../Components/Buttons/Buttons";
import { ControlledSwitch } from "../../../../Components/FormController/Switch";
import { useSelector } from "react-redux";

const FlowRateModal = ({ onClose, onSave, initialData = {} }) => {
    const { control, handleSubmit } = useForm({ defaultValues: initialData });

    const onSubmit = (data) => {
        onSave({ ...data, chemical: data.chemical.value });
        onClose();
    };

    const flowRates = useSelector((state) => state.flowRate.items);

    const chemicals = useSelector((state) => state.amedite.amediteList)?.map((el) => ({
        label: el.full_name,
        value: el.id,
    }));

    const flowRateChemicals = new Set(flowRates.map((flowRate) => flowRate.chemical));
    const filteredChemicals = chemicals.filter((chemical) => !flowRateChemicals.has(chemical.value));

    return (
        <ModelWrapper header="Flow rate" onClose={onClose}>
            <div className="space-y-4">
                <SelectionController
                    placeholder="Select chemical"
                    isClearable={false}
                    control={control}
                    name="chemical"
                    menuItem={filteredChemicals}
                    label="Select Chemical"
                    className="max-w-[200px]"
                />

                <InputField width="w-[200px]" control={control} name="flowRate" type="number" placeholder="Enter Flow Rate" />

                <ControlledSwitch control={control} name="enable" label="Enable" />

                <div className="flex justify-end space-x-3 mt-16">
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

export default FlowRateModal;
