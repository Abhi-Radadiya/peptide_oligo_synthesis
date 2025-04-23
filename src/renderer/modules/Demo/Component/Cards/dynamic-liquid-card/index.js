import React, { useState, useCallback, useMemo } from "react"
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
import { Sidebar } from "./components/sidebar"

// Your initial component data structure (same as in your question)
const initialAvailableData = {
    blocks: [
        {
            id: "block-uuid-1",
            name: "Amedite 1",
            bottles: [
                { id: "bottle-uuid-1a", name: "Reagent A", index: 1 },
                { id: "bottle-uuid-1b", name: "Buffer B", index: 2 },
                { id: "bottle-uuid-1c", name: "Wash Solution", index: 3 }
            ]
        },
        {
            id: "block-uuid-2",
            name: "Amedite 2",
            bottles: [
                { id: "bottle-uuid-2a", name: "Sample Input", index: 1 },
                { id: "bottle-uuid-2b", name: "DI Water", index: 2 }
            ]
        }
    ],
    valves: [
        { name: "Main Inlet Valve", id: "valve-uuid-1" },
        { name: "Selector Valve", id: "valve-uuid-2" },
        { name: "Output Valve", id: "valve-uuid-3" }
    ],
    pumps: [
        { name: "Peristaltic Pump 1", id: "pump-uuid-1" },
        { name: "Syringe Pump", id: "pump-uuid-2" }
    ],
    liquidSensor: [
        { name: "Optical Sensor LS1", id: "ls-uuid-1" },
        { name: "Conductivity Sensor LS2", id: "ls-uuid-2" }
    ],
    wasteValve: [
        { name: "Waste Output 1", id: "waste-uuid-1" },
        { name: "Waste Output 2", id: "waste-uuid-2" }
    ]
}

export default function FlowBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [availableData] = useState(initialAvailableData)

    // Define custom node types
    const nodeTypes = useMemo(
        () => ({
            bottleNode: BottleNode,
            pumpNode: PumpNode,
            valveNode: ValveNode,
            sensorNode: SensorNode,
            wasteValveNode: WasteValveNode
        }),
        []
    )

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

        // Log the structured data as a pretty-printed JSON string to the console
        console.log("-------------------- FLOW STATE --------------------")
        console.log(JSON.stringify(flowData, null, 2)) // null, 2 for pretty printing
        console.log("----------------------------------------------------")

        // You can add further actions here, like sending data to an API
        // or triggering a download.
    }, [nodes, edges]) // Function depends on the current nodes and edges

    return (
        <>
            <button onClick={handleLogFlow}>Log Flow to Console</button>

            <div className="flex h-[80vh]">
                {/* Sidebar */}
                <Sidebar availableData={availableData} onAddNode={addNode} />
                {/* React Flow Canvas */}
                <div className="flex-grow h-full bg-gradient-to-br from-gray-50 to-gray-200">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
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
