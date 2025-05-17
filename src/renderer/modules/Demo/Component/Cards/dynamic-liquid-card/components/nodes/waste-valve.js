import React, { useCallback } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"

export const WasteValveNode = memo(({ id, data, selected }) => {
    const updateConfig = useCallback(
        (field, value) => {
            if (data.updateNodeConfig) {
                data.updateNodeConfig(id, { [field]: value })
            } else {
                console.warn("updateNodeConfig not passed to WasteValveNode:", id)
            }
        },
        [id, data.updateNodeConfig]
    )

    const handleStatusChange = (event) => {
        updateConfig("status", event.target.checked ? "on" : "off")
    }

    const handleDelete = useCallback(() => {
        if (data.deleteNode) {
            data.deleteNode(id)
        } else {
            console.warn("deleteNode function not passed to node:", id)
        }
    }, [id, data.deleteNode])

    return (
        <div className={`bg-red-50 rounded-lg shadow border-2 ${selected ? "border-red-600" : "border-red-300"} p-3 w-52 transition-colors duration-150 ease-in-out`}>
            {id}

            <button
                onClick={handleDelete}
                className="absolute top-0 right-0 -mt-1 -mr-1 p-0.5 bg-red-500 text-white rounded-full text-xs leading-none hover:bg-red-700 transition-colors focus:outline-none"
                title="Delete Node"
                aria-label="Delete Node"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <div className="font-semibold text-sm mb-2 text-red-800">{data.name || "Waste Valve"}</div>

            <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between text-gray-700">
                    <span>Status:</span>
                    <div className="flex items-center">
                        <input type="checkbox" className="toggle-switch nodrag" checked={data.config?.status === "on"} onChange={handleStatusChange} />
                        <span className="ml-1.5 text-xs font-medium">{data.config?.status === "on" ? "ON" : "OFF"}</span>
                    </div>
                </label>
            </div>

            {/* Only Input Handle */}
            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" style={{ height: 12, width: 12 }} />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-red-400" style={{ height: 12, width: 12 }} />
        </div>
    )
})

WasteValveNode.displayName = "WasteValveNode"
