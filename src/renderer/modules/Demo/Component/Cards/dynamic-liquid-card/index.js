import React, { useCallback, useMemo, useEffect } from "react"
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
import { getUniqueId } from "../../../../../Helpers/Constant"
// import {
//     addSynthesisProcedure,
//     selectCurrentProcedureData, // Selector for loaded data
//     clearCurrentFlow // Action to clear flow
// } from "./store/synthesisProcedureSlice" // Adjust path

export default function FlowBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const dispatch = useDispatch() // Get dispatch function

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
                    ...specificData, // Include name etc. from sidebar selection
                    config: {}, // Initialize empty config for user settings
                    updateNodeConfig: updateNodeConfig, // Pass the update function,
                    deleteNode: deleteNodeById
                }
            }
            console.log("Adding node:", newNode)
            setNodes((nds) => nds.concat(newNode))
        },
        [setNodes, updateNodeConfig] // updateNodeConfig is stable due to its own useCallback
    )

    const processNodesAndEdges = (data) => {
        const { nodes, edges } = data

        // Create maps to track sources and targets
        const sourceMap = new Map()
        const targetMap = new Map()

        // Populate the maps with edge information
        edges.forEach((edge) => {
            if (!sourceMap.has(edge.source)) {
                sourceMap.set(edge.source, [])
            }
            sourceMap.get(edge.source).push(edge.target)

            if (!targetMap.has(edge.target)) {
                targetMap.set(edge.target, [])
            }
            targetMap.get(edge.target).push(edge.source)
        })

        // Identify initialize and end nodes
        const initializeNodes = []
        const endNodes = []

        nodes.forEach((node) => {
            const nodeId = node.id
            if (sourceMap.has(nodeId) && !targetMap.has(nodeId)) {
                initializeNodes.push(node)
            }
            if (!sourceMap.has(nodeId) && targetMap.has(nodeId)) {
                endNodes.push(node)
            }
        })

        // Create a flow structure
        const flowStructure = {
            initializeNodes,
            endNodes,
            flow: []
        }

        // Build the flow from initialize to end nodes
        const visited = new Set()
        initializeNodes.forEach((initNode) => {
            const flow = []
            buildFlow(initNode.id, flow, visited, sourceMap)
            flowStructure.flow.push(flow)
        })

        return flowStructure
    }

    const buildFlow = (nodeId, flow, visited, sourceMap) => {
        if (visited.has(nodeId)) return
        visited.add(nodeId)

        const targets = sourceMap.get(nodeId) || []
        targets.forEach((targetId) => {
            flow.push({ from: nodeId, to: targetId })
            buildFlow(targetId, flow, visited, sourceMap)
        })
    }

    // --- Function to log the current flow state ---
    const handleLogFlow = useCallback(() => {
        console.log("Logging Current Flow State...")

        // **Crucial Step:** Clean the node data for logging.
        // Remove the 'updateNodeConfig' function as it cannot be JSON serialized.
        const cleanedNodes = nodes.map((node) => {
            // Destructure data, separating the function we want to omit
            // Make sure 'updateNodeConfig' is the correct name of the function in your node data
            const { updateNodeConfig, ...restOfData } = node.data
            return {
                ...node, // Keep id, type, position, etc.
                data: {
                    ...restOfData // Keep name, config, originalId, etc.
                }
            }
        })

        // Structure the data to be logged
        const flowData = {
            nodes: cleanedNodes,
            edges: edges, // Edges usually don't contain functions, so they are fine as is
            timestamp: new Date().toISOString() // Optional: Add a timestamp
        }

        // // Log the structured data as a pretty-printed JSON string to the console
        // console.log("-------------------- FLOW STATE --------------------")
        // console.log(JSON.stringify(flowData, null, 2)) // null, 2 for pretty printing
        // console.log("----------------------------------------------------")

        // Example usage
        const flowStructure = processNodesAndEdges(flowData)

        // Log the structured data as a pretty-printed JSON string to the console
        console.log("-------------------- FLOW STATE --------------------")
        console.log(JSON.stringify(flowStructure, null, 2)) // null, 2 for pretty printing
        console.log("----------------------------------------------------")

        // You can add further actions here, like sending data to an API
        // or triggering a download.
    }, [nodes, edges]) // Function depends on the current nodes and edges

    const deleteEdgeById = useCallback((edgeId) => {
        setEdges((eds) => eds.filter((edge) => edge.id !== edgeId))
    }, [])

    const handleDeleteEdge = (_, edge) => {
        deleteEdgeById(edge.id)
    }

    const handleNewFlow = () => {
        if (window.confirm("Are you sure you want to start a new flow? Any unsaved changes will be lost.")) {
            const flowName = getUniqueId()

            const cleanedNodes = nodes.map((node) => {
                const { updateNodeConfig, deleteNode, ...restOfData } = node.data // Remove both functions
                return {
                    ...node,
                    data: { ...restOfData }
                }
            })

            const flowDataToSave = {
                name: flowName,
                nodes: cleanedNodes,
                edges: edges,
                savedAt: new Date().toISOString() // Add save timestamp
            }

            dispatch(addSynthesisProcedure(flowDataToSave))

            dispatch(clearCurrentFlow()) // Dispatch action to clear loaded state in Redux
            // The useEffect above will handle clearing the nodes/edges state
        }
    }

    const handleSaveFlow = useCallback(() => {
        // Clean nodes (remove functions) before saving
        const cleanedNodes = nodes.map((node) => {
            const { updateNodeConfig, deleteNode, ...restOfData } = node.data // Remove both functions
            return {
                ...node,
                data: { ...restOfData }
            }
        })

        const flowDataToSave = {
            name: selectedProcedureId,
            nodes: cleanedNodes,
            edges: edges,
            savedAt: new Date().toISOString() // Add save timestamp
        }

        // Dispatch action to add/save the procedure
        // TODO: Add logic here later to *update* if currentProcedure exists,
        // for now, it always adds as new.

        dispatch(updateSynthesisProcedure({ id: selectedProcedureId, updatedData: flowDataToSave }))
    }, [nodes, edges, dispatch]) // Dependencies

    useEffect(() => {
        if (currentProcedure) {
            console.log("Loading procedure from Redux:", currentProcedure.id, currentProcedure.name)
            // IMPORTANT: Inject functions back into loaded nodes
            const nodesWithFunctions = currentProcedure.nodes.map((node) => ({
                ...node,
                data: {
                    ...node.data, // Keep loaded config, name etc.
                    updateNodeConfig: updateNodeConfig, // Add function back
                    deleteNode: deleteNodeById // Add function back
                }
            }))
            setNodes(nodesWithFunctions)
            setEdges(currentProcedure.edges || []) // Load edges
        } else {
            console.log("Clearing flow editor (no procedure loaded).")
            // No procedure selected in Redux, clear the canvas
            setNodes([])
            setEdges([])
        }
        // Need to include the functions in dependency array because they are recreated
        // if their own dependencies change.
    }, [currentProcedure, setNodes, setEdges, updateNodeConfig, deleteNodeById])

    return (
        <>
            <button onClick={handleLogFlow}>Log Flow to Console</button>
            <div className="p-2 bg-gray-100 border-b flex gap-2">
                <button onClick={handleNewFlow} className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    New Flow
                </button>
                <button onClick={handleSaveFlow} className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Save Current Flow
                </button>
                {/* Add more controls here if needed */}
            </div>

            <div className="flex h-[80vh] overflow-auto scrollbar-style">
                {/* Sidebar */}
                <Sidebar onAddNode={addNode} />

                {/* React Flow Canvas */}
                <div className="flex-grow h-full bg-gradient-to-br from-gray-50 to-gray-200">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        onEdgeDoubleClick={handleDeleteEdge}
                        fitView
                        fitViewOptions={{ padding: 0.1 }} // Add some padding on fitView
                        attributionPosition="bottom-left" // Move React Flow attribution
                    >
                        <Controls className="bg-white shadow-lg rounded-md border border-gray-200 p-1" />

                        <Background variant="dots" gap={16} size={0.8} color="#a1a1aa" />

                        <MiniMap
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
                        />
                    </ReactFlow>
                </div>
            </div>
        </>
    )
}
