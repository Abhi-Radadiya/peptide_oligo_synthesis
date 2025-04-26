import React, { useCallback, useState } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"
import ToggleSwitch from "../../../../../../../Components/FormController/Switch"

export const PumpNode = memo(({ id, data, selected }) => {
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

    const handleStatusChange = (event) => {
        updateConfig("status", event.target.checked ? "on" : "off")
    }

    const handleFlowRateChange = (event) => {
        const value = event.target.value === "" ? undefined : parseFloat(event.target.value)
        if (value === undefined || (!isNaN(value) && value >= 0)) {
            updateConfig("flowRate", value)
        }
    }

    const [rpm, setRPM] = useState(0)

    const [isFlowRate, setIsFlowRate] = useState(false)

    const handleDelete = useCallback(() => {
        if (data.deleteNode) {
            data.deleteNode(id)
        } else {
            console.warn("deleteNode function not passed to node:", id)
        }
    }, [id, data.deleteNode])

    return (
        <div className={`bg-pink-50 rounded-lg shadow border-2 ${selected ? "border-pink-600" : "border-pink-300"} p-3 w-60 transition-colors duration-150 ease-in-out`}>
            <div className="font-semibold text-sm mb-2 text-pink-800">{data.name || "Pump"}</div>
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

            <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between text-gray-700">
                    <span>Status:</span>
                    <div className="flex items-center">
                        <input type="checkbox" className="toggle-switch nodrag" checked={data.config?.status === "on"} onChange={handleStatusChange} />
                        <span className="ml-1.5 text-xs font-medium">{data.config?.status === "on" ? "ON" : "OFF"}</span>
                    </div>
                </label>
                <label className="flex items-center justify-between text-gray-700">
                    <span>Flow Rate (ml/min) :</span>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                        value={data.config?.flowRate ?? ""}
                        onChange={handleFlowRateChange}
                        placeholder="e.g. 5"
                    />
                </label>
                <div className="flex flex-row justify-between items-center">
                    <span className="font-normal text-gray-700 text-xs">Select Type</span>

                    <div className="flex flex-row items-center gap-2">
                        <span className="text-xs">Time</span>

                        <ToggleSwitch
                            checked={isFlowRate}
                            handleChange={() => {
                                setIsFlowRate((prevState) => !prevState)
                            }}
                        />

                        <span className="text-xs">RPM</span>
                    </div>
                </div>

                {isFlowRate ? (
                    <label className="flex items-center justify-between text-gray-700">
                        <span>RMP :</span>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                            value={rpm}
                            onChange={({ target }) => setRPM(target.value)}
                            placeholder="e.g. 5"
                        />
                    </label>
                ) : (
                    <label className="flex items-center justify-between text-gray-700">
                        <span>Time :</span>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            className="nodrag border border-gray-300 rounded px-1 py-0.5 w-16 text-right text-xs"
                            value={rpm}
                            onChange={({ target }) => setRPM(target.value)}
                            placeholder="e.g. 5"
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
