import React from "react";
import { LiquidSensor } from "./liquid-sensor";
import { PipeFlow } from "./pipe-flow";
import { useSelector } from "react-redux";

const LiquidSensorParent = (props) => {
    const { positionClassName, sensorNumber, pipePositionClassName, isSensorEnable, isPipeFlowing } = props;

    return (
        <>
            <LiquidSensor className={positionClassName} sensorNumber={sensorNumber} isEnable={isSensorEnable} />

            <PipeFlow className={`${pipePositionClassName} z-[1] h-2 border border-neutral-500 bg-neutral-50`} is_flowing={isPipeFlowing} />
        </>
    );
};

export default function LiquidSensorWithPipes(props) {
    const { pipeState } = props;

    const liquidDetectionSensor = useSelector((state) => state.liquidDetection.detectors);

    // TODO : change name from settings from R to LS
    // Need to add tooltip
    const valveStatus = {
        ls1: liquidDetectionSensor.find((el) => el.position === "R1")?.checked,
        ls2: liquidDetectionSensor.find((el) => el.position === "R2")?.checked,
        ls3: liquidDetectionSensor.find((el) => el.position === "R3")?.checked,
        ls4: liquidDetectionSensor.find((el) => el.position === "R4")?.checked,
        ls5: liquidDetectionSensor.find((el) => el.position === "R5")?.checked
    };

    return (
        <>
            {/* Liquid Sensor 1 (Rotated) */}
            <LiquidSensorParent
                positionClassName="top-[600px] rotate-90 left-[770px]"
                sensorNumber={1}
                pipePositionClassName="w-[24px] top-[695px] left-[826px] rotate-90"
                isSensorEnable={valveStatus.ls1}
                isPipeFlowing={pipeState?.LS1BotValve}
            />

            {/* Liquid Sensor 2 (Rotated 180) */}
            <LiquidSensorParent
                positionClassName="top-[540px] left-[1265px]"
                sensorNumber={2}
                pipePositionClassName="w-[76px] z-[1] h-2 top-[576px] left-[1257px] rotate-180"
                isSensorEnable={valveStatus.ls2}
                isPipeFlowing={pipeState?.pump2ls4}
            />

            {/* waste valve <--> liquid sensor  */}
            {/* Liquid Sensor 3 (Rotated 180) */}
            <LiquidSensorParent
                positionClassName="top-[403px] left-[1295px] rotate-90"
                sensorNumber={3}
                pipePositionClassName="w-[34px] top-[439px] left-[1306px] rotate-180"
                isSensorEnable={valveStatus.ls3}
                isPipeFlowing={pipeState?.wasteValveLS2}
            />

            {/* Liquid Sensor 4 (Rotated 180) */}
            <LiquidSensorParent
                positionClassName="top-[230px] left-[908px]"
                sensorNumber={4}
                pipePositionClassName="w-[56px] top-[264px] left-[875px] rotate-180"
                isSensorEnable={valveStatus.ls4}
                isPipeFlowing={pipeState?.LS4MixBlock}
            />

            {/* LS 5 */}
            <LiquidSensorParent
                positionClassName="top-[235px] left-[610px]"
                sensorNumber={5}
                pipePositionClassName="w-[57px] top-[270px] left-[726px]"
                isSensorEnable={valveStatus.ls5}
                isPipeFlowing={pipeState?.ls5MixBlock}
            />
        </>
    );
}
