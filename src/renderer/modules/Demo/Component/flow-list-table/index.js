// src/components/FlowListTable.jsx (adjust path as needed)
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteSynthesisProcedure, loadProcedure, selectSavedProcedures } from "../../../../../redux/reducers/synthesis-procedure"

export const FlowListTable = () => {
    // Get data and dispatch function from Redux
    const savedFlows = useSelector(selectSavedProcedures)
    const dispatch = useDispatch()

    const handleDelete = (flowId) => {
        if (window.confirm(`Are you sure you want to delete flow ${flowId}?`)) {
            dispatch(deleteSynthesisProcedure(flowId))
        }
    }

    const handleLoad = (flowId) => {
        console.log(`Requesting to load flow: ${flowId}`)
        dispatch(loadProcedure(flowId))
    }

    return (
        <div className="p-4 border-t border-gray-300 bg-gray-50 h-[30vh] overflow-y-auto">
            {" "}
            {/* Example Height */}
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Saved Synthesis Procedures</h2>
            {savedFlows.length === 0 ? (
                <p className="text-sm text-gray-500">No saved procedures yet.</p>
            ) : (
                <table className="w-full text-sm text-left text-gray-600 table-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                        <tr>
                            <th scope="col" className="px-4 py-2">
                                Name
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Nodes
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Edges
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedFlows.map((flow) => (
                            <tr key={flow.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{flow.name || `Procedure ${flow.id.substring(0, 6)}`}</td>
                                <td className="px-4 py-2">{flow.nodes?.length || 0}</td>
                                <td className="px-4 py-2">{flow.edges?.length || 0}</td>
                                <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                    <button onClick={() => handleLoad(flow.id)} className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                                        Load
                                    </button>
                                    {/* Add Edit button later if needed, might dispatch loadProcedure first */}
                                    {/* <button className="px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600">Edit</button> */}
                                    <button onClick={() => handleDelete(flow.id)} className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
