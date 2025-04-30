import React, { useCallback } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"
import ToggleSwitch from "../../../../../../../Components/FormController/Switch" // Assuming this path is correct

export const PumpNode = memo(({ id, data, selected }) => {
    // --- Data Extraction and Defaults ---
    const config = data.config || {}
    // Provide defaults for the new config fields if they don't exist
    const controlMode = config.controlMode || "time" // Default to 'time'
    const currentRpm = config.rpm
    const currentTimeDuration = config.timeDuration

    // --- Configuration Update Function ---
    const updateConfig = useCallback(
        (field, value) => {
            if (data.updateNodeConfig) {
                data.updateNodeConfig(id, { [field]: value })
            } else {
                console.warn("updateNodeConfig not passed to PumpNode:", id)
            }
        },
        [id, data.updateNodeConfig]
    )

    // --- Delete Handler ---
    const handleDelete = useCallback(() => {
        if (data.deleteNode) {
            data.deleteNode(id)
        } else {
            console.warn("deleteNode function not passed to node:", id)
        }
    }, [id, data.deleteNode])

    // --- Event Handlers for Inputs ---
    const handleStatusChange = (event) => {
        updateConfig("status", event.target.checked ? "on" : "off")
    }

    const handleFlowRateChange = (event) => {
        const value = event.target.value === "" ? undefined : parseFloat(event.target.value)
        if (value === undefined || (!isNaN(value) && value >= 0)) {
            updateConfig("flowRate", value)
        }
    }

    // Handler for the Time/RPM toggle switch
    const handleControlModeChange = () => {
        const nextMode = controlMode === "time" ? "rpm" : "time"
        updateConfig("controlMode", nextMode)
        if (nextMode === "rpm") {
            updateConfig("timeDuration", undefined)
        } else {
            updateConfig("rpm", undefined)
        }
    }

    // Handler for the RPM/Time input field
    const handleControlValueChange = (event) => {
        const value = event.target.value === "" ? undefined : parseFloat(event.target.value)
        const fieldName = controlMode === "rpm" ? "rpm" : "timeDuration"

        if (value === undefined || (!isNaN(value) && value >= 0)) {
            updateConfig(fieldName, value)
        }
    }

    // Determine the value to display in the shared input
    const controlValue = controlMode === "rpm" ? currentRpm : currentTimeDuration

    // --- Render ---
    return (
        <div className={`bg-pink-50 rounded-lg shadow border-2 ${selected ? "border-pink-600" : "border-pink-300"} p-3 w-60 transition-colors duration-150 ease-in-out relative`}>
            {" "}
            {id}
            {/* Added relative positioning */}
            <div className="font-semibold text-sm mb-2 text-pink-800">{data.name || "Pump"}</div>
            <button
                onClick={handleDelete}
                className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full text-xs leading-none hover:bg-red-700 transition-colors focus:outline-none z-10"
                title="Delete Node"
                aria-label="Delete Node"
            >
                {/* SVG icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div className="space-y-2 text-xs">
                {/* Status Toggle */}
                <label className="flex items-center justify-between text-gray-700">
                    <span>Status:</span>
                    <div className="flex items-center">
                        <input type="checkbox" className="toggle-switch nodrag" checked={config.status === "on"} onChange={handleStatusChange} />
                        <span className="ml-1.5 text-xs font-medium">{config.status === "on" ? "ON" : "OFF"}</span>
                    </div>
                </label>

                {/* Flow Rate Input */}
                <label className="flex items-center justify-between text-gray-700">
                    <span>Flow Rate (ml/min):</span>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                        value={config.flowRate ?? ""}
                        onChange={handleFlowRateChange}
                        placeholder="e.g. 5"
                    />
                </label>

                {/* Control Mode Toggle (Time/RPM) */}
                <div className="flex flex-row justify-between items-center">
                    <span className="font-normal text-gray-700 text-xs">Control By:</span>
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-xs">Time</span>
                        <ToggleSwitch
                            // The `checked` state now depends on the controlMode from config
                            checked={controlMode === "rpm"}
                            // The handler now updates the config
                            handleChange={handleControlModeChange}
                        />
                        <span className="text-xs">RPM</span>
                    </div>
                </div>

                {/* Conditional Input for Time or RPM */}
                {controlMode === "rpm" ? (
                    // RPM Input
                    <label className="flex items-center justify-between text-gray-700">
                        <span>RPM:</span>
                        <input
                            type="number"
                            min="0"
                            step="1" // Usually RPM is integer, adjust if needed
                            className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                            // Value comes from config.rpm
                            value={controlValue ?? ""}
                            // Handler updates config.rpm
                            onChange={handleControlValueChange}
                            placeholder="e.g. 100"
                        />
                    </label>
                ) : (
                    // Time Input
                    <label className="flex items-center justify-between text-gray-700">
                        <span>Time (s):</span> {/* Added unit (seconds) */}
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                            // Value comes from config.timeDuration
                            value={controlValue ?? ""}
                            // Handler updates config.timeDuration
                            onChange={handleControlValueChange}
                            placeholder="e.g. 60"
                        />
                    </label>
                )}
            </div>
            {/* Input and Output Handles */}
            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" style={{ height: 12, width: 12 }} />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-pink-500" style={{ height: 12, width: 12 }} />
        </div>
    )
})

PumpNode.displayName = "PumpNode"
