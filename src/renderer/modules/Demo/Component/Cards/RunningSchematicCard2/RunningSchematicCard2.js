import React, { useState } from "react";
import { CirclePlay } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../../../../Components/Buttons/Buttons.js";
import AmediteContainer from "./Components/amedite-container.js";
import DistBlock from "./Components/dist-block.js";
import ReagentContainers from "./Components/reagent-containers.js";
import Pump from "./Components/pump.js";
import LiquidSensorWithPipes from "./Components/liquid-sensor-with-pipes.js";
import MixBlock from "./Components/mix-block.js";
import ColumnWithValve from "./Components/column-with-valve.js";
import WasteValve from "./Components/waste-valve.js";
import RGValve from "./Components/rg-valve";
import Legends from "./Components/legends.js";
import WasteBlock from "./Components/waste-block";
import StylingBackground from "./Components/styling-background";

export default function EnhancedRunningSchematicCard() {
    const { watch } = useFormContext();

    const [pipeState, setPipeState] = useState({});

    const manualModeRunFlow = watch("manualModeRunFlow");

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

                <StylingBackground pipeState={pipeState} />

                <AmediteContainer pipeState={pipeState} />

                <DistBlock pipeState={pipeState} />

                <ReagentContainers pipeState={pipeState} />

                <Pump pipeState={pipeState} positionClassName="left-[480px] top-[215px]" pumpNumber={1} pipePositionClassName="top-[270px] left-[607px] w-7" />

                <Pump pipeState={pipeState} positionClassName="left-[1100px] top-[215px]" pumpNumber={2} pipePositionClassName="top-[264px] left-[1029px] w-[76px]" />

                <LiquidSensorWithPipes pipeState={pipeState} />

                <MixBlock pipeState={pipeState} />

                <ColumnWithValve pipeState={pipeState} />

                <WasteBlock pipeState={pipeState} />

                <RGValve />

                <WasteValve pipeState={pipeState} />

                <Legends />
            </div>
        </>
    );
}
