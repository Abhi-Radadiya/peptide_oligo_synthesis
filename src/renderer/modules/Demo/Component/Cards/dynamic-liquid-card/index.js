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
import { DelayBlock } from "./components/nodes/delay-block.js"
import { Sidebar } from "./components/sidebar"

export default function FlowBuilder() {
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
            delayBlock: DelayBlock
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

            <div className="flex h-[92vh]">
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

const harwares = {
    amediteContainer: {
        container1: {
            bottles: [
                {
                    id: "d0225c90-35b3-4d5d-a73d-a5bb1d903c9a",
                    bottleName: "Bot1 contin1 val1",
                    valve: {
                        id: "cbcc34ae-857f-4c06-8742-8d2ad6960b32",
                        index: 1
                    }
                },
                {
                    id: "223b6985-ac34-4b11-9847-7902d1ab3f25",
                    bottleName: "Bot2 conti1 val2",
                    valve: {
                        id: "a54c9936-1ac1-4b01-a90c-43b012ed79a0",
                        index: 2
                    }
                },
                {
                    id: "241d7414-f7f2-4562-aa7e-377e8a0f9e4c",
                    bottleName: "Bort3 con1 vl3",
                    valve: {
                        id: "b52e19a9-bd4c-4215-8f1b-b0864feacc08",
                        index: 3
                    }
                },
                {
                    id: "6d3d0716-1785-48bd-a7ca-868ec4de5669",
                    bottleName: "bot4 con1 val4",
                    valve: {
                        id: "7a82a7c8-6efc-4c05-a222-fdfcdf5303a1",
                        index: 4
                    }
                },
                {
                    id: "2fdb7e6d-947a-4e44-8b17-50838b92c10e",
                    bottleName: "bottl5 con1 val5",
                    valve: {
                        id: "2d61393d-e368-47cb-9e0b-db4a464f77e7",
                        index: 5
                    }
                },
                {
                    id: "6f894a67-6524-45c4-aabd-eb6207f754ee",
                    bottleName: "bot6 cont1 val6",
                    valve: {
                        id: "baef76dc-dfc3-4c06-9141-fb2a0b1bc38c",
                        index: 6
                    }
                },
                {
                    id: "e639ec01-7722-4577-ba4d-a1a135efbcb6",
                    bottleName: "botn7 con1 val7",
                    valve: {
                        id: "74be900d-432e-46a2-9019-dff1bf05ca97",
                        index: 7
                    }
                },
                {
                    id: "1cdbcfb6-0a52-4db7-8ffd-4ce95804450c",
                    bottleName: "bott8 con1 val8",
                    valve: {
                        id: "6f8d82a6-b223-4b5c-addc-b4651fdc4b49",
                        index: 8
                    }
                },
                {
                    id: "991417dc-2822-44e4-9388-72ab305b4d3f",
                    bottleName: "bott9",
                    valve: {
                        id: "37322c7e-eac7-4b84-92e2-7f18fe3197fe",
                        index: 9
                    }
                },
                {
                    id: "da33b3ca-115f-4ab9-8352-7c1d5a459001",
                    bottleName: "bo10 con1 vla10",
                    valve: {
                        id: "4302a1b7-d059-476e-8608-016d25c4cc7e",
                        index: 10
                    }
                }
            ]
        },
        container2: {
            bottles: [
                {
                    id: "15769116-d537-449c-8970-136aafe3e8ee",
                    bottleName: "bo11 con2 vl11",
                    valve: {
                        id: "ea736c6b-8d87-49a1-8ba0-99cb03fd7d73",
                        index: 11
                    }
                },
                {
                    id: "56a93389-b8fb-4ef8-b70d-cf7b4ceb72c8",
                    bottleName: "bottl12 col2 val12",
                    valve: {
                        id: "aa7f0c8c-5645-4d08-8248-9663472efe65",
                        index: 12
                    }
                },
                {
                    id: "f76bb02b-3361-4af7-b528-ce78ac13c300",
                    bottleName: "bottl13 col2 val13",
                    valve: {
                        id: "97aea0d5-9752-4b43-b59e-925e0747e441",
                        index: 13
                    }
                },
                {
                    id: "fd2594cb-36b9-44c6-8ac8-2db2a10d353c",
                    bottleName: "bottl14 col2 val14",
                    valve: {
                        id: "b50fc79a-4384-46d0-9b2c-b5fce89fc0bd",
                        index: 14
                    }
                },
                {
                    id: "6be94a75-d538-42d9-b4a5-d154ec6a8c6a",
                    bottleName: "bottl15 col2 val15",
                    valve: {
                        id: "79cd2498-4131-4968-9290-fa7fcc37a6da",
                        index: 15
                    }
                },
                {
                    id: "8a190969-4251-4969-b4b3-a8a2b03c06a9",
                    bottleName: "bottl16 col2 val16",
                    valve: {
                        id: "35628ac2-52cc-4d32-bf0d-b8b877ba5a2e",
                        index: 16
                    }
                },
                {
                    id: "550d20d9-40fb-4ffc-aec4-0a33c8d4d5ea",
                    bottleName: "bottl17 col2 val17",
                    valve: {
                        id: "6351e77f-d271-4c34-95cb-647b29644168",
                        index: 17
                    }
                },
                {
                    id: "515167c0-cd07-415e-9f02-e52e8c3f2842",
                    bottleName: "bottl18 col2 val18",
                    valve: {
                        id: "4605232c-bff1-4032-ae19-f11add40880e",
                        index: 18
                    }
                }
            ]
        },
        container3: {
            bottles: [
                {
                    id: "c3d502b3-d4e0-47b6-afad-f79cb46e84e4",
                    bottleName: "bottl19 col3 val19",
                    valve: {
                        id: "3d575375-82ae-46e6-b4b2-54985055edb9",
                        index: 19
                    }
                },
                {
                    id: "4e28564e-faa9-41a4-ad48-a20b164a4b33",
                    bottleName: "bottl20 col2 val20",
                    valve: {
                        id: "30349f3f-992b-4c09-ae52-ef576b64c7d7",
                        index: 20
                    }
                },
                {
                    id: "0f6074b2-feb2-4d09-9738-4ac45f99a183",
                    bottleName: "bottl21 col2 val21",
                    valve: {
                        id: "cb33ac9a-6e5c-4f02-826d-5584c340826f",
                        index: 21
                    }
                },
                {
                    id: "4d10aebe-63db-4228-97f3-ee9601867685",
                    bottleName: "bottl22 col2 val22",
                    valve: {
                        id: "6b01b80e-bcbd-414b-8927-de1af0b371eb",
                        index: 22
                    }
                },
                {
                    id: "67a1e6d9-58e3-40cf-aeb7-08b2fe443b50",
                    bottleName: "bottl23 col2 val23",
                    valve: {
                        id: "15ed941d-9e1c-4591-9ae0-81aac59b2806",
                        index: 23
                    }
                },
                {
                    id: "27ba3aae-edfd-4363-b570-2e0524964e00",
                    bottleName: "bottl24 col2 val24",
                    valve: {
                        id: "3f36bc62-d1e7-4d99-8714-f7f742ed5ac7",
                        index: 24
                    }
                },
                {
                    id: "005e6ab5-3061-4577-b4a0-e74ee736ffa5",
                    bottleName: "bottl25 col2 val25",
                    valve: {
                        id: "728d3d37-34f2-41a5-8230-1288a62390bf",
                        index: 25
                    }
                }
            ]
        }
    },
    reagentContainer: {
        container1: {
            bottles: [
                {
                    id: "8ba7a085-81fa-493e-8614-c3dbcdd4193e",
                    bottleName: "reag1",
                    valve: {
                        id: "7731a0ac-8d0d-43b9-b985-d49ae727c1ff",
                        index: 26
                    }
                },
                {
                    id: "db71bac2-71ca-4607-8f22-cdcc4cdb3018",
                    bottleName: "reag 2",
                    valve: {
                        id: "3d4c4bbd-8676-4a38-a50b-11010fa1da48",
                        index: 27
                    }
                },
                {
                    id: "6752b9a6-2218-4faf-af1e-c3378b36cbf0",
                    bottleName: "reg4",
                    valve: {
                        id: "086f942c-233a-41c6-9e90-591768a63b15",
                        index: 28
                    }
                }
            ]
        },
        container2: {
            bottles: [
                {
                    id: "ec3920b9-77c6-4052-82a3-ecb934d16e84",
                    bottleName: "reage con2",
                    valve: {
                        id: "1633103b-49e4-4e97-a27f-4af9ba995fa1",
                        index: 64
                    }
                },
                {
                    id: "de1173e3-d1d1-4dcb-af91-c6cc8f7d4788",
                    bottleName: "reage con22",
                    valve: {
                        id: "4e89dd35-b64d-4863-ae14-cffae8bcdad4",
                        index: 43
                    }
                }
            ]
        }
    },
    wasteContainer: {
        bottles: [
            {
                id: "12e6a06e-b524-414d-8b79-a4e6b2ef968f",
                bottleName: "waste 1",
                valve: {
                    id: "c35f615f-6748-4d0b-a1e0-96a6d45d66fd",
                    index: 41
                }
            },
            {
                id: "d53f41d4-38da-4f75-bc20-16231ca01a63",
                bottleName: "waste 2",
                valve: {
                    id: "f221bb91-4b4b-4a88-a1cf-d0d412f260b3",
                    index: 35
                }
            }
        ]
    },
    otherValve: {
        topValve: {
            valve: {
                id: "4dd407d5-7385-4699-9fe1-6533d901ee04",
                index: 30
            },
            id: "b5b7a01f-4d08-46c4-b78a-98172cc533a4"
        },
        bottomValve: {
            valve: {
                id: "789a856d-842e-4590-85c1-24b6d8910c87",
                index: 42
            },
            id: "7435f36e-f167-4526-8d30-a4e651f8fb5f"
        },
        rgValve: {
            valve: {
                id: "1eb2c990-234a-4b3e-b96a-8b1dbd19aa6d",
                index: 55
            },
            id: "5e7a55f6-85c7-4cad-9954-29a63799be41"
        },
        wasteValve: {
            valve: {
                id: "8f2492d0-22b6-40f8-8664-21534bdcf831",
                index: 54
            },
            id: "8d6b6e1a-f92d-4dc5-adad-6086026aa31c"
        }
    },
    pump: [
        {
            pump: {
                pumpId: "fdf36cf6-243c-4ee2-be42-49138888e188",
                index: 1
            },
            pumpName: "njnj"
        },
        {
            pump: {
                pumpId: "49f85f2d-5773-4bde-928f-4c2770dba679",
                index: 2
            },
            pumpName: "cnj"
        },
        {
            pump: {
                pumpId: "8c6ce693-61d1-4b1c-bec1-7471efe36ab6",
                index: 3
            },
            pumpName: "ji"
        }
    ],
    sensor: [
        {
            sensor: {
                id: "f89579b1-8bbc-4a0a-aa92-5f9a9c5c6341",
                index: 2
            },
            sensorName: "b"
        },
        {
            sensor: {
                id: "5e443ae3-8a84-4931-88af-706f765ba154",
                index: 3
            },
            sensorName: "njkd"
        }
    ]
}
