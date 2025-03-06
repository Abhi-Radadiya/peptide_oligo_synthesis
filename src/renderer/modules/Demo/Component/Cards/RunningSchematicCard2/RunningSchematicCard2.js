import React, { useState, useEffect } from "react";
import AmediteBottleModel from "./Models/AmediteBottleModel";
import ReagentModel from "./Models/ReagentModel";
import ColumnSelectionModel from "./Models/column-selection-model";
import WasteBlockSelectionModel from "./Models/waste-block-selection-model.js";
import PumpModel from "./Models/pump-model";
import { openToast } from "../../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { FILE_WARNING } from "../../../../../Helpers/Icons";
import { ControlledSwitch } from "../../../../../Components/FormController/Switch";
import { Beaker, Droplets, FlaskConical, Power, ToggleRight, Atom, BringToFront, Vault, Activity, RouteOff, CirclePlay } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { PipeFlow } from "./Components/pipe-flow.js";
import { LiquidSensor } from "./Components/liquid-sensor.js";
import { Button } from "../../../../../Components/Buttons/Buttons.js";

export default function EnhancedRunningSchematicCard() {
    const { watch, control } = useFormContext();
    const dispatch = useDispatch();

    const liquidDetectionSensor = useSelector((state) => state.liquidDetection.detectors);

    // TODO : change name from settings from R to LS
    // Need to add tooltip
    const valveStatus = {
        ls1: liquidDetectionSensor.find((el) => el.position === "R1")?.checked,
        ls2: liquidDetectionSensor.find((el) => el.position === "R2")?.checked,
        ls3: liquidDetectionSensor.find((el) => el.position === "R3")?.checked,
        ls4: liquidDetectionSensor.find((el) => el.position === "R4")?.checked,
        ls5: liquidDetectionSensor.find((el) => el.position === "R5")?.checked,
    };

    // Modal states
    const [showAmediteBottleModel, setShowAmediteBottleModel] = useState(null);
    const [showReagentModel, setShowReagentModel] = useState(false);
    const [showColumnSelectionModel, setShowColumnSelectionModel] = useState(false);
    const [showPumpModel, setShowPumpModel] = useState(false);
    const [showWasteBlockSelectionModel, setShowWasteBlockSelectionModel] = useState(false);

    // Active flow states
    const [activeFlows, setActiveFlows] = useState({
        amediteToDistBlock: false,
        distBlockToPump1: false,
        pump1ToSensor1: false,
        sensor1ToMixBlock: false,
        mixBlockToWasteValve: false,
        wasteValveToColumn: false,
        columnToBottomValve: false,
        reagent1ToSensor3: false,
        reagent2ToSensor4: false,
        sensor4ToPump2: false,
        pump2ToRGValve: false,
        rgValveToWasteValve2: false,
    });

    // Simulate active flows for demonstration
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFlows((prev) => {
                const flows = { ...prev };
                // Randomly activate/deactivate flows
                Object.keys(flows).forEach((key) => {
                    flows[key] = Math.random() > 0.7;
                });
                return flows;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleClickPump = (pumpNumber) => {
        const selectedColumnId = watch("manualModeRunFlow.column.columnDetails.id");

        if (!selectedColumnId) {
            dispatch(openToast({ text: `Please select column first to select pump flow rate`, icon: FILE_WARNING }));
            return;
        }

        setShowPumpModel(pumpNumber);
    };

    const [pipeState, setPipeState] = useState({});

    const manualModeRunFlow = watch("manualModeRunFlow");

    // const manualModeRunFlow = {
    //     reagent1: {
    //         valve: [
    //             {
    //                 valveNumber: 6,
    //                 volume: "80",
    //                 volumeUnit: "microLitre",
    //                 valveStatus: "close",
    //             },
    //         ],
    //     },
    //     reagent2: {
    //         valve: [
    //             {
    //                 valveNumber: 7,
    //                 volume: "80",
    //                 volumeUnit: "microLitre",
    //                 valveStatus: "close",
    //             },
    //         ],
    //     },
    //     amedite1: {
    //         valve: [
    //             {
    //                 valveNumber: 5,
    //                 volume: "30",
    //                 volumeUnit: "microLitre",
    //                 valveStatus: "close",
    //             },
    //         ],
    //     },
    //     amedite2: {
    //         valve: [],
    //     },
    //     amedite3: {
    //         valve: [
    //             {
    //                 valveNumber: 23,
    //                 volume: "80",
    //                 volumeUnit: "microLitre",
    //                 valveStatus: "close",
    //             },
    //         ],
    //     },
    //     column: {
    //         columnDetails: {
    //             name: "10 Barrel",
    //             id: 1,
    //             maxPressure: "10",
    //             maxFlowRate: "10",
    //             diameter: "10",
    //             height: "10",
    //             liquidVolume: "10",
    //             loadingVolume: "10",
    //         },
    //         columnStatus: "close",
    //     },
    //     wasteBlock: {
    //         selectedBlock: {
    //             label: 3,
    //             value: 3,
    //         },
    //         tempSelectedBlock: {
    //             label: 3,
    //             value: 3,
    //         },
    //     },
    //     pump1: {
    //         flowRate: "6",
    //         tempFlowRate: null,
    //     },
    //     pump2: {
    //         flowRate: "90",
    //         tempFlowRate: null,
    //     },
    // };

    const startAmedite = () => {
        let index = 2; // Ensure index is defined outside setInterval to persist across calls

        setPipeState((prevState) => {
            const newState = { ...prevState };
            if (!manualModeRunFlow.amedite2.valve.length) newState.amedite2 = true;
            if (!manualModeRunFlow.reagent2.valve.length) newState.LS3RGValve = true;
            return newState;
        });

        const intervalId = setInterval(() => {
            setPipeState((prevState) => {
                const newState = { ...prevState };

                // eslint-disable-next-line default-case
                switch (index) {
                    case 2:
                        if (!manualModeRunFlow.amedite3.valve.length) newState.amedite3 = true;
                        if (!manualModeRunFlow.reagent2.valve.length) newState.rgValvePump2 = true;
                        break;

                    case 3:
                        if (!manualModeRunFlow.reagent2.valve.length) newState.pump2ls4 = true;
                        if (!manualModeRunFlow.reagent1.valve.length) newState.reagent1 = true;
                        break;

                    case 4:
                        if (!manualModeRunFlow.reagent2.valve.length) newState.LS4MixBlock = true;
                        clearInterval(intervalId); // Stop the interval after the last step
                        return prevState; // Prevent unnecessary state update after clearing
                }

                index++; // Increment the index after updating state
                return newState;
            });
        }, 2050);
    };

    const runManualSynthesis = () => {
        let index = 0;
        const isBypass = manualModeRunFlow.columnTopValveEnable;

        const intervalId = setInterval(() => {
            setPipeState((prevState) => {
                const newState = { ...prevState };

                switch (index) {
                    case 0:
                        startAmedite();
                        if (!manualModeRunFlow.amedite1.valve.length) newState.amedite1 = true;
                        if (!manualModeRunFlow.reagent2.valve.length) newState.reagent2LS3 = true;
                        break;

                    case 1:
                        newState.distPump1 = true;
                        break;

                    case 2:
                        newState.pump1Ls5 = true;
                        break;

                    case 3:
                        newState.ls5MixBlock = true;
                        break;

                    case 4:
                        newState.mixBlockTopValve = true;
                        break;

                    case 5:
                        if (isBypass) {
                            newState.topValveColumn = true;
                        } else {
                            newState.columnBypass = true;
                        }
                        break;

                    case 6:
                        if (isBypass) {
                            newState.columnLS1 = true;
                        } else {
                            newState.botValveWasteValve = true;
                        }
                        break;

                    case 7:
                        if (isBypass) {
                            newState.LS1BotValve = true;
                        } else {
                            newState.wasteValveLS2 = true;
                        }
                        break;

                    case 8:
                        if (isBypass) {
                            newState.botValveWasteValve = true;
                            clearInterval(intervalId); // Stop the interval if bypass is true
                        } else {
                            newState.LS2WasteColumn = true;
                        }
                        break;

                    case 9:
                        newState.wasteValveLS2 = true;
                        break;

                    case 10:
                        newState.LS2WasteColumn = true;
                        clearInterval(intervalId); // Stop interval after the last update
                        break;

                    default:
                        clearInterval(intervalId);
                        return prevState;
                }

                index++; // Move to the next step
                return newState;
            });
        }, 2000);

        console.log(`watch : `, watch("manualModeRunFlow"));
    };

    return (
        <>
            <div className="w-[1450px] h-[800px] border border-neutral-200 rounded-xl p-8 flex mx-auto flex-col bg-gradient-to-b from-gray-50 to-gray-100 shadow-md relative overflow-hidden">
                <Button
                    label="Run Synthesis"
                    onClick={runManualSynthesis}
                    className="w-fit absolute right-[160px] top-5 z-[10]"
                    leftIcon={<CirclePlay />}
                    bgClassName="bg-blue-300"
                />
                {/* Amedite Bottles */}
                <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div
                    className="absolute border border-purple-200 z-10 rounded-lg shadow-lg h-36 w-36 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 left-36"
                    onClick={() => setShowAmediteBottleModel(`amedite${1}`)}
                >
                    <div className="flex flex-col items-center">
                        <Beaker className="mb-2 text-purple-500" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite 1</span>
                    </div>

                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm animate-pulse"></div>
                </div>

                <PipeFlow className="w-20 z-[1] h-2 top-48 left-[265px] rotate-45 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.amedite1} />

                <div
                    className="border border-purple-200 rounded-lg z-10 shadow-lg h-36 w-36 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 absolute left-8 top-52"
                    onClick={() => setShowAmediteBottleModel(`amedite${2}`)}
                >
                    <div className="flex flex-col items-center">
                        <Beaker className="mb-2 text-purple-500" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite 2</span>
                    </div>

                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm animate-pulse"></div>
                </div>

                <PipeFlow className="w-32 z-[1] h-2 top-[270px] left-[174px] border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.amedite2} />

                <div
                    className="border border-purple-200 rounded-lg shadow-lg h-36 w-36 z-10 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 absolute left-36 top-[380px]"
                    onClick={() => setShowAmediteBottleModel(`amedite${3}`)}
                >
                    <div className="flex flex-col items-center">
                        <Beaker className="mb-2 text-purple-500" size={28} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite 3</span>
                    </div>

                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm animate-pulse"></div>
                </div>

                <PipeFlow className="w-20 z-[1] h-2 top-[358px] left-[266px] -rotate-45 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.amedite3} />

                <div
                    className="absolute left-[280px] top-[550px] border border-amber-200 z-10 rounded-lg h-32 w-36 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-amber-50 to-amber-100 cursor-pointer transform -skew-x-[12deg] hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onClick={() => setShowReagentModel(1)}
                >
                    <div className="skew-x-[12deg] flex flex-col items-center">
                        <FlaskConical className="text-amber-500" size={32} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Reagent 1</span>
                    </div>

                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm skew-x-[12deg] animate-pulse"></div>
                </div>

                <PipeFlow className="w-[210px] z-[1] h-2 top-[442px] left-[254px] -rotate-90 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.reagent1} />

                <div className="h-32 w-32 rounded-full border-2 border-yellow-200 z-10 flex flex-col justify-center items-center cursor-pointer bg-gradient-to-r from-yellow-50 to-yellow-100 absolute left-[300px] top-[215px] hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex flex-col items-center">
                        <Atom className="mb-2 text-yellow-500" size={32} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Dist. Block</span>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>

                {/* dist <---> pump 1 */}
                <PipeFlow className="w-[57px] z-[1] h-2 top-[270px] left-[425px] border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.distPump1} />

                {/* Pump 1 */}
                <div
                    className="rounded-full h-32 w-32 border-teal-400 absolute z-10 left-[480px] top-[215px] cursor-pointer shadow-lg border-2 bg-gradient-to-r from-teal-50 to-teal-100 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105"
                    onClick={() => handleClickPump(1)}
                >
                    <div className="absolute inset-3 rounded-full border-2 border-dashed border-teal-300 animate-spin-slow"></div>
                    <Power className="mb-1 text-teal-600" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Pump 1</span>
                    <div className="text-xs font-medium text-teal-600 mt-1">
                        {watch(`manualModeRunFlow.pump1.flowRate`) ? watch(`manualModeRunFlow.pump1.flowRate`) + " mL/min" : "Empty"}
                    </div>
                </div>

                <PipeFlow className="w-7 z-[1] h-2 top-[270px] left-[607px] border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.pump1Ls5} />

                <LiquidSensor className="top-[235px] left-[610px]" sensorNumber="5" isEnable={valveStatus.ls5} />

                <PipeFlow className="w-[57px] z-[1] h-2 top-[270px] left-[726px] border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.ls5MixBlock} />

                {/* Mix Block */}
                <div className="absolute top-[220px] left-[780px] bg-gradient-to-br z-[10] from-blue-100 to-neutral-50 rounded-full h-24 w-24 flex flex-col justify-center items-center border-2 border-blue-200 shadow-lg transition-all duration-300">
                    <div className="flex flex-col items-center">
                        <Vault className="mb-2 text-blue-500" size={28} />
                        <span className="flex items-center text-center text-xs font-medium text-blue-600">Mix Block</span>
                    </div>
                    <div className={`absolute inset-2 rounded-full border border-dashed border-blue-200 ${activeFlows.sensor1ToMixBlock ? "animate-pulse" : ""}`}></div>
                </div>

                <PipeFlow className="w-[24px] z-[1] h-2 top-[322px] left-[815px] border rotate-90 border-neutral-500 bg-neutral-50" is_flowing={pipeState?.mixBlockTopValve} />

                <div className="w-52 h-16 z-[10] border border-blue-200 bg-gradient-to-r from-blue-100 to-neutral-50 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 absolute left-[730px] top-[330px]">
                    <div className="flex items-center gap-4">
                        <ToggleRight className="text-blue-600" size={22} />
                        <span className="text-center font-medium text-slate-700 text-sm">Top Valve</span>
                        <ControlledSwitch control={control} name="manualModeRunFlow.columnTopValveEnable" checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                    </div>
                </div>
                {/* Column */}

                <PipeFlow className="w-[24px] z-[1] h-2 top-[401px] left-[816px] border rotate-90 border-neutral-500 bg-neutral-50" is_flowing={pipeState?.topValveColumn} />

                {/* top to bottom bypass valve */}
                <PipeFlow className="w-[64px] z-[1] h-2 top-[359px] left-[667px] rotate-180 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.columnBypass} />
                <PipeFlow className="w-[380px] z-[1] h-2 top-[548px] left-[481px] rotate-90 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.columnBypass} />
                <PipeFlow className="w-[75px] z-[1] h-2 top-[740px] left-[667px] border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.columnBypass} />

                <div
                    className="absolute left-[770px] top-[415px] h-40 w-32 z-[10] border-2 bg-gradient-to-b from-purple-50 to-purple-100 border-purple-200 shadow-lg rounded-lg cursor-pointer flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105"
                    onClick={() => setShowColumnSelectionModel(true)}
                >
                    <Droplets className="mb-2 text-purple-600" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Column</span>
                    <div className="absolute h-3/4 w-2/3 bottom-4 bg-gradient-to-b from-purple-200 to-purple-300 rounded opacity-30"></div>
                </div>

                <PipeFlow className="w-[24px] z-[1] h-2 top-[581px] left-[826px] border rotate-90 border-neutral-500 bg-neutral-50" is_flowing={pipeState?.columnLS1} />

                {/* Liquid Sensor 2 (Rotated) */}

                <LiquidSensor className="top-[600px] rotate-90 left-[770px]" sensorNumber="1" isEnable={valveStatus.ls1} />

                <PipeFlow className="w-[24px] z-[1] h-2 top-[695px] left-[826px] border rotate-90 border-neutral-500 bg-neutral-50" is_flowing={pipeState?.LS1BotValve} />

                {/* Bottom Valve */}
                <div className="w-52 h-16 border border-blue-200 z-10 bg-gradient-to-r from-blue-100 to-neutral-50 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 absolute left-[740px] top-[710px]">
                    <div className="flex items-center gap-4">
                        <ToggleRight className="text-blue-600" size={22} />
                        <span className="text-center font-medium text-slate-700 text-sm">Bot. Valve</span>
                        <ControlledSwitch control={control} name="manualModeRunFlow.columnBottomValveEnable" checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                    </div>
                </div>

                {/* bottom valve waste valve */}
                <PipeFlow className="w-[165px] z-[1] h-2 top-[655px] left-[915px] -rotate-45 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.botValveWasteValve} />

                <LiquidSensor className="top-[230px] left-[908px]" sensorNumber="4" isEnable={valveStatus.ls4} />

                <PipeFlow className="w-[56px] z-[1] h-2 top-[264px] left-[875px] rotate-180 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.wasteValveLS2} />

                {/* Pump 2 */}
                <div
                    className="absolute left-[1100px] top-[215px] z-10 rounded-full h-32 w-32 border-teal-400 cursor-pointer shadow-lg border-2 bg-gradient-to-r from-teal-50 to-teal-100 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105"
                    onClick={() => handleClickPump(2)}
                >
                    <div className="absolute inset-3 rounded-full border-2 border-dashed border-teal-300 animate-spin-slow"></div>
                    <Power className="mb-1 text-teal-600" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Pump 2</span>
                    <div className="text-xs font-medium text-teal-600 mt-1">
                        {watch(`manualModeRunFlow.pump2.flowRate`) ? watch(`manualModeRunFlow.pump2.flowRate`) + " mL/min" : "Empty"}
                    </div>
                </div>

                {/* liquid sensor <--> pump 2 */}
                <PipeFlow className="w-[76px] z-[1] h-2 top-[264px] left-[1029px] rotate-180 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.pump2ls4} />

                {/* RG Valve __ pump2 */}
                <PipeFlow className="w-[43px] z-[1] h-2 top-[358px] left-[1143px] -rotate-90 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.rgValvePump2} />

                {/* RG Valve */}
                <div className="w-52 h-16 border border-blue-200 bg-gradient-to-r z-10 from-blue-100 to-neutral-50 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 absolute left-[1050px] top-[380px]">
                    <div className="flex items-center gap-4">
                        <ToggleRight className="text-blue-600" size={22} />
                        <span className="text-center font-medium text-slate-700 text-sm">RG Valve</span>
                        <ControlledSwitch control={control} name="manualModeRunFlow.rgValve" checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                    </div>
                </div>

                {/* RG VAlve <---> liquid sensor */}
                <PipeFlow className="w-[34px] z-[1] h-2 top-[403px] left-[1257px] rotate-180 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.LS3RGValve} />

                {/* Waste Valve 2 */}
                <div className="w-52 h-16 border border-blue-200 bg-gradient-to-r z-10 from-blue-100 to-neutral-50 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 absolute left-[1050px] top-[550px]">
                    <div className="flex items-center gap-4">
                        <ToggleRight className="text-blue-600" size={22} />
                        <span className="text-center font-medium text-slate-700 text-sm">Waste Valve</span>
                        <ControlledSwitch control={control} name="manualModeRunFlow.wasteValve" checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                    </div>
                </div>

                {/* waste valve <--> liquid sensor  */}
                <PipeFlow className="w-[34px] z-[1] h-2 top-[576px] left-[1257px] rotate-180 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.wasteValveLS2} />

                <LiquidSensor className="top-[370px] left-[1265px]" sensorNumber="3" isEnable={valveStatus.ls3} />

                <PipeFlow className="w-[168px] z-[1] h-2 top-[295px] left-[1257px] rotate-90 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.LS2WasteColumn} />

                {/* Reagent 2 */}
                <div
                    className="absolute left-[1280px] top-[90px] z-10 border border-amber-200 rounded-lg h-32 w-36 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-amber-50 to-amber-100 cursor-pointer transform -skew-x-[12deg] hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onClick={() => setShowReagentModel(2)}
                >
                    <div className="skew-x-[12deg] flex flex-col items-center">
                        <FlaskConical className="text-amber-500" size={32} />
                        <span className="flex items-center text-center text-base font-medium text-slate-700">Reagent 2</span>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm skew-x-[12deg] animate-pulse"></div>
                </div>

                <LiquidSensor className="top-[540px] left-[1265px]" sensorNumber="2" isEnable={valveStatus.ls5} />

                <PipeFlow className="w-[66px] z-[1] h-2 top-[636px] left-[1299px] -rotate-90 border border-neutral-500 bg-neutral-50" is_flowing={false} />

                {/* Waste Column */}
                <div
                    className="absolute left-[1246px] top-[670px] border-2 z-10 border-cyan-300 rounded-full h-24 w-40 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-cyan-50 to-cyan-100 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onClick={() => setShowWasteBlockSelectionModel(true)}
                >
                    <div className="absolute inset-1 rounded-full border border-dashed border-cyan-200"></div>
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Waste Column</span>
                    <div className="w-3/4 px-2 mt-1">
                        <div className="bg-gray-200 rounded-full h-1 w-full">
                            <div className="bg-cyan-500 h-1 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                    </div>
                </div>
                {/* Legend */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-80 z-20 p-2 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-xs font-medium text-gray-700 mb-1">Flow Legend</div>
                    <div className="flex items-center gap-1 mb-1">
                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                        <span className="text-xs">Amedite</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <span className="text-xs">Reagent</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                        <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                        <span className="text-xs">Pump Flow</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-xs">Process Flow</span>
                    </div>
                </div>
                {/* Status Indicator */}
                {!!pipeState.length ? (
                    <>
                        <div className="absolute top-4 right-4 bg-green-50 px-3 py-1 rounded-full border border-green-200 shadow-sm flex items-center">
                            <Activity size={16} className="text-green-500 mr-1" />
                            <span className="text-sm font-medium text-green-700">System Active</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="absolute top-4 right-4 bg-neutral-300 px-3 py-1 rounded-full border border-neutral-500 shadow-sm flex items-center">
                            <RouteOff size={16} className="text-gray-700 mr-1" />
                            <span className="text-sm font-medium text-gray-700">System Asleep</span>
                        </div>
                    </>
                )}
                {/* CSS Animations */}
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

            {/* Modal Components */}
            {!!showAmediteBottleModel && <AmediteBottleModel amedite={showAmediteBottleModel} onClose={() => setShowAmediteBottleModel(null)} />}
            {!!showReagentModel && <ReagentModel reagentContainer={showReagentModel} onClose={() => setShowReagentModel(null)} />}
            {!!showPumpModel && <PumpModel pumpNumber={showPumpModel} onClose={() => setShowPumpModel(null)} />}
            {showColumnSelectionModel && <ColumnSelectionModel onClose={() => setShowColumnSelectionModel(false)} />}
            {showWasteBlockSelectionModel && <WasteBlockSelectionModel onClose={() => setShowWasteBlockSelectionModel(false)} />}
        </>
    );
}
