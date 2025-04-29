const dat = {
    nodes: [
        {
            id: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2",
            type: "bottleNode",
            data: {
                config: {
                    status: "on",
                    isRangeSelection: true,
                    selectedBlock: "amedite2",
                    selectedToFromBottle: {
                        from: "56a93389-b8fb-4ef8-b70d-cf7b4ceb72c8",
                        to: "6be94a75-d538-42d9-b4a5-d154ec6a8c6a"
                    }
                }
            }
        },
        {
            id: "valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898",
            type: "valveNode",
            data: {
                name: "Bottom Valve",
                originalId: "7435f36e-f167-4526-8d30-a4e651f8fb5f",
                config: {
                    status: "on"
                }
            }
        },
        {
            id: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c",
            type: "valveNode",
            data: {
                name: "RG Valve",
                originalId: "5e7a55f6-85c7-4cad-9954-29a63799be41",
                config: {
                    status: "on"
                }
            }
        },
        {
            id: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202",
            type: "valveNode",
            data: {
                name: "Waste Valve",
                originalId: "8d6b6e1a-f92d-4dc5-adad-6086026aa31c",
                config: {
                    status: "on"
                }
            }
        },
        {
            id: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522",
            type: "pumpNode",
            data: {
                name: "Pump2",
                config: {
                    status: "on",
                    flowRate: 200,
                    controlMode: "rpm",
                    rpm: 600
                }
            }
        },
        {
            id: "sensorNode-444dd4c2-c41d-41ec-b311-91bca80c27ab",
            type: "sensorNode",
            data: {
                name: "liquid sensor 1",
                originalId: "f89579b1-8bbc-4a0a-aa92-5f9a9c5c6341",
                config: {
                    timeUnit: "minutes",
                    time: 120,
                    threshold: 1.2,
                    status: "on"
                }
            }
        },
        {
            id: "sensorNode-04a0f9c6-efb1-47d2-bcdb-000f43502860",
            type: "sensorNode",
            data: {
                name: "Liquid Sensor 2",
                originalId: "5e443ae3-8a84-4931-88af-706f765ba154",
                config: {
                    timeUnit: "milliSeconds",
                    time: 12000
                }
            }
        },
        {
            id: "delayBlock-f914e536-3dce-4557-8dbf-7af4ae64a6ef",
            type: "delayBlock",
            data: {
                config: {}
            }
        }
    ],
    edges: [
        {
            source: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2",
            sourceHandle: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2-source",
            target: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522",
            targetHandle: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522-target",
            animated: true,
            style: {},
            id: "reactflow__edge-bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2-source-pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522-target"
        },
        {
            source: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c",
            sourceHandle: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c-source",
            target: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2",
            targetHandle: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2-target",
            animated: true,
            style: {},
            id: "reactflow__edge-valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52cvalveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c-source-bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2-target"
        },
        {
            source: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202",
            sourceHandle: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202-source",
            target: "valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898",
            targetHandle: "valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898-target",
            animated: true,
            style: {},
            id: "reactflow__edge-valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202-source-valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898-target"
        },
        {
            source: "valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898",
            sourceHandle: "valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898-source",
            target: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522",
            targetHandle: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522-target",
            animated: true,
            style: {},
            id: "reactflow__edge-valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898-source-pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522-target"
        },
        {
            source: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c",
            sourceHandle: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c-source",
            target: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522",
            targetHandle: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522-target",
            animated: true,
            style: {},
            id: "reactflow__edge-valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52cvalveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c-source-pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522-target"
        },
        {
            source: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c",
            sourceHandle: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c-source",
            target: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202",
            targetHandle: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202-target",
            animated: true,
            style: {},
            id: "reactflow__edge-valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52cvalveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c-source-valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202-target"
        },
        {
            source: "sensorNode-444dd4c2-c41d-41ec-b311-91bca80c27ab",
            sourceHandle: "sensorNode-444dd4c2-c41d-41ec-b311-91bca80c27ab-source",
            target: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202",
            targetHandle: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202-target",
            animated: true,
            style: {},
            id: "reactflow__edge-sensorNode-444dd4c2-c41d-41ec-b311-91bca80c27absensorNode-444dd4c2-c41d-41ec-b311-91bca80c27ab-source-valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202-target"
        },
        {
            source: "delayBlock-f914e536-3dce-4557-8dbf-7af4ae64a6ef",
            sourceHandle: "delayBlock-f914e536-3dce-4557-8dbf-7af4ae64a6ef-source",
            target: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2",
            targetHandle: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2-target",
            animated: true,
            style: {},
            id: "reactflow__edge-delayBlock-f914e536-3dce-4557-8dbf-7af4ae64a6efdelayBlock-f914e536-3dce-4557-8dbf-7af4ae64a6ef-source-bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2-target"
        },
        {
            source: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2",
            sourceHandle: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2-source",
            target: "sensorNode-04a0f9c6-efb1-47d2-bcdb-000f43502860",
            targetHandle: "sensorNode-04a0f9c6-efb1-47d2-bcdb-000f43502860-target",
            animated: true,
            style: {},
            id: "reactflow__edge-bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2-source-sensorNode-04a0f9c6-efb1-47d2-bcdb-000f43502860sensorNode-04a0f9c6-efb1-47d2-bcdb-000f43502860-target"
        }
    ],
    timestamp: "2025-04-29T18:12:52.735Z"
}

