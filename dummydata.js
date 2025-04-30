Rules
1. Array initialize node which of source is connected to some node and own target is not connected to anyone
2. Start from initialize node and then goes as edges connections
3. Make parent array as flow based on edges connection
4. Node which has same index based on will be in same array

const result3 = [
    ["bottleNode-cde9dfcd-94cf-4544-a857-ce89e180b349", "bottleNode-5825ffda-093e-43b4-adcc-8798a1c79706", "bottleNode-4016c783-074b-49d5-9af0-b86822feca6e"],
    ["pumpNode-71196205-6957-41d0-b1f4-0772c74f8aba", "pumpNode-e1299d22-5304-4792-a3ad-0713f3ad419c"],
    ["sensorNode-a6389e2f-0390-4728-82ec-a979bd7e8201"],
    ["valveNode-364d9df4-7142-4aaa-9b2c-9023e94c9fcf"],
    ["columnNode-6a7b2039-3d6f-4e83-86ca-82c8f517b716"],
    [
        "sensorNode-226e15c9-5d71-47fc-ab58-098ac5c2817b",
        "pumpNode-2f2bbe04-6201-47c6-aa52-5b4e9554b7ee",
        "pumpNode-5a4e24a7-1b02-4584-a35e-d154e89a8c3a",
        "valveNode-ba44fe77-1196-4a17-a7ed-050d02d99d6b"
    ],
    [
        "bottleNode-85e171c0-b915-4589-ac11-60397b4d9a39",
        "bottleNode-25dd0506-216d-45e0-b920-e1507131bfec",
        "bottleNode-ac7c1fbd-b9a6-4a1b-8ed0-c0f5224336ea",
        "valveNode-599e85ce-fe3c-4890-aab4-5c6fcf39afe8"
    ],
    ["wasteValveNode-494e45b4-f888-4be9-9441-77ba7038ed40"]
]

