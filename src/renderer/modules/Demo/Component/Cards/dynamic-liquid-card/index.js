import React, { useCallback, useMemo, useEffect, useState } from "react"
import "./index.css" // Import Tailwind CSS
import ReactFlow, {
    addEdge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MiniMap // Optional: Add MiniMap
} from "reactflow"
import "reactflow/dist/style.css" // Base styles
import { v4 as uuidv4 } from "uuid"
import BottleNode from "./components/nodes/bottles"
import { PumpNode } from "./components/nodes/pump"
import { ValveNode } from "./components/nodes/valve"
import { SensorNode } from "./components/nodes/sensor"
import { WasteValveNode } from "./components/nodes/waste-valve"
import { DelayBlock } from "./components/nodes/delay-block"
import { ColumnNode } from "./components/nodes/column-node"
import { Sidebar } from "./components/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { addSynthesisProcedure, clearCurrentFlow, selectCurrentProcedureData, updateSynthesisProcedure } from "../../../../../../redux/reducers/synthesis-procedure"
import { Input } from "../../../../../Components/Input/Input"
import { useExtractCommandData } from "./functions/extract-command-data"
import CommandModel from "./models/command-model"

export default function FlowBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const dispatch = useDispatch() // Get dispatch function

    const { generateCommands } = useExtractCommandData()

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

    const currentProcedure = useSelector(selectCurrentProcedureData)

    const selectedProcedureId = useSelector((state) => state.synthesisProcedure.currentlyLoadedId)

    // Callback for connecting nodes
    const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { strokeWidth: 2 } }, eds)), [setEdges])

    // Function to update node data (passed to custom nodes)
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

    // --- Function to delete a node and its connected edges by ID ---
    const deleteNodeById = useCallback(
        (nodeIdToRemove) => {
            console.log(`Deleting node: ${nodeIdToRemove}`)

            // Update nodes: Filter out the node with the matching ID
            setNodes((currentNodes) => currentNodes.filter((node) => node.id !== nodeIdToRemove))

            // Update edges: Filter out edges connected to the removed node
            setEdges((currentEdges) => currentEdges.filter((edge) => edge.source !== nodeIdToRemove && edge.target !== nodeIdToRemove))
        },
        [setNodes, setEdges]
    ) // Dependencies are the state setter functions

    // Function to add a new node (called from Sidebar)
    const addNode = useCallback(
        (nodeType, specificData = {}) => {
            const newNode = {
                id: `${nodeType}-${uuidv4()}`, // More descriptive ID
                type: nodeType,
                position: {
                    x: Math.random() * 400 + 100, // Avoid placing exactly at edge
                    y: Math.random() * 300 + 50
                },
                data: {
                    // Ensure initial data structure is consistent
                    config: {}, // Initialize empty config for user settings
                    ...specificData, // Include name etc. from sidebar selection
                    updateNodeConfig: updateNodeConfig, // Pass the update function,
                    deleteNode: deleteNodeById
                }
            }
            setNodes((nds) => nds.concat(newNode))
        },
        [setNodes, updateNodeConfig] // updateNodeConfig is stable due to its own useCallback
    )

    const deleteEdgeById = useCallback((edgeId) => {
        setEdges((eds) => eds.filter((edge) => edge.id !== edgeId))
    }, [])

    const handleDeleteEdge = (_, edge) => {
        deleteEdgeById(edge.id)
    }

    const handleNewFlow = () => {
        dispatch(clearCurrentFlow()) // Dispatch action to clear loaded state in Redux
        setName("")
    }

    const [name, setName] = useState("")

    const handleSaveFlow = useCallback(() => {
        // Clean nodes (remove functions) before saving
        const cleanedNodes = nodes.map((node) => {
            const { updateNodeConfig, deleteNode, ...restOfData } = node.data // Remove both functions
            return {
                ...node,
                data: { ...restOfData }
            }
        })

        const generatedCommands = generateCommands({ nodes: cleanedNodes, edges: edges })

        const flowDataToSave = {
            nodes: cleanedNodes,
            edges: edges,
            savedAt: new Date().toISOString(), // Add save timestamp
            name,
            commands: generatedCommands
        }

        !currentProcedure ? dispatch(addSynthesisProcedure(flowDataToSave)) : dispatch(updateSynthesisProcedure({ id: selectedProcedureId, updatedData: flowDataToSave }))

        setShowCommands(generatedCommands)
    }, [nodes, edges, dispatch, name]) // Dependencies

    const [showCommands, setShowCommands] = useState([])

    useEffect(() => {
        if (!!currentProcedure?.nodes) {
            console.log("Loading procedure from Redux:", currentProcedure.id, currentProcedure.name)
            // IMPORTANT: Inject functions back into loaded nodes
            const nodesWithFunctions = currentProcedure?.nodes?.map((node) => ({
                ...node,
                data: {
                    ...node.data, // Keep loaded config, name etc.
                    updateNodeConfig: updateNodeConfig, // Add function back
                    deleteNode: deleteNodeById // Add function back
                }
            }))
            setName(currentProcedure.name)
            setNodes(nodesWithFunctions)
            setEdges(currentProcedure.edges || []) // Load edges
        } else {
            console.log("Clearing flow editor (no procedure loaded).")
            setNodes([])
            setEdges([])
        }
    }, [currentProcedure, setNodes, setEdges, updateNodeConfig, deleteNodeById])

    return (
        <>
            <div className="p-2 border-b flex gap-2">
                <Input placeholder="Enter Flow Name" onChange={(flowName) => setName(flowName)} value={name} />
                <button onClick={handleNewFlow} className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    New Flow
                </button>
                <button onClick={handleSaveFlow} className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Save Current Flow
                </button>
            </div>
            {/* Add more controls here if needed */}
            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar onAddNode={addNode} />

                {/* React Flow Canvas */}
                <div className="flex-grow h-screen bg-gradient-to-br from-gray-50 to-gray-200">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        onEdgeDoubleClick={handleDeleteEdge}
                        fitView
                        fitViewOptions={{ padding: 0.1 }}
                        attributionPosition="bottom-left"
                    >
                        <Controls className="bg-white shadow-lg rounded-md border border-gray-200 p-1" />

                        <Background variant="dots" gap={16} size={0.8} color="#a1a1aa" />

                        {/* <MiniMap
                            nodeStrokeWidth={3}
                            nodeColor={(n) => {
                                switch (n.type) {
                                    case "bottleNode":
                                        return "#a855f7" // Purple
                                    case "pumpNode":
                                        return "#ec4899" // Pink
                                    case "valveNode":
                                        return "#f97316" // Orange
                                    case "sensorNode":
                                        return "#14b8a6" // Teal
                                    case "wasteValveNode":
                                        return "#ef4444" // Red
                                    case "addValve":
                                        return "#3b82f6" // Blue
                                    default:
                                        return "#6b7280" // Gray
                                }
                            }}
                        /> */}
                    </ReactFlow>
                </div>
            </div>
            <CommandModel commands={showCommands} onClose={() => setShowCommands(null)} />
        </>
    )
}
