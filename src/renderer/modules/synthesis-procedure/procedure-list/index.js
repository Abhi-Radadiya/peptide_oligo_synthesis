// import React, { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { deleteSynthesisProcedure } from "../../../../redux/reducers/synthesis-procedure"

// export default function Index() {
//     const procedureList = useSelector((state) => state.synthesisProcedure.synthesisProcedure)

//     console.log(`procedureList : `, procedureList)

//     const aboveListLoge = [
//         {
//             id: "9c8a6542-d418-4e8c-b719-d097ae4791f1",
//             steps: [
//                 {
//                     type: "pump",
//                     afterDelay: "120",
//                     procedure: [
//                         {
//                             pump: "pmp101",
//                             rpm: "2120",
//                             runningParameter: "time",
//                             time: "1200",
//                             dischargeableVolume: ""
//                         },
//                         {
//                             pump: "pmp102",
//                             rpm: "50",
//                             runningParameter: "time",
//                             time: "500",
//                             dischargeableVolume: ""
//                         }
//                     ]
//                 },
//                 {
//                     type: "valve",
//                     afterDelay: 0,
//                     procedure: [
//                         {
//                             valveSection: "amedite",
//                             container: "cont1",
//                             valve: "vlv002",
//                             afterCloseTime: 0,
//                             time: "500"
//                         },
//                         {
//                             valveSection: "waste",
//                             container: "cont3",
//                             valve: "vlv002",
//                             afterCloseTime: 0,
//                             time: "1200"
//                         }
//                     ]
//                 }
//             ],
//             inputType: "time"
//         },
//         {
//             id: "4e350cd7-bbdc-4fc2-a52e-df137b3901f4",
//             steps: [
//                 {
//                     type: "valve",
//                     afterDelay: 0,
//                     procedure: []
//                 }
//             ],
//             inputType: "time"
//         },
//         {
//             id: "2b91ebe7-2752-4d8a-9853-86b3da203de3",
//             steps: [
//                 {
//                     type: "valve",
//                     afterDelay: 0,
//                     procedure: [
//                         {
//                             valveSection: "amedite",
//                             container: "cont2",
//                             valve: "vlv002",
//                             afterCloseTime: 0,
//                             time: "120"
//                         }
//                     ]
//                 }
//             ],
//             inputType: "time"
//         }
//     ]

//     // const dispatch = useDispatch()

//     // useEffect(() => {
//     //     dispatch(deleteSynthesisProcedure(["f10197ac-62fa-4d25-b704-a4d229cf8dad", "8b5a33df-6ee1-4463-9f90-4abf5369cdef", "a4cc91d6-011f-42be-b827-2d9f4fcee419"]))
//     // }, [])

//     return <div></div>
// }

import React, { useState, useEffect } from "react"
import { deleteSynthesisProcedure } from "../../../../redux/reducers/synthesis-procedure"
import { useDispatch, useSelector } from "react-redux"
// Uncomment these lines when integrating with Redux
// import { useDispatch, useSelector } from "react-redux";
// import { deleteSynthesisProcedure } from "../../../../redux/reducers/synthesis-procedure"; // Adjust path as needed

// Sample data (replace with Redux selector eventually)
const sampleProcedureList = [
    {
        id: "9c8a6542-d418-4e8c-b719-d097ae4791f1",
        steps: [{ type: "pump" /* ... other pump data */ }, { type: "valve" /* ... other valve data */ }],
        inputType: "time"
    },
    {
        id: "4e350cd7-bbdc-4fc2-a52e-df137b3901f4",
        steps: [{ type: "valve", procedure: [] }],
        inputType: "time"
    },
    {
        id: "2b91ebe7-2752-4d8a-9853-86b3da203de3",
        steps: [{ type: "valve" /* ... other valve data */ }],
        inputType: "time"
    },
    {
        id: "f10197ac-62fa-4d25-b704-a4d229cf8dad",
        steps: [{ type: "pump", procedure: [] }],
        inputType: "volume"
    },
    {
        id: "8b5a33df-6ee1-4463-9f90-4abf5369cdef",
        steps: [{ type: "stirrer", procedure: [] }],
        inputType: "time"
    },
    {
        id: "a4cc91d6-011f-42be-b827-2d9f4fcee419",
        steps: [{ type: "wait", procedure: [] }],
        inputType: "time"
    }
]