const original3 = {
    nodes: [
        {
            id: "bottleNode-cde9dfcd-94cf-4544-a857-ce89e180b349",
            type: "bottleNode"
        },
        {
            id: "sensorNode-a6389e2f-0390-4728-82ec-a979bd7e8201",
            type: "sensorNode"
        },
        {
            id: "pumpNode-71196205-6957-41d0-b1f4-0772c74f8aba",
            type: "pumpNode"
        },
        {
            id: "pumpNode-e1299d22-5304-4792-a3ad-0713f3ad419c",
            type: "pumpNode"
        },
        {
            id: "bottleNode-5825ffda-093e-43b4-adcc-8798a1c79706",
            type: "bottleNode"
        },
        {
            id: "valveNode-599e85ce-fe3c-4890-aab4-5c6fcf39afe8",
            type: "valveNode"
        },
        {
            id: "wasteValveNode-494e45b4-f888-4be9-9441-77ba7038ed40",
            type: "wasteValveNode"
        },
        {
            id: "bottleNode-4016c783-074b-49d5-9af0-b86822feca6e",
            type: "bottleNode"
        },
        {
            id: "columnNode-6a7b2039-3d6f-4e83-86ca-82c8f517b716",
            type: "columnNode"
        },
        {
            id: "valveNode-364d9df4-7142-4aaa-9b2c-9023e94c9fcf",
            type: "valveNode"
        },
        {
            id: "valveNode-ba44fe77-1196-4a17-a7ed-050d02d99d6b",
            type: "valveNode"
        },
        {
            id: "pumpNode-2f2bbe04-6201-47c6-aa52-5b4e9554b7ee",
            type: "pumpNode"
        },
        {
            id: "pumpNode-5a4e24a7-1b02-4584-a35e-d154e89a8c3a",
            type: "pumpNode"
        },
        {
            id: "sensorNode-226e15c9-5d71-47fc-ab58-098ac5c2817b",
            type: "sensorNode"
        },
        {
            id: "bottleNode-85e171c0-b915-4589-ac11-60397b4d9a39",
            type: "bottleNode"
        },
        {
            id: "bottleNode-25dd0506-216d-45e0-b920-e1507131bfec",
            type: "bottleNode"
        },
        {
            id: "bottleNode-ac7c1fbd-b9a6-4a1b-8ed0-c0f5224336ea",
            type: "bottleNode"
        }
    ],
    edges: [
        {
            source: "bottleNode-cde9dfcd-94cf-4544-a857-ce89e180b349",
            target: "pumpNode-71196205-6957-41d0-b1f4-0772c74f8aba"
        },
        {
            source: "pumpNode-71196205-6957-41d0-b1f4-0772c74f8aba",
            target: "sensorNode-a6389e2f-0390-4728-82ec-a979bd7e8201"
        },
        {
            source: "valveNode-599e85ce-fe3c-4890-aab4-5c6fcf39afe8",
            target: "wasteValveNode-494e45b4-f888-4be9-9441-77ba7038ed40"
        },
        {
            source: "bottleNode-5825ffda-093e-43b4-adcc-8798a1c79706",
            target: "pumpNode-71196205-6957-41d0-b1f4-0772c74f8aba"
        },
        {
            source: "bottleNode-4016c783-074b-49d5-9af0-b86822feca6e",
            target: "pumpNode-e1299d22-5304-4792-a3ad-0713f3ad419c"
        },
        {
            source: "pumpNode-e1299d22-5304-4792-a3ad-0713f3ad419c",
            target: "valveNode-364d9df4-7142-4aaa-9b2c-9023e94c9fcf"
        },
        {
            source: "valveNode-364d9df4-7142-4aaa-9b2c-9023e94c9fcf",
            target: "columnNode-6a7b2039-3d6f-4e83-86ca-82c8f517b716"
        },
        {
            source: "valveNode-ba44fe77-1196-4a17-a7ed-050d02d99d6b",
            target: "valveNode-599e85ce-fe3c-4890-aab4-5c6fcf39afe8"
        },
        {
            source: "sensorNode-a6389e2f-0390-4728-82ec-a979bd7e8201",
            target: "valveNode-364d9df4-7142-4aaa-9b2c-9023e94c9fcf"
        },
        {
            source: "columnNode-6a7b2039-3d6f-4e83-86ca-82c8f517b716",
            target: "pumpNode-5a4e24a7-1b02-4584-a35e-d154e89a8c3a"
        },
        {
            source: "columnNode-6a7b2039-3d6f-4e83-86ca-82c8f517b716",
            target: "pumpNode-2f2bbe04-6201-47c6-aa52-5b4e9554b7ee"
        },
        {
            source: "columnNode-6a7b2039-3d6f-4e83-86ca-82c8f517b716",
            target: "sensorNode-226e15c9-5d71-47fc-ab58-098ac5c2817b"
        },
        {
            source: "pumpNode-2f2bbe04-6201-47c6-aa52-5b4e9554b7ee",
            target: "bottleNode-25dd0506-216d-45e0-b920-e1507131bfec"
        },
        {
            source: "pumpNode-5a4e24a7-1b02-4584-a35e-d154e89a8c3a",
            target: "bottleNode-85e171c0-b915-4589-ac11-60397b4d9a39"
        },
        {
            source: "columnNode-6a7b2039-3d6f-4e83-86ca-82c8f517b716",
            target: "valveNode-ba44fe77-1196-4a17-a7ed-050d02d99d6b"
        },
        {
            source: "pumpNode-2f2bbe04-6201-47c6-aa52-5b4e9554b7ee",
            target: "bottleNode-ac7c1fbd-b9a6-4a1b-8ed0-c0f5224336ea"
        }
    ],
    timestamp: "2025-04-30T16:22:03.485Z"
}

const resilt1 = [
    ["bottleNode-3b9d7016-6fc8-4b80-8ded-e4f0735d8264", "bottleNode-59eafcc2-53ef-447c-ad22-d2a24b5e7a35"],
    ["pumpNode-dd688c2f-02ae-4188-9648-6bef2003d241", "pumpNode-9a44ad97-a283-4f3a-8a63-25da756774d9"],
    ["sensorNode-933ac1a7-0098-4a9b-9cec-42007b898259"],
    ["columnNode-de078509-86d3-421b-8eed-f89a3a2b79f2"],
    [
        "sensorNode-933ac1a7-0098-4a9b-9cec-42007b898259",
        "wasteValveNode-7965b7c1-8a64-4bd1-8261-52fbe554d415",
        "bottleNode-a1d026c9-7c00-4294-b19c-d10d31f8338b",
        "bottleNode-a124fd07-b2e2-41ca-be34-3865139aa96a"
    ],
    ["pumpNode-f8d529a7-fd35-41f0-9470-170a5c54592f", "pumpNode-7341a19e-0e71-4d54-9d8f-3f176529d9b4"]
]

