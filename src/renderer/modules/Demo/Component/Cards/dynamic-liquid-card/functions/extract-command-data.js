import { useMemo } from "react"
import { useSelector } from "react-redux"

export function useExtractCommandData() {
    const hardwareSetup = useSelector((state) => state.hardwareSetup)

    const extractedPump = useMemo(() => {
        return hardwareSetup.pump.map((el) => {
            return { index: el.pump.index, id: el.pump.pumpId }
        })
    }, [hardwareSetup.pump])

    const extractedSensor = useMemo(() => {
        return hardwareSetup.sensor.map((el) => {
            return { index: el.sensor.index, id: el.sensor.id }
        })
    }, [hardwareSetup.sensor])

    const extractedValves = useMemo(() => {
        const allExtractedData = [
            ...hardwareSetup.amediteContainer.container1.bottles.map((el) => ({ id: el.id, index: el.valve.index })),
            ...hardwareSetup.amediteContainer.container2.bottles.map((el) => ({ id: el.id, index: el.valve.index })),
            ...hardwareSetup.amediteContainer.container3.bottles.map((el) => ({ id: el.id, index: el.valve.index })),
            ...hardwareSetup.reagentContainer.container1.bottles.map((el) => ({ id: el.id, index: el.valve.index })),
            ...hardwareSetup.reagentContainer.container2.bottles.map((el) => ({ id: el.id, index: el.valve.index })),
            ...hardwareSetup.wasteContainer.bottles.map((el) => ({ id: el.id, index: el.valve.index })),
            { id: hardwareSetup.otherValve.topValve.id, index: hardwareSetup.otherValve.topValve.valve.index },
            { id: hardwareSetup.otherValve.bottomValve.id, index: hardwareSetup.otherValve.bottomValve.valve.index },
            { id: hardwareSetup.otherValve.rgValve.id, index: hardwareSetup.otherValve.rgValve.valve.index },
            { id: hardwareSetup.otherValve.wasteValve.id, index: hardwareSetup.otherValve.wasteValve.valve.index }
        ]

        return allExtractedData.sort((a, b) => a.index - b.index)
    }, [hardwareSetup])

    const getBottleValveCommand = (config) => {
        const fromId = config?.selectedToFromBottle?.from
        const toId = config?.selectedToFromBottle?.to

        const fromValve = extractedValves.find((el) => el.id === fromId)
        if (!fromValve) throw new Error(`Invalid 'from' valve ID: ${fromId}`)

        const fromGlobalIndex = fromValve.index
        const fromBoardIndex = Math.floor((fromGlobalIndex - 1) / 16) + 1
        const fromValveInBoard = ((fromGlobalIndex - 1) % 16) + 1

        if (!config?.isRangeSelection) {
            return `Z,${fromBoardIndex},${config.status === "on" ? "VO" : "VF"},${fromValveInBoard};`
        }

        const toValve = extractedValves.find((el) => el.id === toId)
        if (!toValve) throw new Error(`Invalid 'to' valve ID: ${toId}`)

        const toGlobalIndex = toValve.index
        const toBoardIndex = Math.floor((toGlobalIndex - 1) / 16) + 1
        const toValveInBoard = ((toGlobalIndex - 1) % 16) + 1

        if (fromBoardIndex !== toBoardIndex) {
            throw new Error(`Valves are on different boards: ${fromBoardIndex} vs ${toBoardIndex}`)
        }

        return `Z,${fromBoardIndex},${config.status === "on" ? "VS" : "VC"},${fromValveInBoard},${toValveInBoard};`
    }

    const getPumpValveCommand = (config) => {
        const pumpIndex = extractedPump?.find((el) => el.id === config.id)?.index

        if (config.status !== "on") {
            return `Z,${pumpIndex},PF;`
        }

        if (config.controlMode === "time") {
            return `Z,${pumpIndex},PT,${config.time},${config.rpm};`
        } else if (config.controlMode === "liquidVolume") {
            return `Z,${pumpIndex},PL,${config.liquidVolume},${config.rpm};`
        } else {
            return `Z,${pumpIndex},PO;`
        }
    }

    const getSensorCommand = (config) => {
        const sensorIndex = extractedSensor.find((el) => el.id === config.id)?.index

        const boardIndex = Math.floor((sensorIndex - 1) / 8) + 1 // 1-based
        const sensorIndexInBoard = ((sensorIndex - 1) % 8) + 1 // 1-based (1 to 8)

        const time = config.timeUnit === "seconds" ? config.time * 1000 : config.timeUnit === "minutes" ? config.time * 60 * 1000 : config.time

        const threshold = Math.round(config.threshold * 100) // Avoid floating point artifacts

        return `Z,${boardIndex},${config.status === "on" ? "SL" : "SN"},${sensorIndexInBoard},${threshold},${time};`
    }

    const getSingleValveCommand = (config) => {
        const globalIndex = extractedValves.find((el) => el.id === config.id)?.index

        if (!Number.isInteger(globalIndex) || globalIndex < 1) {
            throw new Error(`Invalid valve index: ${globalIndex}`)
        }

        const boardIndex = Math.floor((globalIndex - 1) / 16) + 1
        const valveIndexInBoard = ((globalIndex - 1) % 16) + 1

        return `Z,${boardIndex},${config.status === "on" ? "VO" : "VF"},${valveIndexInBoard};`
    }

    const getDelayCommand = (config) => {
        const time = config.timeUnit === "seconds" ? config.delayTime * 1000 : config.timeUnit === "minutes" ? config.delayTime * 60 * 1000 : config.delayTime

        return `HOLD ${Math.round(time)};`
    }

    return { getBottleValveCommand, getPumpValveCommand, getSensorCommand, getSingleValveCommand, getDelayCommand }
}

//  *         - Z,1,VO,1;
//  *         - Z,1,VF,1;
//  *         - Z,1,VS,1,5;
//  *         - Z,1,VC,1,5;
//  *         - Z,1,PT,1000,500;  // pump tim
//  *         - Z,1,PL,200,500; // pump liquid vol
//  *         - Z,1,PO,500; // pump manual
//  *         - Z,1,PF; // close pump
//  *         - Z,1,SL,1,150,2000;
//  *         - Z,1,SN,1,150,2000
