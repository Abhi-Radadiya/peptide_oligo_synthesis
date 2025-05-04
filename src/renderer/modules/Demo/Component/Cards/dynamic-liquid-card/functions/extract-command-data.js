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
        const openFromValveIndex = extractedValves.findIndex((el) => el.id === config.selectedToFromBottle.from)

        if (!config?.selectedToFromBottle?.to) {
            return `${config.status === "on" ? "ZVO" : "ZVF"},${extractedValves[openFromValveIndex].index};`
        }

        const openToValveIndex = extractedValves.findIndex((el) => el.id === config.selectedToFromBottle.to)

        const arrayOfIndex = extractedValves.slice(openFromValveIndex, openToValveIndex + 1).map((el) => el.index)

        return `${config.status === "on" ? "ZVO" : "ZVF"},${arrayOfIndex.join(",")};`
    }

    const getPumpValveCommand = (config) => {
        const pumpIndex = extractedPump.find((el) => el.id === config.id)?.index

        if (config.controlMode !== "liquidVolume") {
            return `ZPT,${config.time},${config.rpm};`
            /** below is code where user pump index is passed */
            // return `ZPT,${pumpIndex},${config.time},${config.rpm};`
        }

        return `ZPL,${config.liquidVolume},${config.rpm};`
        // return `ZPL,${pumpIndex},${config.liquidVolume},${config.rpm};`
    }

    const getSensorCommand = (config) => {
        const sensorIndex = extractedSensor.find((el) => el.id === config.id)?.index
        const time = config.timeUnit === "seconds" ? config.time * 1000 : config.timeUnit === "minutes" ? config.time * 60 * 1000 : config.time

        return `${config.status === "on" ? "ZSL" : "ZSN"},${sensorIndex},${config.threshold * 100},${time};`
    }

    const getSingleValveCommand = (config) => {
        return `${config.status === "on" ? "ZVO" : "ZVF"},${extractedValves.find((el) => el.id === config.id).index};`
    }

    const getDelayCommand = (config) => {
        const time = config.timeUnit === "seconds" ? config.delayTime * 1000 : config.timeUnit === "minutes" ? config.delayTime * 60 * 1000 : config.delayTime
        return `HOLD ${time};`
    }

    return { getBottleValveCommand, getPumpValveCommand, getSensorCommand, getSingleValveCommand, getDelayCommand }
}