const original1 = {
    nodes: [
        {
            id: "bottleNode-3b9d7016-6fc8-4b80-8ded-e4f0735d8264",
            type: "bottleNode"
        },
        {
            id: "bottleNode-59eafcc2-53ef-447c-ad22-d2a24b5e7a35",
            type: "bottleNode"
        },
        {
            id: "pumpNode-dd688c2f-02ae-4188-9648-6bef2003d241",
            type: "pumpNode"
        },
        {
            id: "pumpNode-9a44ad97-a283-4f3a-8a63-25da756774d9",
            type: "pumpNode"
        },
        {
            id: "sensorNode-933ac1a7-0098-4a9b-9cec-42007b898259",
            type: "sensorNode"
        },
        {
            id: "sensorNode-6460ac5c-1ca2-457f-8834-44ff30527fbd",
            type: "sensorNode"
        },
        {
            id: "columnNode-de078509-86d3-421b-8eed-f89a3a2b79f2",
            type: "columnNode"
        },
        {
            id: "wasteValveNode-7965b7c1-8a64-4bd1-8261-52fbe554d415",
            type: "wasteValveNode"
        },
        {
            id: "bottleNode-a124fd07-b2e2-41ca-be34-3865139aa96a",
            type: "bottleNode"
        },
        {
            id: "bottleNode-a1d026c9-7c00-4294-b19c-d10d31f8338b",
            type: "bottleNode"
        },
        {
            id: "pumpNode-f8d529a7-fd35-41f0-9470-170a5c54592f",
            type: "pumpNode"
        },
        {
            id: "pumpNode-7341a19e-0e71-4d54-9d8f-3f176529d9b4",
            type: "pumpNode"
        }
    ],
    edges: [
        {
            source: "bottleNode-59eafcc2-53ef-447c-ad22-d2a24b5e7a35",
            target: "pumpNode-9a44ad97-a283-4f3a-8a63-25da756774d9"
        },
        {
            source: "bottleNode-3b9d7016-6fc8-4b80-8ded-e4f0735d8264",
            target: "pumpNode-dd688c2f-02ae-4188-9648-6bef2003d241"
        },
        {
            source: "pumpNode-9a44ad97-a283-4f3a-8a63-25da756774d9",
            target: "columnNode-de078509-86d3-421b-8eed-f89a3a2b79f2"
        },
        {
            source: "pumpNode-dd688c2f-02ae-4188-9648-6bef2003d241",
            target: "sensorNode-6460ac5c-1ca2-457f-8834-44ff30527fbd"
        },
        {
            source: "sensorNode-6460ac5c-1ca2-457f-8834-44ff30527fbd",
            target: "columnNode-de078509-86d3-421b-8eed-f89a3a2b79f2"
        },
        {
            source: "columnNode-de078509-86d3-421b-8eed-f89a3a2b79f2",
            target: "sensorNode-933ac1a7-0098-4a9b-9cec-42007b898259"
        },
        {
            source: "columnNode-de078509-86d3-421b-8eed-f89a3a2b79f2",
            target: "bottleNode-a1d026c9-7c00-4294-b19c-d10d31f8338b"
        },
        {
            source: "columnNode-de078509-86d3-421b-8eed-f89a3a2b79f2",
            target: "bottleNode-a124fd07-b2e2-41ca-be34-3865139aa96a"
        },
        {
            source: "columnNode-de078509-86d3-421b-8eed-f89a3a2b79f2",
            target: "wasteValveNode-7965b7c1-8a64-4bd1-8261-52fbe554d415"
        },
        {
            source: "bottleNode-a124fd07-b2e2-41ca-be34-3865139aa96a",
            target: "pumpNode-7341a19e-0e71-4d54-9d8f-3f176529d9b4"
        },
        {
            source: "bottleNode-a1d026c9-7c00-4294-b19c-d10d31f8338b",
            target: "pumpNode-f8d529a7-fd35-41f0-9470-170a5c54592f"
        }
    ]
}
