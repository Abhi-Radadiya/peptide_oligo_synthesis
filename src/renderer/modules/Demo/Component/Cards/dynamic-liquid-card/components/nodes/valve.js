import React, { useCallback } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"

export const ValveNode = memo(({ id, data, selected }) => {
    const updateConfig = useCallback(
        (field, value) => {
            if (data.updateNodeConfig) {
                data.updateNodeConfig(id, { [field]: value })
            } else {
                console.warn("updateNodeConfig not passed to ValveNode:", id)
            }
        },
        [id, data.updateNodeConfig]
    )

    const handleStatusChange = (event) => {
        updateConfig("status", event.target.checked ? "on" : "off")
    }

    return (
        <div className={`bg-orange-50 rounded-lg shadow border-2 ${selected ? "border-orange-600" : "border-orange-300"} p-3 w-52 transition-colors duration-150 ease-in-out`}>
            <div className="font-semibold text-sm mb-2 text-orange-800">{data.name || "Valve"}</div>

            <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between text-gray-700">
                    <span>Status:</span>
                    <div className="flex items-center">
                        <input type="checkbox" className="toggle-switch nodrag" checked={data.config?.status === "on"} onChange={handleStatusChange} />
                        <span className="ml-1.5 text-xs font-medium">{data.config?.status === "on" ? "ON" : "OFF"}</span>
                    </div>
                </label>
            </div>

            {/* Input and Output Handles */}
            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-orange-500" />
        </div>
    )
})

ValveNode.displayName = "ValveNode"
