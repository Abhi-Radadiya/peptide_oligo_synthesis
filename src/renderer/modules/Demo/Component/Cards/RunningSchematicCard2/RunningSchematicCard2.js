import React, { useState } from "react";
import AmediteBottleModel from "./Models/AmediteBottleModel";
import ReagentModel from "./Models/ReagentModel";
import ColumnSelectionModel from "./Models/column-selection-model";
import WasteBlockSelectionModel from "./Models/waste-block-selection-model.js";
import PumpModel from "./Models/pump-model";
import { openToast } from "../../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { FILE_WARNING } from "../../../../../Helpers/Icons";
import ToggleSwitch from "../../../../../Components/FormController/Switch";
import { Beaker, Droplets, FlaskConical, Power, ToggleRight, Atom, BringToFront, Vault } from "lucide-react";
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
            <div className="w-[1450px] h-[800px] border border-neutral-200 rounded-xl p-8 flex mx-auto flex-col bg-gradient-to-b from-gray-50 to-gray-100 shadow-md relative">
                <div
                    key={`amedite-${1}`}
                    className="absolute border border-slate-200 rounded-lg shadow-lg h-36 w-36 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] left-36"
                    // ? "bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd]"text-[#0284c7]
                    // ? "bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe]"text-[#2563eb]

                    onClick={() => setShowAmediteBottleModel(`amedite${1}`)}
                >
                    <Beaker className="mb-2 text-[#7c3aed]" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite {1}</span>
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>

                <div
                    className="border border-slate-200 rounded-lg shadow-lg h-36 w-36 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] absolute left-8 top-52"
                    onClick={() => setShowAmediteBottleModel(`amedite${1}`)}
                >
                    <Beaker className="mb-2 text-[#7c3aed]" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite {1}</span>
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>

                <div
                    key={`amedite-${1}`}
                    className="border border-slate-200 rounded-lg shadow-lg h-36 w-36 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] absolute left-36 top-[380px]"
                    onClick={() => setShowAmediteBottleModel(`amedite${1}`)}
                >
                    <Beaker className="mb-2 text-[#7c3aed]" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite {1}</span>

                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>

                <div
                    className="absolute left-[280px] top-[550px] border border-amber-200 rounded-lg h-32 w-36 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-amber-50 to-amber-100 cursor-pointer transform -skew-x-[12deg] hover:shadow-xl transition-all duration-300"
                    onClick={() => setShowReagentModel(1)}
                >
                    <div className="skew-x-[12deg] flex flex-col items-center">
                        <FlaskConical className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Reagent 1</span>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm skew-x-[12deg]"></div>
                </div>

                <div className="h-32 w-32 rounded-full border flex flex-col justify-center items-center cursor-pointer border-[#f2f279] bg-[#F5F5DC] absolute left-[300px] top-[215px]">
                    <div className="flex flex-col items-center">
                        <Atom className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Dist. Block</span>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>

                <div
                    className="rounded-full h-32 w-32 border-teal-400 absolute left-[480px] top-[215px] cursor-pointer shadow-lg border-2 bg-gradient-to-r from-teal-50 to-teal-100 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl hover:bg-gradient-to-r hover:from-teal-100 hover:to-teal-200"
                    onClick={() => handleClickPump(1)}
                >
                    <div className="absolute inset-3 rounded-full border-2 border-dashed border-teal-300 animate-spin-slow"></div>
                    <Power className="mb-1 text-teal-600" size={24} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Pump 1</span>
                </div>

                <div className="absolute top-[230px] left-[610px] bg-neutral-200 h-20 w-36 scale-[0.7] flex flex-col justify-center items-center border border-neutral-300 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <BringToFront className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Liquid Sensor</span>
                    </div>
                </div>

                <div className="absolute top-[220px] left-[780px] bg-neutral-200 rounded-full h-24 w-24 flex flex-col justify-center items-center border border-neutral-300 shadow-lg">
                    <div className="flex flex-col items-center">
                        <Vault className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Mix Block</span>
                    </div>
                </div>

                <div className="w-52 h-16 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl absolute left-[730px] top-[330px]">
                    <div className="flex items-center gap-4">
                        <ToggleRight className="text-blue-600" size={22} />
                        <span className="text-center font-medium text-slate-700 text-xs">Waste Valve</span>
                        <ToggleSwitch checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                    </div>
                </div>

                <div
                    className="absolute left-[770px] top-[415px] h-40 w-32 border-2 bg-gradient-to-b from-purple-50 to-purple-100 border-purple-200 shadow-lg rounded-lg cursor-pointer flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl"
                    onClick={() => setShowColumnSelectionModel(true)}
                >
                    <Droplets className="mb-2 text-purple-600" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Column</span>
                    <div className="absolute h-3/4 w-2/3 bottom-4 bg-gradient-to-b from-purple-200 to-purple-300 rounded opacity-30"></div>
                </div>

                <div className="absolute top-[600px] rotate-90 left-[770px] scale-[0.7] bg-neutral-200 h-20 w-36 flex flex-col justify-center items-center border border-neutral-300 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <BringToFront className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Liquid Sensor</span>
                    </div>
                </div>

                <div className="w-52 h-16 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl absolute left-[740px] top-[770px]">
                    <div className="flex items-center gap-4">
                        <ToggleRight className="text-blue-600" size={22} />
                        <span className="text-center font-medium text-slate-700 text-xs">Bot. Valve</span>
                        <ToggleSwitch checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                    </div>
                </div>

                <div className="absolute top-[230px] left-[908px] bg-neutral-200 h-20 w-36 scale-[0.7] flex flex-col justify-center items-center border border-neutral-300 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <BringToFront className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Liquid Sensor</span>
                    </div>
                </div>

                <div
                    className="absolute left-[1100px] top-[215px] rounded-full h-32 w-32 border-teal-400 cursor-pointer shadow-lg border-2 bg-gradient-to-r from-teal-50 to-teal-100 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl hover:bg-gradient-to-r hover:from-teal-100 hover:to-teal-200"
                    onClick={() => handleClickPump(2)}
                >
                    <div className="absolute inset-3 rounded-full border-2 border-dashed border-teal-300 animate-spin-slow"></div>
                    <Power className="mb-1 text-teal-600" size={24} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Pump 2</span>
                </div>

                <div className="w-52 h-16 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl absolute left-[1050px] top-[380px]">
                    <div className="flex items-center gap-4">
                        <ToggleRight className="text-blue-600" size={22} />
                        <span className="text-center font-medium text-slate-700 text-xs">RG Valve</span>
                        <ToggleSwitch checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                    </div>
                </div>

                <div className="w-52 h-16 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl absolute left-[1050px] top-[550px]">
                    <div className="flex items-center gap-4">
                        <ToggleRight className="text-blue-600" size={22} />
                        <span className="text-center font-medium text-slate-700 text-xs">Waste Valve</span>
                        <ToggleSwitch checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                    </div>
                </div>

                <div className="absolute top-[370px] left-[1250px] bg-neutral-200 h-20 w-36 scale-[0.7] flex flex-col justify-center items-center border border-neutral-300 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <BringToFront className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Liquid Sensor</span>
                    </div>
                </div>

                <div
                    className="absolute left-[1280px] top-[90px] border border-amber-200 rounded-lg h-32 w-36 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-amber-50 to-amber-100 cursor-pointer transform -skew-x-[12deg] hover:shadow-xl transition-all duration-300"
                    onClick={() => setShowReagentModel(1)}
                >
                    <div className="skew-x-[12deg] flex flex-col items-center">
                        <FlaskConical className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Reagent 2</span>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm skew-x-[12deg]"></div>
                </div>

                <div className="absolute top-[540px] left-[1250px] bg-neutral-200 h-20 w-36 scale-[0.7] flex flex-col justify-center items-center border border-neutral-300 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <BringToFront className="mb-2 text-amber-600" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Liquid Sensor</span>
                    </div>
                </div>

                <div
                    className="absolute left-[1246px] top-[1190px] border-2 border-cyan-300 rounded-full h-24 w-40 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-cyan-50 to-cyan-100 cursor-pointer hover:shadow-xl transition-all duration-300"
                    onClick={() => setShowWasteBlockSelectionModel(true)}
                >
                    <div className="absolute inset-1 rounded-full border border-dashed border-cyan-200"></div>
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Waste Column</span>
                </div>

                {/*   <div
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
                </div> */}

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