const rer = {
    initializeNodes: [
        {
            id: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c",
            type: "valveNode",
            position: {
                x: -299.8838448879173,
                y: 388.6460150617421
            },
            data: {
                name: "RG Valve",
                originalId: "5e7a55f6-85c7-4cad-9954-29a63799be41",
                config: {
                    status: "on"
                }
            },
            width: 208,
            height: 75,
            selected: false,
            positionAbsolute: {
                x: -299.8838448879173,
                y: 388.6460150617421
            },
            dragging: false
        },
        {
            id: "sensorNode-444dd4c2-c41d-41ec-b311-91bca80c27ab",
            type: "sensorNode",
            position: {
                x: -359.1355046479232,
                y: 57.34165828710434
            },
            data: {
                name: "liquid sensor 1",
                originalId: "f89579b1-8bbc-4a0a-aa92-5f9a9c5c6341",
                config: {
                    timeUnit: "minutes",
                    time: 120,
                    threshold: 1.2,
                    status: "on"
                }
            },
            width: 224,
            height: 288,
            selected: false,
            positionAbsolute: {
                x: -359.1355046479232,
                y: 57.34165828710434
            },
            dragging: false
        },
        {
            id: "delayBlock-f914e536-3dce-4557-8dbf-7af4ae64a6ef",
            type: "delayBlock",
            position: {
                x: -214.0091695512113,
                y: 512.4405849771231
            },
            data: {
                config: {}
            },
            width: 240,
            height: 185,
            selected: false,
            positionAbsolute: {
                x: -214.0091695512113,
                y: 512.4405849771231
            },
            dragging: false
        }
    ],
    endNodes: [
        {
            id: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522",
            type: "pumpNode",
            position: {
                x: 798.2419988027609,
                y: 154.8721277259673
            },
            data: {
                name: "Pump2",
                config: {
                    status: "on",
                    flowRate: 200,
                    controlMode: "rpm",
                    rpm: 600
                }
            },
            width: 240,
            height: 162,
            selected: false,
            positionAbsolute: {
                x: 798.2419988027609,
                y: 154.8721277259673
            },
            dragging: false
        },
        {
            id: "sensorNode-04a0f9c6-efb1-47d2-bcdb-000f43502860",
            type: "sensorNode",
            position: {
                x: 744.2550145901045,
                y: 468.63092902885114
            },
            data: {
                name: "Liquid Sensor 2",
                originalId: "5e443ae3-8a84-4931-88af-706f765ba154",
                config: {
                    timeUnit: "milliSeconds",
                    time: 12000
                }
            },
            width: 224,
            height: 288,
            selected: false,
            positionAbsolute: {
                x: 744.2550145901045,
                y: 468.63092902885114
            },
            dragging: false
        }
    ],
    flow: [
        [
            {
                from: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c",
                to: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2"
            },
            {
                from: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2",
                to: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522"
            },
            {
                from: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2",
                to: "sensorNode-04a0f9c6-efb1-47d2-bcdb-000f43502860"
            },
            {
                from: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c",
                to: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522"
            },
            {
                from: "valveNode-a40d3d58-bd5b-4527-a1a5-d80b7f66e52c",
                to: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202"
            },
            {
                from: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202",
                to: "valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898"
            },
            {
                from: "valveNode-fcbaf108-ba8e-4fb8-a0ee-b4acd54bb898",
                to: "pumpNode-7e081366-eae7-401d-8dbb-d6765e52a522"
            }
        ],
        [
            {
                from: "sensorNode-444dd4c2-c41d-41ec-b311-91bca80c27ab",
                to: "valveNode-f3b38dfe-8cef-481e-9bc1-f34e32faa202"
            }
        ],
        [
            {
                from: "delayBlock-f914e536-3dce-4557-8dbf-7af4ae64a6ef",
                to: "bottleNode-6aec9528-bc3f-42b5-a8f0-52bf678eafc2"
            }
        ]
    ]
}
