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
            return `Z,${pumpIndex},PO,${config.rpm};`
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

        const filteredData = {
            nodes: flowData.nodes.map((el) => ({ id: el.id, type: el.type })),
            edges: flowData.edges.map((el) => ({ source: el.source, target: el.target, id: el.id }))
        }

        console.log(`filteredData : `, filteredData)

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

const flow = {
    nodes: [
        {
            id: "bottleNode-d1c51bd2-e17d-4b2e-828b-324a7673bd76",
            type: "bottleNode"
        },
        {
            id: "bottleNode-9696d870-3cda-44fc-ac9f-c70ab175725a",
            type: "bottleNode"
        },
        {
            id: "valveNode-11325500-70cc-4e1e-bffc-52c5aa107ffc",
            type: "valveNode"
        },
        {
            id: "valveNode-893247dc-1fdf-408d-965d-fab81c1898ee",
            type: "valveNode"
        },
        {
            id: "valveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2d",
            type: "valveNode"
        },
        {
            id: "valveNode-0858c3a9-01d8-4d8b-b25f-c75afcc2357a",
            type: "valveNode"
        },
        {
            id: "wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922",
            type: "wasteValveNode"
        },
        {
            id: "pumpNode-5a7d3cbb-4344-430d-92ff-e03e52f9f885",
            type: "pumpNode"
        },
        {
            id: "pumpNode-97c3d87f-ce0e-4079-a4b3-f756784c1f29",
            type: "pumpNode"
        },
        {
            id: "sensorNode-beb8cbbe-93f4-4528-97d5-c2967b4606c4",
            type: "sensorNode"
        },
        {
            id: "sensorNode-b1f9fa8e-da8a-4587-ab13-7724df128c75",
            type: "sensorNode"
        },
        {
            id: "pumpNode-7ce1c336-2f23-4891-8dfd-11e8dde2de63",
            type: "pumpNode"
        },
        {
            id: "pumpNode-62773e87-0bb9-441a-839e-922eba13a9e9",
            type: "pumpNode"
        },
        {
            id: "pumpNode-3c4dda88-a90c-4f47-a0a5-780226d19ff7",
            type: "pumpNode"
        },
        {
            id: "pumpNode-3a231f21-6abb-4d45-af2d-55dd3a2f93e4",
            type: "pumpNode"
        },
        {
            id: "bottleNode-d087600e-5099-4257-90b4-e022b68b2578",
            type: "bottleNode"
        },
        {
            id: "bottleNode-2cf1adfe-0c15-49ab-909d-04cb4f2c10de",
            type: "bottleNode"
        },
        {
            id: "bottleNode-b407e1f2-32b7-47ab-b424-6494e072c549",
            type: "bottleNode"
        },
        {
            id: "bottleNode-39545819-b6bf-448d-a941-1d66448208ea",
            type: "bottleNode"
        },
        {
            id: "pumpNode-5d21a393-e410-4edc-a080-8ed16fd4068f",
            type: "pumpNode"
        },
        {
            id: "pumpNode-ee81da8b-f6b8-42e4-96ff-891eb75a21b9",
            type: "pumpNode"
        },
        {
            id: "delayBlock-7daaaac3-aa72-46ce-a7bb-cc2fec288982",
            type: "delayBlock"
        },
        {
            id: "sensorNode-fee000e7-ee73-4f52-b680-9965a106e5d3",
            type: "sensorNode"
        },
        {
            id: "sensorNode-d2617267-8d21-4b89-af98-109e421cf77e",
            type: "sensorNode"
        },
        {
            id: "sensorNode-0ace237c-9703-4aee-a857-47aed244d9b3",
            type: "sensorNode"
        },
        {
            id: "sensorNode-f9089517-fd7f-4aed-ae9e-c0d13adf03f8",
            type: "sensorNode"
        },
        {
            id: "delayBlock-75d71339-c404-4297-8ffb-7606427e02fe",
            type: "delayBlock"
        },
        {
            id: "pumpNode-6067c5f3-f9de-441c-b0d3-c3a029d1a5ba",
            type: "pumpNode"
        },
        {
            id: "pumpNode-6c52d7ef-87b6-4dc9-9fd5-99dff9e11e2a",
            type: "pumpNode"
        },
        {
            id: "bottleNode-3197cc52-ac8f-4f1f-9615-007aeba37e8e",
            type: "bottleNode"
        },
        {
            id: "bottleNode-b88ab5b9-0117-4745-a80f-6462f0980e6c",
            type: "bottleNode"
        },
        {
            id: "valveNode-76de805b-f240-45c5-b28b-a666eec08fbe",
            type: "valveNode"
        },
        {
            id: "valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185",
            type: "valveNode"
        },
        {
            id: "valveNode-5ee1b41e-ca0b-48bc-97f8-bbbc991f5e13",
            type: "valveNode"
        },
        {
            id: "wasteValveNode-9f55513f-e2c9-407a-a7a4-848561e6fd56",
            type: "wasteValveNode"
        },
        {
            id: "delayBlock-43d675af-632a-4339-980b-1ab609c12244",
            type: "delayBlock"
        },
        {
            id: "delayBlock-578cd1cf-2aca-4611-a55e-d24b0b4f5361",
            type: "delayBlock"
        },
        {
            id: "delayBlock-332f05ec-15c9-492d-886f-617804747ca9",
            type: "delayBlock"
        },
        {
            id: "delayBlock-2d97ebac-55a9-4373-ae7c-96753adfaecb",
            type: "delayBlock"
        },
        {
            id: "delayBlock-e2cd775f-ee22-4a1e-8eef-d28818e4ad01",
            type: "delayBlock"
        }
    ],
    edges: [
        {
            source: "valveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2d",
            target: "valveNode-0858c3a9-01d8-4d8b-b25f-c75afcc2357a",
            id: "reactflow__edge-valveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2dvalveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2d-source-valveNode-0858c3a9-01d8-4d8b-b25f-c75afcc2357avalveNode-0858c3a9-01d8-4d8b-b25f-c75afcc2357a-target"
        },
        {
            source: "valveNode-0858c3a9-01d8-4d8b-b25f-c75afcc2357a",
            target: "wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922",
            id: "reactflow__edge-valveNode-0858c3a9-01d8-4d8b-b25f-c75afcc2357avalveNode-0858c3a9-01d8-4d8b-b25f-c75afcc2357a-source-wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922-target"
        },
        {
            source: "wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922",
            target: "pumpNode-5a7d3cbb-4344-430d-92ff-e03e52f9f885",
            id: "reactflow__edge-wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922-source-pumpNode-5a7d3cbb-4344-430d-92ff-e03e52f9f885pumpNode-5a7d3cbb-4344-430d-92ff-e03e52f9f885-target"
        },
        {
            source: "pumpNode-7ce1c336-2f23-4891-8dfd-11e8dde2de63",
            target: "pumpNode-3c4dda88-a90c-4f47-a0a5-780226d19ff7",
            id: "reactflow__edge-pumpNode-7ce1c336-2f23-4891-8dfd-11e8dde2de63pumpNode-7ce1c336-2f23-4891-8dfd-11e8dde2de63-source-pumpNode-3c4dda88-a90c-4f47-a0a5-780226d19ff7pumpNode-3c4dda88-a90c-4f47-a0a5-780226d19ff7-target"
        },
        {
            source: "bottleNode-9696d870-3cda-44fc-ac9f-c70ab175725a",
            target: "valveNode-11325500-70cc-4e1e-bffc-52c5aa107ffc",
            id: "reactflow__edge-bottleNode-9696d870-3cda-44fc-ac9f-c70ab175725abottleNode-9696d870-3cda-44fc-ac9f-c70ab175725a-source-valveNode-11325500-70cc-4e1e-bffc-52c5aa107ffcvalveNode-11325500-70cc-4e1e-bffc-52c5aa107ffc-target"
        },
        {
            source: "valveNode-893247dc-1fdf-408d-965d-fab81c1898ee",
            target: "valveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2d",
            id: "reactflow__edge-valveNode-893247dc-1fdf-408d-965d-fab81c1898eevalveNode-893247dc-1fdf-408d-965d-fab81c1898ee-source-valveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2dvalveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2d-target"
        },
        {
            source: "bottleNode-b407e1f2-32b7-47ab-b424-6494e072c549",
            target: "pumpNode-ee81da8b-f6b8-42e4-96ff-891eb75a21b9",
            id: "reactflow__edge-bottleNode-b407e1f2-32b7-47ab-b424-6494e072c549bottleNode-b407e1f2-32b7-47ab-b424-6494e072c549-source-pumpNode-ee81da8b-f6b8-42e4-96ff-891eb75a21b9pumpNode-ee81da8b-f6b8-42e4-96ff-891eb75a21b9-target"
        },
        {
            source: "valveNode-5ee1b41e-ca0b-48bc-97f8-bbbc991f5e13",
            target: "wasteValveNode-9f55513f-e2c9-407a-a7a4-848561e6fd56",
            id: "reactflow__edge-valveNode-5ee1b41e-ca0b-48bc-97f8-bbbc991f5e13valveNode-5ee1b41e-ca0b-48bc-97f8-bbbc991f5e13-source-wasteValveNode-9f55513f-e2c9-407a-a7a4-848561e6fd56wasteValveNode-9f55513f-e2c9-407a-a7a4-848561e6fd56-target"
        },
        {
            source: "bottleNode-b88ab5b9-0117-4745-a80f-6462f0980e6c",
            target: "valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185",
            id: "reactflow__edge-bottleNode-b88ab5b9-0117-4745-a80f-6462f0980e6cbottleNode-b88ab5b9-0117-4745-a80f-6462f0980e6c-source-valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185-target"
        },
        {
            source: "valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185",
            target: "valveNode-76de805b-f240-45c5-b28b-a666eec08fbe",
            id: "reactflow__edge-valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185-source-valveNode-76de805b-f240-45c5-b28b-a666eec08fbevalveNode-76de805b-f240-45c5-b28b-a666eec08fbe-target"
        },
        {
            source: "valveNode-76de805b-f240-45c5-b28b-a666eec08fbe",
            target: "valveNode-5ee1b41e-ca0b-48bc-97f8-bbbc991f5e13",
            id: "reactflow__edge-valveNode-76de805b-f240-45c5-b28b-a666eec08fbevalveNode-76de805b-f240-45c5-b28b-a666eec08fbe-source-valveNode-5ee1b41e-ca0b-48bc-97f8-bbbc991f5e13valveNode-5ee1b41e-ca0b-48bc-97f8-bbbc991f5e13-target"
        },
        {
            source: "bottleNode-d1c51bd2-e17d-4b2e-828b-324a7673bd76",
            target: "valveNode-893247dc-1fdf-408d-965d-fab81c1898ee",
            id: "reactflow__edge-bottleNode-d1c51bd2-e17d-4b2e-828b-324a7673bd76bottleNode-d1c51bd2-e17d-4b2e-828b-324a7673bd76-source-valveNode-893247dc-1fdf-408d-965d-fab81c1898eevalveNode-893247dc-1fdf-408d-965d-fab81c1898ee-target"
        },
        {
            source: "valveNode-11325500-70cc-4e1e-bffc-52c5aa107ffc",
            target: "valveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2d",
            id: "reactflow__edge-valveNode-11325500-70cc-4e1e-bffc-52c5aa107ffcvalveNode-11325500-70cc-4e1e-bffc-52c5aa107ffc-source-valveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2dvalveNode-2a911ce5-da38-4a04-8494-a7815a6a9e2d-target"
        },
        {
            source: "pumpNode-5a7d3cbb-4344-430d-92ff-e03e52f9f885",
            target: "sensorNode-beb8cbbe-93f4-4528-97d5-c2967b4606c4",
            id: "reactflow__edge-pumpNode-5a7d3cbb-4344-430d-92ff-e03e52f9f885pumpNode-5a7d3cbb-4344-430d-92ff-e03e52f9f885-source-sensorNode-beb8cbbe-93f4-4528-97d5-c2967b4606c4sensorNode-beb8cbbe-93f4-4528-97d5-c2967b4606c4-target"
        },
        {
            source: "pumpNode-97c3d87f-ce0e-4079-a4b3-f756784c1f29",
            target: "sensorNode-b1f9fa8e-da8a-4587-ab13-7724df128c75",
            id: "reactflow__edge-pumpNode-97c3d87f-ce0e-4079-a4b3-f756784c1f29pumpNode-97c3d87f-ce0e-4079-a4b3-f756784c1f29-source-sensorNode-b1f9fa8e-da8a-4587-ab13-7724df128c75sensorNode-b1f9fa8e-da8a-4587-ab13-7724df128c75-target"
        },
        {
            source: "sensorNode-beb8cbbe-93f4-4528-97d5-c2967b4606c4",
            target: "pumpNode-7ce1c336-2f23-4891-8dfd-11e8dde2de63",
            id: "reactflow__edge-sensorNode-beb8cbbe-93f4-4528-97d5-c2967b4606c4sensorNode-beb8cbbe-93f4-4528-97d5-c2967b4606c4-source-pumpNode-7ce1c336-2f23-4891-8dfd-11e8dde2de63pumpNode-7ce1c336-2f23-4891-8dfd-11e8dde2de63-target"
        },
        {
            source: "sensorNode-b1f9fa8e-da8a-4587-ab13-7724df128c75",
            target: "pumpNode-62773e87-0bb9-441a-839e-922eba13a9e9",
            id: "reactflow__edge-sensorNode-b1f9fa8e-da8a-4587-ab13-7724df128c75sensorNode-b1f9fa8e-da8a-4587-ab13-7724df128c75-source-pumpNode-62773e87-0bb9-441a-839e-922eba13a9e9pumpNode-62773e87-0bb9-441a-839e-922eba13a9e9-target"
        },
        {
            source: "pumpNode-62773e87-0bb9-441a-839e-922eba13a9e9",
            target: "pumpNode-3a231f21-6abb-4d45-af2d-55dd3a2f93e4",
            id: "reactflow__edge-pumpNode-62773e87-0bb9-441a-839e-922eba13a9e9pumpNode-62773e87-0bb9-441a-839e-922eba13a9e9-source-pumpNode-3a231f21-6abb-4d45-af2d-55dd3a2f93e4pumpNode-3a231f21-6abb-4d45-af2d-55dd3a2f93e4-target"
        },
        {
            source: "pumpNode-3c4dda88-a90c-4f47-a0a5-780226d19ff7",
            target: "bottleNode-2cf1adfe-0c15-49ab-909d-04cb4f2c10de",
            id: "reactflow__edge-pumpNode-3c4dda88-a90c-4f47-a0a5-780226d19ff7pumpNode-3c4dda88-a90c-4f47-a0a5-780226d19ff7-source-bottleNode-2cf1adfe-0c15-49ab-909d-04cb4f2c10debottleNode-2cf1adfe-0c15-49ab-909d-04cb4f2c10de-target"
        },
        {
            source: "pumpNode-3a231f21-6abb-4d45-af2d-55dd3a2f93e4",
            target: "bottleNode-d087600e-5099-4257-90b4-e022b68b2578",
            id: "reactflow__edge-pumpNode-3a231f21-6abb-4d45-af2d-55dd3a2f93e4pumpNode-3a231f21-6abb-4d45-af2d-55dd3a2f93e4-source-bottleNode-d087600e-5099-4257-90b4-e022b68b2578bottleNode-d087600e-5099-4257-90b4-e022b68b2578-target"
        },
        {
            source: "bottleNode-2cf1adfe-0c15-49ab-909d-04cb4f2c10de",
            target: "bottleNode-39545819-b6bf-448d-a941-1d66448208ea",
            id: "reactflow__edge-bottleNode-2cf1adfe-0c15-49ab-909d-04cb4f2c10debottleNode-2cf1adfe-0c15-49ab-909d-04cb4f2c10de-source-bottleNode-39545819-b6bf-448d-a941-1d66448208eabottleNode-39545819-b6bf-448d-a941-1d66448208ea-target"
        },
        {
            source: "bottleNode-d087600e-5099-4257-90b4-e022b68b2578",
            target: "bottleNode-b407e1f2-32b7-47ab-b424-6494e072c549",
            id: "reactflow__edge-bottleNode-d087600e-5099-4257-90b4-e022b68b2578bottleNode-d087600e-5099-4257-90b4-e022b68b2578-source-bottleNode-b407e1f2-32b7-47ab-b424-6494e072c549bottleNode-b407e1f2-32b7-47ab-b424-6494e072c549-target"
        },
        {
            source: "bottleNode-39545819-b6bf-448d-a941-1d66448208ea",
            target: "pumpNode-5d21a393-e410-4edc-a080-8ed16fd4068f",
            id: "reactflow__edge-bottleNode-39545819-b6bf-448d-a941-1d66448208eabottleNode-39545819-b6bf-448d-a941-1d66448208ea-source-pumpNode-5d21a393-e410-4edc-a080-8ed16fd4068fpumpNode-5d21a393-e410-4edc-a080-8ed16fd4068f-target"
        },
        {
            source: "delayBlock-7daaaac3-aa72-46ce-a7bb-cc2fec288982",
            target: "sensorNode-d2617267-8d21-4b89-af98-109e421cf77e",
            id: "reactflow__edge-delayBlock-7daaaac3-aa72-46ce-a7bb-cc2fec288982delayBlock-7daaaac3-aa72-46ce-a7bb-cc2fec288982-source-sensorNode-d2617267-8d21-4b89-af98-109e421cf77esensorNode-d2617267-8d21-4b89-af98-109e421cf77e-target"
        },
        {
            source: "sensorNode-f9089517-fd7f-4aed-ae9e-c0d13adf03f8",
            target: "delayBlock-75d71339-c404-4297-8ffb-7606427e02fe",
            id: "reactflow__edge-sensorNode-f9089517-fd7f-4aed-ae9e-c0d13adf03f8sensorNode-f9089517-fd7f-4aed-ae9e-c0d13adf03f8-source-delayBlock-75d71339-c404-4297-8ffb-7606427e02fedelayBlock-75d71339-c404-4297-8ffb-7606427e02fe-target"
        },
        {
            source: "pumpNode-6c52d7ef-87b6-4dc9-9fd5-99dff9e11e2a",
            target: "bottleNode-3197cc52-ac8f-4f1f-9615-007aeba37e8e",
            id: "reactflow__edge-pumpNode-6c52d7ef-87b6-4dc9-9fd5-99dff9e11e2apumpNode-6c52d7ef-87b6-4dc9-9fd5-99dff9e11e2a-source-bottleNode-3197cc52-ac8f-4f1f-9615-007aeba37e8ebottleNode-3197cc52-ac8f-4f1f-9615-007aeba37e8e-target"
        },
        {
            source: "delayBlock-75d71339-c404-4297-8ffb-7606427e02fe",
            target: "pumpNode-6067c5f3-f9de-441c-b0d3-c3a029d1a5ba",
            id: "reactflow__edge-delayBlock-75d71339-c404-4297-8ffb-7606427e02fedelayBlock-75d71339-c404-4297-8ffb-7606427e02fe-source-pumpNode-6067c5f3-f9de-441c-b0d3-c3a029d1a5bapumpNode-6067c5f3-f9de-441c-b0d3-c3a029d1a5ba-target"
        },
        {
            source: "pumpNode-6067c5f3-f9de-441c-b0d3-c3a029d1a5ba",
            target: "bottleNode-b88ab5b9-0117-4745-a80f-6462f0980e6c",
            id: "reactflow__edge-pumpNode-6067c5f3-f9de-441c-b0d3-c3a029d1a5bapumpNode-6067c5f3-f9de-441c-b0d3-c3a029d1a5ba-source-bottleNode-b88ab5b9-0117-4745-a80f-6462f0980e6cbottleNode-b88ab5b9-0117-4745-a80f-6462f0980e6c-target"
        },
        {
            source: "bottleNode-3197cc52-ac8f-4f1f-9615-007aeba37e8e",
            target: "valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185",
            id: "reactflow__edge-bottleNode-3197cc52-ac8f-4f1f-9615-007aeba37e8ebottleNode-3197cc52-ac8f-4f1f-9615-007aeba37e8e-source-valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185valveNode-0241aa07-cf8c-4c36-aba8-fbcb4d239185-target"
        },
        {
            source: "pumpNode-ee81da8b-f6b8-42e4-96ff-891eb75a21b9",
            target: "delayBlock-7daaaac3-aa72-46ce-a7bb-cc2fec288982",
            id: "reactflow__edge-pumpNode-ee81da8b-f6b8-42e4-96ff-891eb75a21b9pumpNode-ee81da8b-f6b8-42e4-96ff-891eb75a21b9-source-delayBlock-7daaaac3-aa72-46ce-a7bb-cc2fec288982delayBlock-7daaaac3-aa72-46ce-a7bb-cc2fec288982-target"
        },
        {
            source: "sensorNode-fee000e7-ee73-4f52-b680-9965a106e5d3",
            target: "delayBlock-43d675af-632a-4339-980b-1ab609c12244",
            id: "reactflow__edge-sensorNode-fee000e7-ee73-4f52-b680-9965a106e5d3sensorNode-fee000e7-ee73-4f52-b680-9965a106e5d3-source-delayBlock-43d675af-632a-4339-980b-1ab609c12244delayBlock-43d675af-632a-4339-980b-1ab609c12244-target"
        },
        {
            source: "delayBlock-43d675af-632a-4339-980b-1ab609c12244",
            target: "sensorNode-f9089517-fd7f-4aed-ae9e-c0d13adf03f8",
            id: "reactflow__edge-delayBlock-43d675af-632a-4339-980b-1ab609c12244delayBlock-43d675af-632a-4339-980b-1ab609c12244-source-sensorNode-f9089517-fd7f-4aed-ae9e-c0d13adf03f8sensorNode-f9089517-fd7f-4aed-ae9e-c0d13adf03f8-target"
        },
        {
            source: "pumpNode-5d21a393-e410-4edc-a080-8ed16fd4068f",
            target: "delayBlock-578cd1cf-2aca-4611-a55e-d24b0b4f5361",
            id: "reactflow__edge-pumpNode-5d21a393-e410-4edc-a080-8ed16fd4068fpumpNode-5d21a393-e410-4edc-a080-8ed16fd4068f-source-delayBlock-578cd1cf-2aca-4611-a55e-d24b0b4f5361delayBlock-578cd1cf-2aca-4611-a55e-d24b0b4f5361-target"
        },
        {
            source: "delayBlock-578cd1cf-2aca-4611-a55e-d24b0b4f5361",
            target: "sensorNode-fee000e7-ee73-4f52-b680-9965a106e5d3",
            id: "reactflow__edge-delayBlock-578cd1cf-2aca-4611-a55e-d24b0b4f5361delayBlock-578cd1cf-2aca-4611-a55e-d24b0b4f5361-source-sensorNode-fee000e7-ee73-4f52-b680-9965a106e5d3sensorNode-fee000e7-ee73-4f52-b680-9965a106e5d3-target"
        },
        {
            source: "sensorNode-d2617267-8d21-4b89-af98-109e421cf77e",
            target: "delayBlock-2d97ebac-55a9-4373-ae7c-96753adfaecb",
            id: "reactflow__edge-sensorNode-d2617267-8d21-4b89-af98-109e421cf77esensorNode-d2617267-8d21-4b89-af98-109e421cf77e-source-delayBlock-2d97ebac-55a9-4373-ae7c-96753adfaecbdelayBlock-2d97ebac-55a9-4373-ae7c-96753adfaecb-target"
        },
        {
            source: "delayBlock-2d97ebac-55a9-4373-ae7c-96753adfaecb",
            target: "sensorNode-0ace237c-9703-4aee-a857-47aed244d9b3",
            id: "reactflow__edge-delayBlock-2d97ebac-55a9-4373-ae7c-96753adfaecbdelayBlock-2d97ebac-55a9-4373-ae7c-96753adfaecb-source-sensorNode-0ace237c-9703-4aee-a857-47aed244d9b3sensorNode-0ace237c-9703-4aee-a857-47aed244d9b3-target"
        },
        {
            source: "sensorNode-0ace237c-9703-4aee-a857-47aed244d9b3",
            target: "delayBlock-332f05ec-15c9-492d-886f-617804747ca9",
            id: "reactflow__edge-sensorNode-0ace237c-9703-4aee-a857-47aed244d9b3sensorNode-0ace237c-9703-4aee-a857-47aed244d9b3-source-delayBlock-332f05ec-15c9-492d-886f-617804747ca9delayBlock-332f05ec-15c9-492d-886f-617804747ca9-target"
        },
        {
            source: "delayBlock-332f05ec-15c9-492d-886f-617804747ca9",
            target: "pumpNode-6c52d7ef-87b6-4dc9-9fd5-99dff9e11e2a",
            id: "reactflow__edge-delayBlock-332f05ec-15c9-492d-886f-617804747ca9delayBlock-332f05ec-15c9-492d-886f-617804747ca9-source-pumpNode-6c52d7ef-87b6-4dc9-9fd5-99dff9e11e2apumpNode-6c52d7ef-87b6-4dc9-9fd5-99dff9e11e2a-target"
        },
        {
            source: "delayBlock-e2cd775f-ee22-4a1e-8eef-d28818e4ad01",
            target: "pumpNode-97c3d87f-ce0e-4079-a4b3-f756784c1f29",
            id: "reactflow__edge-delayBlock-e2cd775f-ee22-4a1e-8eef-d28818e4ad01delayBlock-e2cd775f-ee22-4a1e-8eef-d28818e4ad01-source-pumpNode-97c3d87f-ce0e-4079-a4b3-f756784c1f29pumpNode-97c3d87f-ce0e-4079-a4b3-f756784c1f29-target"
        },
        {
            source: "wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922",
            target: "delayBlock-e2cd775f-ee22-4a1e-8eef-d28818e4ad01",
            id: "reactflow__edge-wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922wasteValveNode-3d24932d-4cfd-43e4-9263-9d9cc64ef922-source-delayBlock-e2cd775f-ee22-4a1e-8eef-d28818e4ad01delayBlock-e2cd775f-ee22-4a1e-8eef-d28818e4ad01-target"
        }
    ]
}
