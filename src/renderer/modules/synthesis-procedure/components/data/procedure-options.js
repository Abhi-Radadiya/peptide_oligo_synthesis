// // src/data/procedureOptions.js

// export const procedureTypes = [
//     { id: "valve", name: "Valve" },
//     { id: "pump", name: "Pump" },
//     { id: "sensor", name: "Sensor" }
// ]

// export const valveSubTypes = [
//     { id: "amedite", name: "Amedite" },
//     { id: "reagent", name: "Reagent" },
//     { id: "waste", name: "Waste" },
//     { id: "other", name: "Other" }
// ]

// export const valveMenuItems = {
//     amedite: [
//         { id: "am1", name: "AMedite Option 1" },
//         { id: "am2", name: "AMedite Option 2" }
//     ],
//     reagent: [
//         { id: "rg1", name: "Reagent Choice A" },
//         { id: "rg2", name: "Reagent Choice B" },
//         { id: "rg3", name: "Reagent Choice C" }
//     ],
//     waste: [{ id: "ws1", name: "Waste Disposal X" }],
//     other: [{ id: "ot1", name: "Custom Valve Config" }]
// }

// export const sensorList = [
//     { id: "temp", name: "Temperature Sensor" },
//     { id: "pressure", name: "Pressure Sensor" },
//     { id: "flow", name: "Flow Rate Sensor" },
//     { id: "level", name: "Level Sensor" }
// ]

// export const pumpBasisOptions = {
//     time: "Time Base",
//     discharge: "Discharge Volume Base"
// }

// src/data/procedureOptions.js

// Main Step Types
export const procedureTypes = [
    { id: "valve", name: "Valve Step" },
    { id: "pump", name: "Pump Step" },
    { id: "liquidSensor", name: "Sensor Check Step" } // Updated name
]

// Options for fields within procedures/actions

// Used for categorization within a Valve Action
export const valveSections = [
    { id: "amedite", name: "Amedite" },
    { id: "reagent", name: "Reagent" },
    { id: "waste", name: "Waste" },
    { id: "other", name: "Other" }
]

// Example lists - Replace with your actual data sources
export const containerList = [
    { id: "cont1", name: "Container 1 (Reactor)" },
    { id: "cont2", name: "Container 2 (Buffer)" },
    { id: "cont3", name: "Container 3 (Waste)" },
    { id: "cont-na", name: "N/A" } // Might need a 'Not Applicable'
]

export const valveList = [
    { id: "vlv001", name: "V001 - Main Inlet" },
    { id: "vlv002", name: "V002 - Reagent A" },
    { id: "vlv003", name: "V003 - Waste Outlet" },
    { id: "vlv004", name: "V004 - Bypass" }
]

export const pumpList = [
    { id: "pmp101", name: "P101 - Circulation Pump" },
    { id: "pmp102", name: "P102 - Dosing Pump" }
]

export const sensorList = [
    // Assuming these are liquid sensors now
    { id: "lsens_t1", name: "LSENS-T1 - Tank 1 Level" },
    { id: "lsens_p1", name: "LSENS-P1 - Pipe Pressure" },
    { id: "lsens_f1", name: "LSENS-F1 - Flow Meter" }
]

// Pump control basis
export const pumpBasisOptions = {
    time: "Time Base",
    liquidVolume: "Volume Base" // Key matches data structure
}
