import React, { useState } from "react";
import AmediteBottleModel from "./Models/AmediteBottleModel";
import ReagentModel from "./Models/ReagentModel";
import ColumnSelectionModel from "./Models/column-selection-model";
import WasteBlockSelectionModel from "./Models/waste-block-selection-model.js";
import PumpModel from "./Models/pump-model";
import { openToast } from "../../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { FILE_WARNING } from "../../../../../Helpers/Icons";
import ToggleSwitch from "../../../../../Components/FormController/Switch";
import { Beaker, Droplets, FlaskConical, Power, ToggleRight } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function RunningSchematicCard2() {
    const { watch } = useFormContext();

    const dispatch = useDispatch();

    const [showAmediteBottleModel, setShowAmediteBottleModel] = useState(null);

    const [showReagentModel, setShowReagentModel] = useState(false);

    const [showColumnSelectionModel, setShowColumnSelectionModel] = useState(false);

    const [showPumpModel, setShowPumpModel] = useState(false);

    const [showWasteBlockSelectionModel, setShowWasteBlockSelectionModel] = useState(false);

    const handleClickPump = (pumpNumber) => {
        const selectedColumnId = watch("manualModeRunFlow.column.columnDetails.id");

        if (!selectedColumnId) {
            dispatch(openToast({ text: `Please select column first to select pump flow rate`, icon: FILE_WARNING }));

            return;
        }

        setShowPumpModel(pumpNumber);
    };
    return (
        <>
            <div className="w-[1300px] border border-neutral-200 rounded-xl p-8 flex mx-auto flex-col bg-gradient-to-b from-gray-50 to-gray-100 shadow-md">
                {/* Amedite Container Row */}
                <div className="flex flex-row w-full mx-auto justify-between">
                    {[1, 2, 3].map((num, idx) => (
                        <div
                            key={`amedite-${num}`}
                            className={`relative border border-slate-200 rounded-lg shadow-lg h-36 w-36  ${
                                idx % 2 === 0 ? "mt-8" : ""
                            } flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl ${
                                num === 1
                                    ? "bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd]"
                                    : num === 2
                                    ? "bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe]"
                                    : "bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe]"
                            }`}
                            onClick={() => setShowAmediteBottleModel(`amedite${num}`)}
                        >
                            <Beaker className={`mb-2 ${num === 1 ? "text-[#0284c7]" : num === 2 ? "text-[#2563eb]" : "text-[#7c3aed]"}`} size={28} />
                            <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite {num}</span>
                            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                        </div>
                    ))}
                </div>

                {/* Reagent & Pump Row */}
                <div className="flex flex-row items-start mt-6 justify-between mx-auto w-full">
                    <div
                        className="relative border border-amber-200 rounded-lg h-32 w-36 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-amber-50 to-amber-100 cursor-pointer transform -skew-x-[12deg] hover:shadow-xl transition-all duration-300"
                        onClick={() => setShowReagentModel(1)}
                    >
                        <div className="skew-x-[12deg] flex flex-col items-center">
                            <FlaskConical className="mb-2 text-amber-600" size={28} />
                            <span className="flex items-center text-center text-base font-medium text-slate-700">Reagent 1</span>
                        </div>
                        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm skew-x-[12deg]"></div>
                    </div>

                    <div
                        className="relative rounded-full h-32 w-32 border-teal-400 cursor-pointer shadow-lg border-2  bg-gradient-to-r from-teal-50 to-teal-100 flex flex-col justify-center items-center mt-8 transition-all duration-300 hover:shadow-xl hover:bg-gradient-to-r hover:from-teal-100 hover:to-teal-200"
                        onClick={() => handleClickPump(1)}
                    >
                        <div className="absolute inset-3 rounded-full border-2 border-dashed border-teal-300 animate-spin-slow"></div>
                        <Power className="mb-1 text-teal-600" size={24} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Pump 1</span>
                    </div>

                    <div className="w-36 flex justify-center items-center">
                        {/* Flow indicator */}
                        <div className="h-24 w-4 bg-gradient-to-b from-transparent via-blue-300 to-transparent rounded-full opacity-30 animate-pulse"></div>
                    </div>
                </div>

                {/* Column */}
                <div
                    className="relative h-40 w-32 border-2 bg-gradient-to-b from-purple-50 to-purple-100 border-purple-200 shadow-lg rounded-lg  cursor-pointer mx-auto mt-8 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl"
                    onClick={() => setShowColumnSelectionModel(true)}
                >
                    <Droplets className="mb-2 text-purple-600" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Column</span>
                    <div className="absolute h-3/4 w-2/3 bottom-4 bg-gradient-to-b from-purple-200 to-purple-300 rounded opacity-30"></div>
                </div>

                {/* Pump 2 */}
                <div
                    className="relative rounded-full h-32 w-32 border-teal-400 cursor-pointer mx-auto mt-8 shadow-lg border-2 bg-gradient-to-r from-teal-50 to-teal-100 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl hover:bg-gradient-to-r hover:from-teal-100 hover:to-teal-200"
                    onClick={() => handleClickPump(2)}
                >
                    <div className="absolute inset-3 rounded-full border-2 border-dashed border-teal-300 animate-spin-slow"></div>
                    <Power className="mb-1 text-teal-600" size={24} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Pump 2</span>
                </div>

                {/* Reagent 2 & RG Valve Row */}
                <div className="flex flex-row items-center justify-between mt-8">
                    <div
                        className="relative border border-amber-200 rounded-lg h-32 w-36 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-amber-50 to-amber-100 cursor-pointer transform -skew-x-[12deg] hover:shadow-xl transition-all duration-300"
                        onClick={() => setShowReagentModel(2)}
                    >
                        <div className="skew-x-[12deg] flex flex-col items-center">
                            <FlaskConical className="mb-2 text-amber-600" size={28} />
                            <span className="flex items-center text-center text-base font-medium text-slate-700">Reagent 2</span>
                        </div>
                        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm skew-x-[12deg]"></div>
                    </div>

                    <div className="w-64 h-16 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <ToggleRight className="text-blue-600" size={22} />
                            <span className="text-center text-base font-medium text-slate-700">RG Valve</span>
                            <ToggleSwitch checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                        </div>
                    </div>

                    <div className="w-36" />
                </div>

                {/* Waste Column & Valve Row */}
                <div className="flex flex-row items-center justify-between gap-10 mt-8">
                    <div
                        className="relative border-2 border-cyan-300 rounded-full h-24 w-40 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-cyan-50 to-cyan-100 cursor-pointer hover:shadow-xl transition-all duration-300"
                        onClick={() => setShowWasteBlockSelectionModel(true)}
                    >
                        <div className="absolute inset-1 rounded-full border border-dashed border-cyan-200"></div>
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Waste Column</span>
                    </div>

                    <div className="w-64 h-16 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <ToggleRight className="text-blue-600" size={22} />
                            <span className="text-center text-base font-medium text-slate-700">Waste Valve</span>
                            <ToggleSwitch checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                        </div>
                    </div>

                    <div className="w-36" />
                </div>

                {/* Optional: Add connecting flow lines between components */}
                <style jsx>{`
                    @keyframes spin-slow {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                    .animate-spin-slow {
                        animation: spin-slow 8s linear infinite;
                    }
                `}</style>
            </div>

            {!!showAmediteBottleModel && <AmediteBottleModel amedite={showAmediteBottleModel} onClose={() => setShowAmediteBottleModel(null)} />}

            {!!showReagentModel && <ReagentModel reagentContainer={showReagentModel} onClose={() => setShowReagentModel(null)} />}

            {!!showPumpModel && <PumpModel pumpNumber={showPumpModel} onClose={() => setShowPumpModel(null)} />}

            {showColumnSelectionModel && <ColumnSelectionModel onClose={() => setShowColumnSelectionModel(false)} />}

            {showWasteBlockSelectionModel && <WasteBlockSelectionModel onClose={() => setShowWasteBlockSelectionModel(false)} />}
        </>
    );
}
