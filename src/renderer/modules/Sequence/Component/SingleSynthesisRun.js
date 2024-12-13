import React from "react";
import { SelectionController } from "../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import { wasteMenuItems } from "../../MethodSetup2/Constant";
import RadioButton from "../../../Components/FormController/RadioButton";
import { Button } from "../../../Components/Buttons/Buttons";
import { useSelector } from "react-redux";

export default function SingleSynthesisRun() {
    const { control } = useFormContext();

    const radio3 = [
        { label: "3'", value: "3" },
        { label: "5'", value: "5" },
    ];

    const resinOption = [
        { label: "Standard", value: "standard" },
        { label: "Universal", value: "universal" },
    ];

    const columnEditor = useSelector((state) => state.columnEditor.positions);

    const containerMenuItem = columnEditor.map((el) => ({ value: el.id, label: el.name }));

    const sequence = useSelector((state) => state.sequence.sequence);

    const sequenceMenuItem = sequence.map((el) => ({ value: el.id, label: el.name }));

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Synthesis Run</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="columnNo" className="block text-sm font-semibold text-gray-700 mb-2">
                        Column Position
                    </label>
                    <SelectionController
                        control={control}
                        height={44}
                        name="columnPosition"
                        placeholder="Select column position"
                        isClearable={false}
                        menuItem={wasteMenuItems}
                        rules={{ required: "Please select column position" }}
                    />
                </div>

                <div>
                    <label htmlFor="column" className="block text-sm font-semibold text-gray-700 mb-2">
                        Column
                    </label>
                    <SelectionController
                        control={control}
                        height={44}
                        name="column"
                        placeholder="Select column"
                        isClearable={false}
                        menuItem={containerMenuItem}
                        rules={{ required: "Please select column" }}
                    />
                </div>

                <div>
                    <label htmlFor="sequence" className="block text-sm font-semibold text-gray-700 mb-2">
                        Sequence
                    </label>
                    <SelectionController control={control} menuItem={sequenceMenuItem} height={44} name="sequence" placeholder="Select sequence" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <RadioButton buttons={radio3} control={control} name="option" header="Option" />
                </div>

                <div>
                    <RadioButton header="Resin" buttons={resinOption} control={control} name="resinOption" />
                </div>
            </div>

            <div className="text-center flex justify-end">
                <Button label="Run Synthesis" bgClassName="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg mt-4" />
            </div>
        </div>
    );
}
