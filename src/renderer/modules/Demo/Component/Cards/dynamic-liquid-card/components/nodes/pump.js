import React, { useCallback, memo } from "react"
import { Handle, Position } from "reactflow"
import ToggleSwitch from "../../../../../../../Components/FormController/Switch" // Assuming this path is correct
import { Input } from "../../../../../../../Components/Input/Input" // Assuming this path is correct
import StyledDropdown from "../../../../../../synthesis-procedure/components/styled-dropdown"

export const PumpNode = memo(({ id, data, selected }) => {
    // --- Data Extraction and Defaults ---
    const config = data.config || {}
    const status = config.status || "off" // Default to 'off'
    const rpm = config.rpm
    // Default controlMode to 'none' if not specified
    const controlMode = config.controlMode || "none"
    const timeValue = config.time
    const liquidVolumeValue = config.liquidVolume

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
        updateConfig("rpm", null)
        updateConfig("controlMode", null)
        updateConfig("liquidVolume", null)
        updateConfig("time", null)
    }

    const handleRpmChange = (newRpm) => {
        const value = newRpm === "" ? undefined : parseFloat(newRpm)

        if (value > 900) return

        if (value === undefined || (!isNaN(value) && value >= 0)) {
            updateConfig("rpm", value)
        }
    }

    // Handler for the Control Mode dropdown
    const handleControlModeSelectChange = (mode) => {
        updateConfig("controlMode", mode)

        // Clear other mode's values when switching
        if (mode === "time") {
            updateConfig("liquidVolume", undefined)
        } else if (mode === "liquidVolume") {
            updateConfig("time", undefined)
        } else {
            updateConfig("time", undefined)
            updateConfig("liquidVolume", undefined)
        }
    }

    // Handler for the Time or Liquid Volume input field
    const handleControlValueChange = (inputValue) => {
        const value = inputValue === "" ? undefined : parseFloat(inputValue)
        const fieldName = controlMode === "time" ? "time" : "liquidVolume"

        if (value === undefined || (!isNaN(value) && value >= 0)) {
            updateConfig(fieldName, value)
        }
    }

    // Determine the value to display in the shared input based on current controlMode
    const currentControlInputValue = controlMode === "time" ? timeValue : liquidVolumeValue

    return (
        <div className={`bg-pink-50 rounded-lg shadow border-2 ${selected ? "border-pink-600" : "border-pink-300"} p-3 w-80 transition-colors duration-150 ease-in-out relative`}>
            <div className="font-semibold text-sm mb-2 text-pink-800">{data.name || "Pump"}</div>
            <button
                onClick={handleDelete}
                className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full text-xs leading-none hover:bg-red-700 transition-colors focus:outline-none z-10"
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

            <div className="space-y-3 text-xs">
                {/* Status Toggle */}
                <label className="flex items-center justify-between text-gray-700">
                    <span>Status:</span>
                    <div className="flex items-center">
                        <ToggleSwitch
                            checked={status === "on"}
                            handleChange={handleStatusChange} // Assuming handleChange passes boolean
                            id={`pump-status-switch-${id}`}
                        />
                        <span className="ml-1.5 text-xs font-medium">{status === "on" ? "ON" : "OFF"}</span>
                    </div>
                </label>

                {/* Conditional Inputs: Only show if status is 'on' */}
                {status === "on" && (
                    <>
                        {/* RPM Input (Mandatory if ON) */}
                        <label className="flex items-center justify-between text-gray-700 pb-2">
                            <span>RPM:</span>
                            <Input
                                type="number"
                                value={rpm ?? ""}
                                onChange={handleRpmChange} // Assuming Input onChange directly passes value
                                placeholder="Enter RPM"
                                className="w-32 nodrag" // Added nodrag and adjusted width
                            />
                        </label>

                        {/* Control Mode Dropdown */}
                        <span className="text-gray-700">Control By:</span>

                        <StyledDropdown
                            className="-mt-1"
                            options={[
                                { name: "None", id: "none" },
                                { name: "Time", id: "time" },
                                { name: "Liquid Volume", id: "liquidVolume" }
                            ]}
                            placeholder="Select Block"
                            onChange={handleControlModeSelectChange}
                            value={controlMode}
                        />

                        {/* Conditional Input for Time */}
                        {controlMode === "time" && (
                            <label className="flex items-center justify-between text-gray-700">
                                <span>Time:</span>
                                <Input
                                    rightFixItem={currentControlInputValue && "ms"}
                                    type="number"
                                    value={currentControlInputValue ?? ""}
                                    onChange={handleControlValueChange}
                                    placeholder="Enter time (ms)"
                                    className="w-32 nodrag"
                                />
                            </label>
                        )}

                        {/* Conditional Input for Liquid Volume */}
                        {controlMode === "liquidVolume" && (
                            <label className="flex items-center justify-between text-gray-700">
                                <span>Liquid Volume:</span>
                                <Input
                                    rightFixItem={currentControlInputValue && "ml"}
                                    type="number"
                                    value={currentControlInputValue ?? ""}
                                    onChange={handleControlValueChange}
                                    placeholder="Enter volume (ml)"
                                    className="w-32 nodrag"
                                />
                            </label>
                        )}
                    </>
                )}
            </div>

            {/* Input and Output Handles */}
            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" style={{ height: 12, width: 12 }} />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-pink-500" style={{ height: 12, width: 12 }} />
        </div>
    )
})

PumpNode.displayName = "PumpNode"
