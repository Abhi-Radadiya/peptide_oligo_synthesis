import React, { useEffect, useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { Button } from "../../../../../../Components/Buttons/Buttons";
import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { SimpleCheckBox } from "../../../../../../Components/FormController/CheckBox";
import { useFormContext } from "react-hook-form";

export default function ColumnSelectionModel(props) {
    const { onClose } = props;

    const { setValue, watch } = useFormContext();

    // TODO : have add all details while creating new column, and assign proper id to predefined column
    const columnEditor = useSelector((state) => state.columnEditor.positions);

    const [selectedColumn, setSelectedColumn] = useState(null);

    const handleNext = () => {
        const newValve = { columnDetails: columnEditor.find((el) => el.id === selectedColumn), columnStatus: "close" };

        setValue(`manualModeRunFlow.column`, newValve);
        setValue("manualModeRunFlow.pump1.flowRate", newValve.columnDetails.maxFlowRate);
        setValue("manualModeRunFlow.pump2.flowRate", newValve.columnDetails.maxFlowRate);

        onClose();
    };

    useEffect(() => {
        setSelectedColumn(watch("manualModeRunFlow.column.columnDetails.id") ?? null);
    }, []);

    return (
        <ModelWrapper header="Select Column" width="w-fit" onClose={onClose}>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-h-[75vh] h-fit overflow-y-auto scrollbar-style">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diameter</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Pressure</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Flow Rate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liquid Volume</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loading Volume</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {columnEditor.map((el, index) => (
                            <tr key={index} className={`hover:bg-gray-50 transition-colors ${selectedColumn === el.id ? "bg-blue-50" : ""}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <SimpleCheckBox checked={selectedColumn === el.id} onChange={() => setSelectedColumn(el.id)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.diameter}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.height}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.unit}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.maxPressure}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.maxFlowRate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.liquidVolume}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.loadingVolume}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-end">
                <Button rightIcon={<ChevronRight />} label="Save & Next" onClick={handleNext} bgClassName="bg-blue-500 text-white hover:bg-blue-600" disabled={!selectedColumn} />
            </div>
        </ModelWrapper>
    );
}
