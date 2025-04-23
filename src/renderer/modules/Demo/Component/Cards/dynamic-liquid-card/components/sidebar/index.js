import React from "react"

export const Sidebar = ({ availableData, onAddNode }) => {
    const renderSection = (title, items, nodeType, dataExtractor) => (
        <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">{title}</h3>
            <div className="space-y-1">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onAddNode(nodeType, dataExtractor(item))}
                        className="block w-full text-left px-2 py-1 text-sm bg-white hover:bg-indigo-100 border border-gray-200 rounded shadow-sm transition-colors duration-150 ease-in-out"
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )

    return (
        <div className="w-64 h-full bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Components</h2>

            {availableData.blocks.map((block) => (
                <div key={block.id} className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">{block.name} (Bottles)</h3>
                    <div className="space-y-1">
                        {block.bottles.map((bottle) => (
                            <button
                                key={bottle.id}
                                onClick={() =>
                                    onAddNode("bottleNode", {
                                        name: bottle.name,
                                        index: bottle.index,
                                        blockName: block.name,
                                        originalId: bottle.id // Keep track of original ID if needed
                                    })
                                }
                                className="block w-full text-left px-2 py-1 text-sm bg-white hover:bg-purple-100 border border-gray-200 rounded shadow-sm transition-colors duration-150 ease-in-out"
                                title={`Add ${bottle.name} (Index: ${bottle.index})`}
                            >
                                {bottle.name} <span className="text-xs text-gray-500">({bottle.index})</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {renderSection("Valves", availableData.valves, "valveNode", (item) => ({ name: item.name, originalId: item.id }))}
            {renderSection("Pumps", availableData.pumps, "pumpNode", (item) => ({ name: item.name, originalId: item.id }))}
            {renderSection("Liquid Sensors", availableData.liquidSensor, "sensorNode", (item) => ({ name: item.name, originalId: item.id }))}
            {renderSection("Waste Valves", availableData.wasteValve, "wasteValveNode", (item) => ({ name: item.name, originalId: item.id }))}
        </div>
    )
}

const erer = {
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
