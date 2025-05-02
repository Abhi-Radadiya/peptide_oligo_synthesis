import React, { useCallback } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"
import { Input } from "../../../../../../../Components/Input/Input"
import StyledDropdown from "../../../../../../synthesis-procedure/components/styled-dropdown"

export const DelayBlock = memo(({ id, data, selected }) => {
    const updateConfig = useCallback(
        (field, value) => {
            if (data.updateNodeConfig) {
                data.updateNodeConfig(id, { [field]: value })
            } else {
                console.warn("updateNodeConfig not passed to DelayNode:", id)
            }
        },
        [id, data.updateNodeConfig]
    )

    const handleDelayTimeChange = (event) => {
        const value = event.target.value === "" ? undefined : parseFloat(event.target.value)
        if (value === undefined || (!isNaN(value) && value >= 0)) {
            updateConfig("delayNode", value)
        }
    }

    const handleDelete = useCallback(() => {
        if (data.deleteNode) {
            data.deleteNode(id)
        } else {
            console.warn("deleteNode function not passed to node:", id)
        }
    }, [id, data.deleteNode])

    const handleSelectTimeUnit = (timeUnit) => {
        let currentTime = data?.config?.delayTime

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
        updateConfig("delayTime", currentTime)
    }

    return (
        <div className={`bg-pink-50 rounded-lg shadow border-2 ${selected ? "border-pink-600" : "border-pink-300"} p-3 w-60 transition-colors duration-150 ease-in-out`}>
            <div className="font-semibold text-sm mb-2 text-pink-800">{data.name || "Delay Block"}</div>
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

            <Input
                label="Delay Time"
                wrapperClassName="w-full"
                value={data?.config?.delayTime ?? ""}
                onChange={(delayTime) => updateConfig("delayTime", delayTime)}
                placeholder="Enter Delay Time"
            />

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

            {/* Input and Output Handles */}
            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" style={{ height: 12, width: 12 }} />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-pink-500" style={{ height: 12, width: 12 }} />
        </div>
    )
})

DelayBlock.displayName = "DelayBlock"
