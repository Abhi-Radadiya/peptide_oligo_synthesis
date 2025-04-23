import React from "react"
import FileSidebar from "./components/file-sidebar"
import CommandEditor from "./components/command-editor"
import { UseActiveFileDetailsProvider } from "./context/active-file-details-context"

export default function index() {
    return (
        <UseActiveFileDetailsProvider>
            <div className="flex h-screen">
                <FileSidebar />

                <div className="flex-1">
                    <CommandEditor />
                </div>
            </div>
        </UseActiveFileDetailsProvider>
    )
}

// const data = {
//     blocks: [
//         {
//             id: "some uuid",
//             name: "Amedite 1",
//             bottles: [
//                 {
//                     id: "some uuid",
//                     name: "some bottle name",
//                     index: 1
//                     // here user need to add status on - off and liquid discharge volume (input)
//                 },
//                 {
//                     id: "some uuid",
//                     name: "some bottle name 2",
//                     index: 2
//                 }
//                 // we will have more bottles here
//             ]
//         },
//         {
//             id: "some uuid",
//             name: "Amedite 2",
//             bottles: [
//                 {
//                     id: "some uuid",
//                     name: "some bottle name",
//                     index: 1
//                 },
//                 {
//                     id: "some uuid",
//                     name: "some bottle name 2",
//                     index: 2
//                 }
//                 // we will have more bottles here
//             ]
//         }
//         // we will have more blocks here
//     ],
//     valves: [
//         {
//             name: "Top Valve",
//             id: "some uuid"
//             // here user need to add status on - off
//         },
//         {
//             name: "Bottom Valve",
//             id: "some uuid"
//         }
//         // we will have more valves here
//     ],
//     pumps: [
//         {
//             name: "Pump 1",
//             id: "some uuid"
//             // here user need to add status on - off, liquid discharge flow rate (input)
//         },
//         {
//             name: "Pump 2",
//             id: "some uuid"
//         }
//         // we will have more pumps here
//     ],
//     liquidSensor: [
//         {
//             name: "LS1",
//             id: "some uuid"
//             // here user need to add status on - off, threshold value and time to measure (input)
//         },
//         {
//             name: "LS2",
//             id: "some uuid"
//         }
//         // we will have more liquid sensor here
//     ],
//     wasteValve: [
//         {
//             name: "Waste Valve 1",
//             id: "some uuid"
//             // user will add status on - off
//         },
//         {
//             name: "Waste Valve 2",
//             id: "some uuid"
//         }
//         // we will have more waste valve here
//     ]
// }

// this is all parts we need:
// block(which will have bottles)
// valve
// Pumps
// waste Valve
// liquid sensor

// Now from above input I need react js code where let user can create specifc flow for liquid with given input using flowchart like system

// I am currntly using react + tailwind css

// Are you getting what I am upto ? User can create flow like

// 1. User will pick any 2 bottles from Block and start valve for 10 and 19 ml disachrge rate
// 2. Then user will pick any pump and start it for 10 ml discharge rate and connect with above 2 bottles
// 3. Then user will pick any liquid sensor and connect with above pump and set threshold value for 10 ml and time to measure for 5 sec
// 4. Then user will pick any waste valve and connect with above liquid sensor and set it to on - off
// 5. Then user will pick any valve and connect with above liquid sensor and set it to on - off
// 6. Then user will pick any pump and connect with above liquid sensor and set it to on - off and set liquid discharge flow rate for 10 ml

// Above is just a example for you. So let user create any kind of flow and must be elgance theme processWiseFlag, color wise and so love this interface. If you want you can use any library (of course free)
