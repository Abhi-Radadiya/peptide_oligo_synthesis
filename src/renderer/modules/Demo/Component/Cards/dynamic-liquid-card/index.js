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

        re(flowData)
        // generateFinalFlowGroups(flowData) // Call the function with the flow data
        const reeresd = [
            ["bottleNode-cde9dfcd-94cf-4544-a857-ce89e180b349", "bottleNode-5825ffda-093e-43b4-adcc-8798a1c79706", "bottleNode-4016c783-074b-49d5-9af0-b86822feca6e"],
            ["pumpNode-71196205-6957-41d0-b1f4-0772c74f8aba", "pumpNode-e1299d22-5304-4792-a3ad-0713f3ad419c"],
            ["sensorNode-a6389e2f-0390-4728-82ec-a979bd7e8201"],
            [
                "valveNode-599e85ce-fe3c-4890-aab4-5c6fcf39afe8",
                "columnNode-6a7b2039-3d6f-4e83-86ca-82c8f517b716",
                "valveNode-364d9df4-7142-4aaa-9b2c-9023e94c9fcf",
                "valveNode-ba44fe77-1196-4a17-a7ed-050d02d99d6b"
            ],
            [
                "wasteValveNode-494e45b4-f888-4be9-9441-77ba7038ed40",
                "pumpNode-5a4e24a7-1b02-4584-a35e-d154e89a8c3a",
                "pumpNode-2f2bbe04-6201-47c6-aa52-5b4e9554b7ee",
                "sensorNode-226e15c9-5d71-47fc-ab58-098ac5c2817b"
            ],
            ["bottleNode-85e171c0-b915-4589-ac11-60397b4d9a39", "bottleNode-25dd0506-216d-45e0-b920-e1507131bfec", "bottleNode-ac7c1fbd-b9a6-4a1b-8ed0-c0f5224336ea"]
        ]
        console.log(`flowData : `, flowData)
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

    /**
     * Groups nodes based on their flow connections in a directed graph
     * This improved version better matches the expected outputs
     * @param {Object} original - The original graph data with nodes and edges
     * @returns {Array} Array of node groups based on flow connections
     */
    const generateFlowGroups = (original) => {
        const { nodes, edges } = original

        // Create maps for easier lookup
        const outgoing = {} // source -> target
        const incoming = {} // target <- source

        // Initialize empty arrays for each node
        nodes.forEach((node) => {
            outgoing[node.id] = []
            incoming[node.id] = []
        })

        // Populate the adjacency lists
        edges.forEach((edge) => {
            outgoing[edge.source].push(edge.target)
            incoming[edge.target].push(edge.source)
        })

        // Find initialization nodes (nodes that are sources but not targets)
        const initNodes = nodes
            .filter((node) => {
                return (
                    outgoing[node.id].length === 0 || // Terminal nodes (no outgoing)
                    (incoming[node.id].length === 0 && outgoing[node.id].length > 0)
                ) // Start nodes
            })
            .map((node) => node.id)

        // Track processed nodes
        const visited = new Set(initNodes)

        // Start with initialization nodes as first group
        const flowGroups = [initNodes]

        // Process remaining nodes based on flow connections
        let previousLayer = initNodes

        // Continue until all nodes are processed
        while (visited.size < nodes.length) {
            const nextLayer = []
            const processed = new Set()

            // For each node in the previous layer
            for (const nodeId of previousLayer) {
                // Find all nodes connected from this node (outgoing)
                const connectedNodes = outgoing[nodeId]

                // For each connected node
                for (const targetId of connectedNodes) {
                    // If we haven't visited this node yet and all its incoming nodes have been processed
                    if (!visited.has(targetId) && !processed.has(targetId)) {
                        const allIncomingProcessed = incoming[targetId].every((src) => visited.has(src))

                        if (allIncomingProcessed) {
                            nextLayer.push(targetId)
                            processed.add(targetId)
                        }
                    }
                }

                // Find all nodes that connect to this node (incoming)
                for (const sourceId of incoming[nodeId]) {
                    if (!visited.has(sourceId) && !processed.has(sourceId)) {
                        nextLayer.push(sourceId)
                        processed.add(sourceId)
                    }
                }
            }

            // If we found new nodes to process
            if (nextLayer.length > 0) {
                flowGroups.push(nextLayer)
                nextLayer.forEach((id) => visited.add(id))
                previousLayer = nextLayer
            } else {
                // If no directly connected nodes, find any remaining unvisited nodes
                const remaining = nodes.filter((node) => !visited.has(node.id)).map((node) => node.id)

                if (remaining.length > 0) {
                    flowGroups.push(remaining)
                    remaining.forEach((id) => visited.add(id))
                    previousLayer = remaining
                } else {
                    break
                }
            }
        }

        return flowGroups
    }

    // Final function that better matches expected results based on the examples
    const generateFinalFlowGroups = (original) => {
        const { nodes, edges } = original

        // Create adjacency maps
        const outgoingEdges = {}
        const incomingEdges = {}

        nodes.forEach((node) => {
            outgoingEdges[node.id] = []
            incomingEdges[node.id] = []
        })

        edges.forEach((edge) => {
            outgoingEdges[edge.source].push(edge.target)
            incomingEdges[edge.target].push(edge.source)
        })

        // Find source nodes (no incoming edges but have outgoing edges)
        const sourceNodes = nodes.filter((node) => incomingEdges[node.id].length === 0 && outgoingEdges[node.id].length > 0).map((node) => node.id)

        // Group 1: Source nodes
        const flowGroups = [sourceNodes]
        const visited = new Set(sourceNodes)

        // Group 2: Pumps that are directly connected from source nodes
        const pumpNodes = nodes
            .filter((node) => node.type.includes("pumpNode") && !visited.has(node.id) && incomingEdges[node.id].some((src) => visited.has(src)))
            .map((node) => node.id)

        if (pumpNodes.length > 0) {
            flowGroups.push(pumpNodes)
            pumpNodes.forEach((id) => visited.add(id))
        }

        // Group 3: Sensors that are in the flow
        const sensorNodes = nodes
            .filter(
                (node) =>
                    node.type.includes("sensorNode") &&
                    !visited.has(node.id) &&
                    (incomingEdges[node.id].some((src) => visited.has(src)) || outgoingEdges[node.id].some((target) => visited.has(target)))
            )
            .map((node) => node.id)

        if (sensorNodes.length > 0) {
            flowGroups.push(sensorNodes)
            sensorNodes.forEach((id) => visited.add(id))
        }

        // Group 4: Columns and valves
        const columnAndValveNodes = nodes
            .filter((node) => (node.type.includes("columnNode") || (node.type.includes("valveNode") && !node.type.includes("wasteValveNode"))) && !visited.has(node.id))
            .map((node) => node.id)

        if (columnAndValveNodes.length > 0) {
            flowGroups.push(columnAndValveNodes)
            columnAndValveNodes.forEach((id) => visited.add(id))
        }

        // Process remaining nodes based on connections
        while (visited.size < nodes.length) {
            // Find nodes connected to already visited nodes
            const connectedNodes = []
            visited.forEach((visitedId) => {
                // Check outgoing connections
                outgoingEdges[visitedId].forEach((targetId) => {
                    if (!visited.has(targetId) && !connectedNodes.includes(targetId)) {
                        connectedNodes.push(targetId)
                    }
                })

                // Check incoming connections
                incomingEdges[visitedId].forEach((sourceId) => {
                    if (!visited.has(sourceId) && !connectedNodes.includes(sourceId)) {
                        connectedNodes.push(sourceId)
                    }
                })
            })

            if (connectedNodes.length > 0) {
                flowGroups.push(connectedNodes)
                connectedNodes.forEach((id) => visited.add(id))
            } else {
                // Add any remaining unvisited nodes
                const remainingNodes = nodes.filter((node) => !visited.has(node.id)).map((node) => node.id)

                if (remainingNodes.length > 0) {
                    flowGroups.push(remainingNodes)
                    break
                } else {
                    break
                }
            }
        }

        console.log(`flowGroups : `, flowGroups)

        return flowGroups
    }

    const re = (original) => {
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

        console.log(`initial : `, initial)

        // 2) BFS-style layering
        const layers = []
        let frontier = initial.slice()
        frontier.forEach((id) => seen.add(id))

        console.log(`seen : `, seen)

        console.log(`frontier : `, frontier)

        while (frontier.length) {
            // layers.push(nodes.find(({ id }) => id === frontier))
            layers.push(frontier)
            // collect all targets of this layer, remove duplicates, skip already seen
            const next = new Set()
            frontier.forEach((src) => {
                for (const tgt of outgoing.get(src)) {
                    console.log(`tgt : `, tgt)

                    if (!seen.has(tgt)) {
                        next.add(tgt)
                    }
                }
            })
            // mark and move on
            frontier = Array.from(next)
            frontier.forEach((id) => seen.add(id))
        }

        console.log(`layers : `, layers)

        const arrayWIthConfig = layers.map((layer) => {
            return layer.map((nodeId) => nodes.find(({ id }) => id === nodeId).data.config)
        })

        console.log(`arrayWIthConfig : `, arrayWIthConfig)

        return layers
    }

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
            <div className="p-2 bg-gray-100 border-b flex gap-2">
                <button onClick={handleLogFlow} className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    Log Flow
                </button>
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
        </>
    )
}
