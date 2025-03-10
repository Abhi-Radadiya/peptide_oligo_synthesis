// import React, { useState } from "react";
// import { PipeFlow } from "./pipe-flow";
// import { ControlledSwitch } from "../../../../../../Components/FormController/Switch";
// import { ToggleRight } from "lucide-react";
// import { useFormContext } from "react-hook-form";
// import RGValveActionModel from "../Models/rg-valve-action-model";

// export default function RGValve(props) {
//     const { pipeState } = props;

// const { control, watch } = useFormContext();

//     const [isRGValveActionModel, setIsRGValveActionModel] = useState(false);

//     return (
//         <>
//             {/* RG Valve */}
//             <div
//                 className="w-52 h-16 border border-blue-200 bg-gradient-to-r z-10 from-blue-100 to-neutral-50 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 absolute left-[1050px] top-[380px] cursor-pointer"
//                 onClick={() => setIsRGValveActionModel(true)}
//             >
//                 <span className="text-center font-medium text-slate-700 text-sm">RG Valve</span>

//                 <span>{watch('manualModeRunFlow.rgValveStatus')}</span>

//                 {/* <div className="flex items-center gap-4">
//                     <ToggleRight className="text-blue-600" size={22} /> */}
//                 {/* <span className="text-center font-medium text-slate-700 text-sm">RG Valve</span> */}
//                 {/* <ControlledSwitch control={control} name="manualModeRunFlow.rgValve" checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
//                 </div> */}
//             </div>

//             <PipeFlow className="w-[43px] z-[1] h-2 top-[358px] left-[1143px] -rotate-90 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.rgValvePump2} />

//             {isRGValveActionModel && <RGValveActionModel onClose={() => setIsRGValveActionModel(false)} />}
//         </>
//     );
// }

import React, { useState, useEffect } from "react";
import { PipeFlow } from "./pipe-flow";
import RGValveActionModel from "../Models/rg-valve-action-model";
import { useFormContext } from "react-hook-form";

export default function RGValve(props) {
    const { pipeState } = props;

    const { watch } = useFormContext();

    const [isRGValveActionModel, setIsRGValveActionModel] = useState(false);

    const valveMode = watch("manualModeRunFlow.rgValveStatus");

    const [isAnimating, setIsAnimating] = useState(false);

    // Handle valve mode change
    const handleModeChange = (newMode) => {
        setIsAnimating(true);

        // End animation after a delay
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    useEffect(() => {
        handleModeChange();
    }, [valveMode]);

    // Get status color based on valve mode
    const getStatusColor = () => {
        switch (valveMode) {
            case "valve2Pump2":
                return "bg-blue-500";
            case "reagent2Pump2":
                return "bg-green-500";
            case "close":
            default:
                return "bg-gray-500";
        }
    };

    // Get status text based on valve mode
    const getStatusText = () => {
        switch (valveMode) {
            case "valve2Pump2":
                return "Valve → Pump2";
            case "reagent2Pump2":
                return "Reagent → Pump2";
            case "close":
            default:
                return "Closed";
        }
    };

    return (
        <>
            {/* RG Valve */}
            <div
                className={`w-64 z-10 h-20 border-2 ${
                    isAnimating ? "border-yellow-400" : "border-blue-300"
                } bg-white rounded-lg shadow-lg flex flex-col justify-center relative transition-all duration-300 hover:shadow-xl hover:border-blue-400 absolute left-[1020px] top-[375px] cursor-pointer overflow-hidden`}
                onClick={() => setIsRGValveActionModel(true)}
            >
                {/* Main content */}
                <div className="flex items-center px-4 h-full">
                    {/* Left side - Label and Status */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-slate-700 text-lg">RG Valve</h3>
                        <div className="flex items-center mt-1">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor()} mr-2 ${isAnimating ? "animate-pulse" : ""}`}></div>
                            <span className="text-sm text-slate-600">{getStatusText()}</span>
                        </div>
                    </div>

                    {/* Right side - Visual representation */}
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                        <svg viewBox="0 0 40 40" width="40" height="40">
                            {/* Valve body */}
                            <circle cx="20" cy="20" r="15" fill="#f0f0f0" stroke="#a0a0a0" strokeWidth="1.5" />

                            {/* Valve internal - changes based on mode */}
                            {valveMode === "valve2Pump2" && (
                                <path d="M10,20 C15,15 25,25 30,20" stroke="#3b82f6" strokeWidth="3" fill="none" className={isAnimating ? "animate-pulse" : ""} />
                            )}
                            {valveMode === "reagent2Pump2" && (
                                <path d="M10,20 C15,25 25,15 30,20" stroke="#22c55e" strokeWidth="3" fill="none" className={isAnimating ? "animate-pulse" : ""} />
                            )}
                            {valveMode === "close" && <line x1="13" y1="13" x2="27" y2="27" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" />}

                            {/* Valve ports */}
                            <circle cx="5" cy="20" r="3" fill={valveMode !== "close" ? "#3b82f6" : "#d1d5db"} />
                            <circle cx="35" cy="20" r="3" fill={valveMode !== "close" ? "#3b82f6" : "#d1d5db"} />
                            <circle cx="20" cy="5" r="3" fill={valveMode !== "close" ? "#22c55e" : "#d1d5db"} />
                        </svg>
                    </div>
                </div>

                {/* Quick action buttons */}
                <div className="absolute -bottom-10 left-0 w-full flex justify-around p-2 bg-gray-50 border-t border-gray-200 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:bottom-0">
                    <button
                        className={`px-2 py-1 text-xs rounded ${valveMode === "valve2Pump2" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleModeChange("valve2Pump2");
                        }}
                    >
                        V→P2
                    </button>
                    <button
                        className={`px-2 py-1 text-xs rounded ${valveMode === "reagent2Pump2" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleModeChange("reagent2Pump2");
                        }}
                    >
                        R→P2
                    </button>
                    <button
                        className={`px-2 py-1 text-xs rounded ${valveMode === "close" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleModeChange("close");
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Connecting pipes - visibility and flow based on valve mode */}
            <PipeFlow
                isVertical
                className="w-2 z-[1] h-[109px] top-[342px] left-[1159px] border border-neutral-500"
                is_flowing={false}
                flow_color={valveMode === "reagent2Pump2" ? "bg-green-300" : "bg-blue-300"}
            />

            {/* Modal for detailed controls */}
            {isRGValveActionModel && <RGValveActionModel onClose={() => setIsRGValveActionModel(false)} currentMode={valveMode} onModeChange={handleModeChange} />}
        </>
    );
}
