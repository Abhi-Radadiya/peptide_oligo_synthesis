import React, { useCallback } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"

export const BottleNode = memo(({ id, data, selected }) => {
    const updateConfig = useCallback(
        (field, value) => {
            if (data.updateNodeConfig) {
                data.updateNodeConfig(id, { [field]: value })
            } else {
                console.warn("updateNodeConfig not passed to BottleNode:", id)
            }
        },
        [id, data.updateNodeConfig]
    )

    const handleDelete = useCallback(() => {
        if (data.deleteNode) {
            data.deleteNode(id) // Call the function passed from FlowBuilder
        } else {
            console.warn("deleteNode function not passed to node:", id)
        }
    }, [id, data.deleteNode]) // Depend on id and the passed function

    const handleStatusChange = (event) => {
        updateConfig("status", event.target.checked ? "on" : "off")
    }

    const handleVolumeChange = (event) => {
        const value = event.target.value === "" ? undefined : parseFloat(event.target.value)
        if (value === undefined || (!isNaN(value) && value >= 0)) {
            updateConfig("dischargeVolume", value)
        }
    }

    return (
        <div className={`bg-purple-50 rounded-lg shadow border-2 ${selected ? "border-purple-600" : "border-purple-300"} p-3 w-[350px] transition-colors duration-150 ease-in-out`}>
            <div className="text-xs text-purple-600 mb-1">
                {data.blockName || "Block"} - Bottle {data.index}
            </div>
            <div className="font-semibold text-sm mb-2 text-purple-800">{data.name || "Bottle"}</div>

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
            {/* Configuration Inputs */}
            <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between text-gray-700">
                    <span>Status:</span>
                    <div className="flex items-center">
                        <input type="checkbox" className="toggle-switch nodrag" checked={data.config?.status === "on"} onChange={handleStatusChange} />
                        <span className="ml-1.5 text-xs font-medium">{data.config?.status === "on" ? "ON" : "OFF"}</span>
                    </div>
                </label>
                <label className="flex items-center justify-between text-gray-700">
                    <span>Volume (ml):</span>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                        value={data.config?.dischargeVolume ?? ""}
                        onChange={handleVolumeChange}
                        placeholder="e.g. 10"
                    />
                </label>
            </div>

            {/* Only Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-source`} // Unique handle ID
                className="!bg-purple-500"
            />
        </div>
    )
})

BottleNode.displayName = "BottleNode"

export default BottleNode
