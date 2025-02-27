// import React, { useEffect, useState } from "react";
// import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
// import { Button } from "../../../../../../Components/Buttons/Buttons";
// import { ChevronRight } from "lucide-react";
// import { useSelector } from "react-redux";
// import { SimpleCheckBox } from "../../../../../../Components/FormController/CheckBox";
// import { useFormContext } from "react-hook-form";

// export default function ColumnSelectionModel(props) {
//     const { onClose } = props;

//     const { setValue, watch } = useFormContext();

//     // TODO : have add all details while creating new column, and assign proper id to predefined column
//     const columnEditor = useSelector((state) => state.columnEditor.positions);

//     const [selectedColumn, setSelectedColumn] = useState(null);

//     const handleNext = () => {
//         const newValve = { columnDetails: columnEditor.find((el) => el.id === selectedColumn), columnStatus: "close" };

//         setValue(`manualModeRunFlow.column`, newValve);
//         setValue("manualModeRunFlow.pump1.flowRate", newValve.columnDetails.maxFlowRate);
//         setValue("manualModeRunFlow.pump2.flowRate", newValve.columnDetails.maxFlowRate);

//         onClose();
//     };

//     useEffect(() => {
//         setSelectedColumn(watch("manualModeRunFlow.column.columnDetails.id") ?? null);
//     }, []);

//     return (
//         <ModelWrapper header="Select Column" width="w-fit" onClose={onClose}>
//             <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-h-[75vh] h-fit overflow-y-auto scrollbar-style">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diameter</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Pressure</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Flow Rate</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liquid Volume</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loading Volume</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {columnEditor.map((el, index) => (
//                             <tr key={index} className={`hover:bg-gray-50 transition-colors ${selectedColumn === el.id ? "bg-blue-50" : ""}`}>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <SimpleCheckBox checked={selectedColumn === el.id} onChange={() => setSelectedColumn(el.id)} />
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.diameter}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.height}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.unit}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.maxPressure}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.maxFlowRate}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.liquidVolume}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{el.loadingVolume}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="mt-6 flex justify-end">
//                 <Button rightIcon={<ChevronRight />} label="Save & Next" onClick={handleNext} bgClassName="bg-blue-500 text-white hover:bg-blue-600" disabled={!selectedColumn} />
//             </div>
//         </ModelWrapper>
//     );
// }

import React, { useEffect, useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { Button } from "../../../../../../Components/Buttons/Buttons";
import { SimpleCheckBox } from "../../../../../../Components/FormController/CheckBox";

export default function ColumnSelectionModel({ onClose }) {
    const { setValue, watch } = useFormContext();

    // Sample data for demonstration - in real app this would come from Redux
    const columnEditor = useSelector((state) => state.columnEditor.positions) || [
        { id: "col1", name: "Oligo Column A", diameter: 10, height: 100, unit: "mm", maxPressure: 700, maxFlowRate: 2.5, liquidVolume: 15, loadingVolume: 12 },
        { id: "col2", name: "Peptide Column B", diameter: 8, height: 120, unit: "mm", maxPressure: 600, maxFlowRate: 2.0, liquidVolume: 12, loadingVolume: 10 },
        { id: "col3", name: "Analytical Column", diameter: 4.6, height: 150, unit: "mm", maxPressure: 1000, maxFlowRate: 1.5, liquidVolume: 8, loadingVolume: 5 },
    ];

    const [selectedColumn, setSelectedColumn] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);

    const handleNext = () => {
        const newValve = {
            columnDetails: columnEditor.find((el) => el.id === selectedColumn),
            columnStatus: "close",
        };

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
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md max-h-[75vh] h-fit overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider"></th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Diameter
                                <span className="text-slate-400 ml-1">(mm)</span>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Height
                                <span className="text-slate-400 ml-1">(mm)</span>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Unit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Max Pressure
                                <span className="text-slate-400 ml-1">(psi)</span>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Max Flow Rate
                                <span className="text-slate-400 ml-1">(ml/min)</span>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Liquid Vol
                                <span className="text-slate-400 ml-1">(ml)</span>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Loading Vol
                                <span className="text-slate-400 ml-1">(ml)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {columnEditor.map((el, index) => (
                            <tr
                                key={index}
                                onMouseEnter={() => setHoveredRow(el.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                                className={`transition-colors cursor-pointer ${
                                    selectedColumn === el.id
                                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-purple-400"
                                        : hoveredRow === el.id
                                        ? "bg-slate-50"
                                        : ""
                                }`}
                                onClick={() => setSelectedColumn(el.id)}
                            >
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <SimpleCheckBox checked={selectedColumn === el.id} onChange={() => setSelectedColumn(el.id)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${index % 3 === 0 ? "bg-purple-500" : index % 3 === 1 ? "bg-blue-500" : "bg-teal-500"}`}></div>
                                        <span className="text-sm font-medium text-slate-800">{el.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{el.diameter}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{el.height}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{el.unit}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{el.maxPressure}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{el.maxFlowRate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{el.liquidVolume}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{el.loadingVolume}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-slate-500">
                    {selectedColumn ? (
                        <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Selected: <span className="font-medium text-slate-700">{columnEditor.find((c) => c.id === selectedColumn)?.name}</span>
                        </span>
                    ) : (
                        "Please select a column to continue"
                    )}
                </div>
                <Button
                    rightIcon={<ChevronRight size={18} />}
                    label="Save & Next"
                    onClick={handleNext}
                    bgClassName="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    disabled={!selectedColumn}
                />
            </div>
        </ModelWrapper>
    );
}
