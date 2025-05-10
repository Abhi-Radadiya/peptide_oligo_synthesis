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

    const generateCommands = (flowData) => {
        const { nodes, edges } = flowData

        // build quick source⇄targets and incoming sets
        const outgoing = new Map()
        const incoming = new Map()
        nodes.forEach((n) => {
            outgoing.set(n.id, [])
            incoming.set(n.id, new Set())
        })
        edges.forEach(({ source, target }) => {
            outgoing.get(source).push(target)
            incoming.get(target).add(source)
        })

        // 1) find initial nodes: those with outgoing edges but no incoming edges
        const seen = new Set()
        const initial = nodes.filter((n) => outgoing.get(n.id).length > 0 && incoming.get(n.id).size === 0).map((n) => n.id)

        // 2) BFS-style layering
        const layers = []
        let frontier = initial.slice()
        frontier.forEach((id) => seen.add(id))

        while (frontier.length) {
            // layers.push(nodes.find(({ id }) => id === frontier))
            layers.push(frontier)
            // collect all targets of this layer, remove duplicates, skip already seen
            const next = new Set()
            frontier.forEach((src) => {
                for (const tgt of outgoing.get(src)) {
                    if (!seen.has(tgt)) {
                        next.add(tgt)
                    }
                }
            })
            // mark and move on
            frontier = Array.from(next)
            frontier.forEach((id) => seen.add(id))
        }

        const arrayWithConfig = layers.map((layer) => {
            return layer.map((nodeId) => nodes.find(({ id }) => id === nodeId).data.config)
        })

        console.log(`arrayWithConfig : `, arrayWithConfig)

        const flatConfig = arrayWithConfig.flat()

        const command = flatConfig.map((config) => {
            switch (config.type) {
                case "bottleNode":
                    return getBottleValveCommand(config)

                case "pumpNode":
                    return getPumpValveCommand(config)

                case "sensorNode":
                    return getSensorCommand(config)

                case "valveNode":
                case "wasteValveNode":
                    return getSingleValveCommand(config)

                case "delayBlock":
                    return getDelayCommand(config)

                // TODO : add case for columnNode

                default:
                    break
            }
        })

        return command.filter(Boolean)
    }

    return { getBottleValveCommand, getPumpValveCommand, getSensorCommand, getSingleValveCommand, getDelayCommand, generateCommands }
}
