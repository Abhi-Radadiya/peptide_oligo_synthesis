import React, { useCallback, useRef, useState } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"
import { Input } from "../../../../../../../Components/Input/Input"
import StyledDropdown from "../../../../../../synthesis-procedure/components/styled-dropdown"

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

    const handleDelete = useCallback(() => {
        if (data.deleteNode) {
            data.deleteNode(id)
        } else {
            console.warn("deleteNode function not passed to node:", id)
        }
    }, [id, data.deleteNode])

    const [tempValue, setTempValue] = useState(data?.config?.threshold ?? "")

    const inputRef = useRef(null)

    const handleBlur = () => {
        const value = parseFloat(tempValue)
        if (value >= 0.1 && value <= 5.0) {
            updateConfig("threshold", value)
        } else {
            inputRef.current.focus()
        }
    }

    const handleSelectTimeUnit = (timeUnit) => {
        let currentTime = data?.config?.time

        if (!currentTime) {
            updateConfig("timeUnit", timeUnit)

            return
        }

        const currentTimeUnit = data?.config?.timeUnit

        if (currentTimeUnit === "minutes") {
            currentTime *= 60 * 1000
        } else if (currentTimeUnit === "seconds") {
            currentTime *= 1000
        }

        if (timeUnit === "minutes") {
            currentTime /= 60 * 1000
        } else if (timeUnit === "seconds") {
            currentTime /= 1000
        }

        updateConfig("timeUnit", timeUnit)
        updateConfig("time", Math.round(currentTime, 2))
    }

    return (
        <div className={`bg-teal-50 rounded-lg shadow border-2 ${selected ? "border-teal-600" : "border-teal-300"} p-3 w-56 transition-colors duration-150 ease-in-out`}>
            {data?.config?.id}
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

            <div className="font-semibold text-sm mb-2 text-teal-800">{data.name || "Sensor"}</div>

            <div className="space-y-2 text-xs flex flex-col">
                <label className="flex items-center justify-between text-gray-700">
                    <span>Status:</span>
                    <div className="flex items-center">
                        <input type="checkbox" className="toggle-switch nodrag" checked={data.config?.status === "on"} onChange={handleStatusChange} />
                        <span className="ml-1.5 text-xs font-medium">{data.config?.status === "on" ? "ON" : "OFF"}</span>
                    </div>
                </label>

                <div className="">
                    <label className="text-gray-700 leading-[17px] font-medium mb-1">Threshold</label>

                    <input
                        placeholder="Enter Threshold : [ 0.1 - 5.0 ]"
                        ref={inputRef}
                        className={`px-3 py-2 w-full disabled:bg-neutral-200 border shadow-md focus:ring-1 ring-offset-2 ring-blue-300 rounded-lg ${
                            !!tempValue && (tempValue < 0.1 || tempValue > 5) ? "border-red-500" : "border-neutral-600"
                        }`}
                        type="number"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onBlur={handleBlur}
                        step="0.1"
                        min="0.1"
                        max="5.0"
                    />

                    <span className="ml-2 -mt-0.5">
                        * Must be value between <strong>0.1</strong> - <strong>5.0</strong>
                    </span>
                </div>

                <StyledDropdown
                    label="Time Unit"
                    options={[
                        { name: "Minutes", id: "minutes" },
                        { name: "Seconds", id: "seconds" },
                        { name: "Milli Seconds", id: "milliSeconds" }
                    ]}
                    placeholder="Select Time Unit"
                    onChange={(timeUnit) => handleSelectTimeUnit(timeUnit)}
                    value={data?.config?.timeUnit ?? null}
                />

                <Input
                    label="Time"
                    wrapperClassName="w-full"
                    value={data?.config?.time ?? ""}
                    onChange={(time) => updateConfig("time", time)}
                    placeholder={`Enter Time in ${
                        !!data?.config?.timeUnit ? (data?.config?.timeUnit === "minutes" ? "Minutes" : data?.config?.timeUnit === "seconds" ? "Seconds" : "Milli Seconds") : ""
                    }`}
                    rightFixItem={!!data?.config?.time && (data?.config?.timeUnit === "minutes" ? "min" : data?.config?.timeUnit === "seconds" ? "sec" : "ms")}
                />
            </div>

            {/* Input and Output Handles */}
            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" style={{ height: 12, width: 12 }} />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-teal-500" style={{ height: 12, width: 12 }} />
        </div>
    )
})

SensorNode.displayName = "SensorNode"