export default function ProcedureTable() {
    // --- Redux Integration (Commented out for now) ---
    const dispatch = useDispatch()
    const procedureListFromStore = useSelector((state) => state.synthesisProcedure.synthesisProcedure)
    // Use local state for demonstration purposes
    const [procedureList, setProcedureList] = useState(procedureListFromStore)

    // --- State for Selection ---
    const [selectedIds, setSelectedIds] = useState([])
    const [isSelectAll, setIsSelectAll] = useState(false)

    // --- Effect to update Select All checkbox state ---
    // This runs when selectedIds or the main procedureList changes
    useEffect(() => {
        if (procedureList.length > 0 && selectedIds.length === procedureList.length) {
            setIsSelectAll(true)
        } else {
            setIsSelectAll(false)
        }
    }, [selectedIds, procedureList])

    // --- Handlers ---
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked
        setIsSelectAll(isChecked)
        if (isChecked) {
            // Select all IDs
            setSelectedIds(procedureList.map((proc) => proc.id))
        } else {
            // Deselect all
            setSelectedIds([])
        }
    }

    const handleSelectSingle = (id, event) => {
        const isChecked = event.target.checked
        if (isChecked) {
            // Add ID to selection
            setSelectedIds((prevSelected) => [...prevSelected, id])
        } else {
            // Remove ID from selection
            setSelectedIds((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id))
        }
    }

    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) {
            alert("Please select items to delete.")
            return
        }

        // --- Redux Dispatch (Replace simulation below) ---
        // console.log("Dispatching delete action for IDs:", selectedIds);
        dispatch(deleteSynthesisProcedure(selectedIds))

        // --- Simulate Deletion for Demo ---
        setProcedureList((currentList) => currentList.filter((proc) => !selectedIds.includes(proc.id)))

        // --- Cleanup ---
        setSelectedIds([])
        setIsSelectAll(false) // Ensure select all is unchecked after deletion
    }

    // --- Helper to display steps concisely ---
    const formatSteps = (steps) => {
        if (!steps || steps.length === 0) return "No steps"
        const stepTypes = steps.map((step) => step.type).join(", ")
        return `${steps.length} step(s): ${stepTypes}`
    }

    // --- Render ---
    return (
        <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Synthesis Procedures</h1>

            <div className="mb-4 flex justify-start items-center">
                {selectedIds.length > 0 && (
                    <button
                        onClick={handleDeleteSelected}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
                    >
                        Delete Selected ({selectedIds.length})
                    </button>
                )}
            </div>

            <div className="shadow-xl rounded-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal bg-white">
                        <thead className="bg-gray-100 border-b-2 border-gray-200">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        checked={isSelectAll}
                                        onChange={handleSelectAll}
                                        // Disable if there's no data
                                        disabled={procedureList.length === 0}
                                        aria-label="Select all procedures"
                                    />
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Procedure ID</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Input Type</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Steps Summary</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {procedureList.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-5 py-5 text-center text-gray-500">
                                        No procedures found.
                                    </td>
                                </tr>
                            ) : (
                                procedureList.map((procedure) => {
                                    const isSelected = selectedIds.includes(procedure.id)
                                    return (
                                        <tr
                                            key={procedure.id}
                                            className={`${isSelected ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"} transition duration-150 ease-in-out`}
                                        >
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                                    checked={isSelected}
                                                    onChange={(e) => handleSelectSingle(procedure.id, e)}
                                                    aria-label={`Select procedure ${procedure.id}`}
                                                />
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{procedure.id}</td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                                                <span
                                                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        procedure.inputType === "time" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                                                    }`}
                                                >
                                                    {procedure.inputType || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-600">{formatSteps(procedure.steps)}</td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
