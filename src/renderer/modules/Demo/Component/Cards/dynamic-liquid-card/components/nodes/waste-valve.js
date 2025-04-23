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

    return (
        <div className={`bg-red-50 rounded-lg shadow border-2 ${selected ? "border-red-600" : "border-red-300"} p-3 w-52 transition-colors duration-150 ease-in-out`}>
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
            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" />
        </div>
    )
})

WasteValveNode.displayName = "WasteValveNode"
