import React, { useCallback } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"

export const SensorNode = memo(({ id, data, selected }) => {
    const updateConfig = useCallback(
        (field, value) => {
            if (data.updateNodeConfig) {
                data.updateNodeConfig(id, { [field]: value })
            } else {
                console.warn("updateNodeConfig not passed to SensorNode:", id)
            }
        },
        [id, data.updateNodeConfig]
    )

    const handleStatusChange = (event) => {
        updateConfig("status", event.target.checked ? "on" : "off")
    }

    const handleThresholdChange = (event) => {
        const value = event.target.value === "" ? undefined : parseFloat(event.target.value)
        if (value === undefined || !isNaN(value)) {
            // Allow any number for threshold
            updateConfig("threshold", value)
        }
    }

    const handleTimeChange = (event) => {
        const value = event.target.value === "" ? undefined : parseInt(event.target.value, 10)
        if (value === undefined || (!isNaN(value) && value >= 0)) {
            updateConfig("measureTime", value)
        }
    }

    return (
        <div className={`bg-teal-50 rounded-lg shadow border-2 ${selected ? "border-teal-600" : "border-teal-300"} p-3 w-52 transition-colors duration-150 ease-in-out`}>
            <div className="font-semibold text-sm mb-2 text-teal-800">{data.name || "Sensor"}</div>

            <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between text-gray-700">
                    <span>Status:</span>
                    <div className="flex items-center">
                        <input type="checkbox" className="toggle-switch nodrag" checked={data.config?.status === "on"} onChange={handleStatusChange} />
                        <span className="ml-1.5 text-xs font-medium">{data.config?.status === "on" ? "ON" : "OFF"}</span>
                    </div>
                </label>
                <label className="flex items-center justify-between text-gray-700">
                    <span>Threshold:</span>
                    <input
                        type="number"
                        step="any" // Allow decimals
                        className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                        value={data.config?.threshold ?? ""}
                        onChange={handleThresholdChange}
                        placeholder="e.g. 100"
                    />
                </label>
                <label className="flex items-center justify-between text-gray-700">
                    <span>Time (sec):</span>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                        value={data.config?.measureTime ?? ""}
                        onChange={handleTimeChange}
                        placeholder="e.g. 5"
                    />
                </label>
            </div>

            {/* Input and Output Handles */}
            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-teal-500" />
        </div>
    )
})

SensorNode.displayName = "SensorNode"
