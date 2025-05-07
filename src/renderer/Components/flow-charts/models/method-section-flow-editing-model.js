import React, { useCallback, useEffect, useMemo } from "react"
import ModelWrapper from "../../Model/ModelWrapper"
import { useSelector } from "react-redux"
import ReactFlow, { Background, Controls, useEdgesState, useNodesState } from "reactflow"
import BottleNode from "../../../modules/Demo/Component/Cards/dynamic-liquid-card/components/nodes/bottles"
import { PumpNode } from "../../../modules/Demo/Component/Cards/dynamic-liquid-card/components/nodes/pump"
import { ValveNode } from "../../../modules/Demo/Component/Cards/dynamic-liquid-card/components/nodes/valve"
import { SensorNode } from "../../../modules/Demo/Component/Cards/dynamic-liquid-card/components/nodes/sensor"
import { WasteValveNode } from "../../../modules/Demo/Component/Cards/dynamic-liquid-card/components/nodes/waste-valve"
import { DelayBlock } from "../../../modules/Demo/Component/Cards/dynamic-liquid-card/components/nodes/delay-block"
import { ColumnNode } from "../../../modules/Demo/Component/Cards/dynamic-liquid-card/components/nodes/column-node"
import { Button } from "../../Buttons/Buttons"
import { Save } from "lucide-react"
import { useExtractCommandData } from "../../../modules/Demo/Component/Cards/dynamic-liquid-card/functions/extract-command-data"
import { useFormContext } from "react-hook-form"

export default function MethodSectionFlowEditingModel(props) {
    const { onClose, editingFlow, onSave } = props

    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    // Define custom node types
    const nodeTypes = useMemo(
        () => ({
            bottleNode: BottleNode,
            pumpNode: PumpNode,
            valveNode: ValveNode,
            sensorNode: SensorNode,
            wasteValveNode: WasteValveNode,
            delayBlock: DelayBlock,
            columnNode: ColumnNode
        }),
        []
    )

    const currentProcedure = useSelector((state) => state.synthesisProcedure.savedProcedures)

    const updateNodeConfig = useCallback(
        (nodeId, newConfigData) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        // Ensure data and config exist before merging
                        const currentData = node.data || {}
                        const currentConfig = currentData.config || {}
                        return {
                            ...node,
                            data: {
                                ...currentData, // Preserve other data like name, updateNodeConfig itself
                                config: { ...currentConfig, ...newConfigData } // Merge new config
                            }
                        }
                    }
                    return node
                })
            )
        },
        [setNodes]
    )

    const { watch } = useFormContext()

    const initiateFlow = () => {
        if (!!watch(editingFlow.synthesisProcedureName)?.procedure) {
            const loadedProcedure = watch(editingFlow.synthesisProcedureName)?.procedure

            const nodesWithFunctions = loadedProcedure?.nodes?.map((node) => ({
                ...node,
                data: {
                    ...node.data, // Keep loaded config, name etc.
                    updateNodeConfig: updateNodeConfig // Add function back
                }
            }))

            setNodes(nodesWithFunctions)

            setEdges(loadedProcedure.edges || [])

            return
        }

        const loadedProcedure = currentProcedure.find((el) => el.id == editingFlow.id)

        const nodesWithFunctions = loadedProcedure?.nodes?.map((node) => ({
            ...node,
            data: {
                ...node.data, // Keep loaded config, name etc.
                updateNodeConfig: updateNodeConfig // Add function back
            }
        }))
        setNodes(nodesWithFunctions)
        setEdges(loadedProcedure.edges || []) // Load edges
    }

    useEffect(() => {
        initiateFlow()
    }, [setNodes, setEdges])

    const { getBottleValveCommand, getPumpValveCommand, getSensorCommand, getSingleValveCommand, getDelayCommand } = useExtractCommandData()

    const generateCommands = (original) => {
        const { nodes, edges } = original

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

    const handleSave = () => {
        const cleanedNodes = nodes.map((node) => {
            const { updateNodeConfig, deleteNode, ...restOfData } = node.data // Remove both functions
            return {
                ...node,
                data: { ...restOfData }
            }
        })

        const flowDataToSave = {
            nodes: cleanedNodes,
            edges: edges,
            commands: generateCommands({ nodes: cleanedNodes, edges: edges })
        }

        onSave(flowDataToSave)
        onClose()
    }

    return (
        <>
            <ModelWrapper header="Edit Synthesis Parameter" width="w-[80vw] max-h-[90vh] h-full" onClose={onClose} hasOutsideClick={false}>
                <div className="flex flex-row items-center gap-4 mb-4">
                    <Button label="Save" leftIcon={<Save />} onClick={handleSave} />
                    <Button label="Cancel" onClick={onClose} />
                </div>

                <div className="flex-grow h-[72vh] bg-gradient-to-br from-gray-50 to-gray-200 border border-neutral-500 rounded-lg">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={() => {}}
                        nodeTypes={nodeTypes}
                        fitView
                        fitViewOptions={{ padding: 0.1 }} // Add some padding on fitView
                        attributionPosition="bottom-left" // Move React Flow attribution
                    >
                        <Controls className="bg-white shadow-lg rounded-md border border-gray-200 p-1" />

                        <Background variant="dots" gap={16} size={0.8} color="#a1a1aa" />
                    </ReactFlow>
                </div>
            </ModelWrapper>
        </>
    )
}
