import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "../../../../Components/Buttons/Buttons";
import { Plus, Trash2 } from "lucide-react";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";

// Mock process types for the dropdown
const PROCESS_TYPES = [
    { label: "Valve Operation", value: "valveOperation" },
    { label: "Pump Operation", value: "pumpOperation" },
    { label: "Detect Liquid Sensor", value: "detectLiquidSensor" }
];

export default function ProcedureForm() {
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            processes: [] // Initialize with empty array of processes
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "processes"
    });

    const onSubmit = (data) => {
        console.log(data); // Handle form submission
    };

    const addNewProcess = () => {
        append({ processType: null }); // Add a new process with null type
    };

    const handleProcessTypeChange = (index, value) => {
        // You can update the value directly in the form state if needed
        // Or rely on react-hook-form to handle it during submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => {
                console.log(`field : `, field);

                return (
                    <div key={field.id} className="mb-4 p-4 border border-gray-400 rounded-lg">
                        {!field.processType ? (
                            <SelectionController
                                label="Process Type"
                                placeholder="Select Process Type"
                                control={control}
                                menuItem={PROCESS_TYPES}
                                name={`processes.${index}.processType`}
                            />
                        ) : (
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-neutral-900"> {field.processType.label}</span>

                                <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}

            <Button type="button" label="Add Process" leftIcon={<Plus color="blue" />} bgClassName="bg-blue-400" onClick={addNewProcess} />

            {fields.length > 0 && <Button type="submit" label="Submit" className="mt-4" bgClassName="bg-green-500" />}
        </form>
    );
}
