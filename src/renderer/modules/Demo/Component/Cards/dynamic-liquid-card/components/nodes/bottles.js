import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { useSelector } from "react-redux"
import { Handle, Position } from "reactflow"
import StyledDropdown from "../../../../../../synthesis-procedure/components/styled-dropdown"
import ToggleSwitch from "../../../../../../../Components/FormController/Switch"

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
            data.deleteNode(id)
        } else {
            console.warn("deleteNode function not passed to node:", id)
        }
    }, [id, data.deleteNode])

    const handleStatusChange = (event) => {
        updateConfig("status", event.target.checked ? "on" : "off")
    }

    const hardwareSetup = useSelector((state) => state.hardwareSetup)

    const handleSelectBlock = (selection) => {
        updateConfig("selectedBlock", selection)
        updateConfig("selectedToFromBottle", { ...(data?.config?.selectedToFromBottle ?? {}), from: null, to: null })
    }

    const blockWiseBottle = useMemo(() => {
        switch (data?.config?.selectedBlock) {
            case "amedite1":
                return hardwareSetup.amediteContainer.container1.bottles.map((el) => ({ name: el.bottleName, id: el.id, value: el.valve }))

            case "amedite2":
                return hardwareSetup.amediteContainer.container2.bottles.map((el) => ({ name: el.bottleName, id: el.id, value: el.valve }))

            case "amedite3":
                return hardwareSetup.amediteContainer.container3.bottles.map((el) => ({ name: el.bottleName, id: el.id, value: el.valve }))

            case "reagent1":
                return hardwareSetup.reagentContainer.container1.bottles.map((el) => ({ name: el.bottleName, id: el.id, value: el.valve }))

            case "reagent2":
                return hardwareSetup.reagentContainer.container2.bottles.map((el) => ({ name: el.bottleName, id: el.id, value: el.valve }))

            default:
                break
        }
    }, [data?.config?.selectedBlock])

    const handleSelectFromBottle = (selection) => {
        updateConfig("selectedToFromBottle", { ...(data?.config?.selectedToFromBottle ?? {}), from: selection, to: null })
    }

    const handleSelectToBlock = (selection) => {
        updateConfig("selectedToFromBottle", { ...(data?.config?.selectedToFromBottle ?? {}), to: selection })
    }

    const toBottleMenuItems = useMemo(() => {
        const fromBottleMenuItemIndex = blockWiseBottle?.findIndex((el) => el.id === data?.config?.selectedToFromBottle?.from)

        return blockWiseBottle?.map((el, index) => {
            if (index > fromBottleMenuItemIndex) return { ...el, disabled: false }

            return { ...el, disabled: true }
        })
    }, [blockWiseBottle, data?.config?.selectedToFromBottle?.from])

    return (
        <div className={`bg-purple-50 rounded-lg shadow border-2 ${selected ? "border-purple-600" : "border-purple-300"} p-3 w-[350px] transition-colors duration-150 ease-in-out`}>
            {data?.config?.selectedToFromBottle?.from}
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

            <StyledDropdown
                label="Valve Section"
                options={[
                    { name: "Amedite Block 1", id: "amedite1" },
                    { name: "Amedite Block 2", id: "amedite2" },
                    { name: "Amedite Block 3", id: "amedite3" },
                    { name: "Reagent Block 1", id: "reagent1" },
                    { name: "Reagent Block 2", id: "reagent2" }
                ]}
                placeholder="Select Block"
                onChange={handleSelectBlock}
                value={data?.config?.selectedBlock ?? null}
            />

            <ToggleSwitch
                id="selectRange"
                className="justify-between w-full my-3"
                checked={data?.config?.isRangeSelection ?? false}
                label="Select Range"
                handleChange={({ target }) => {
                    updateConfig("isRangeSelection", target.checked)
                }}
            />

            {data?.config?.selectedBlock &&
                (data?.config?.isRangeSelection ? (
                    <>
                        <StyledDropdown
                            label="From Bottle Section"
                            options={blockWiseBottle}
                            placeholder="Select From Block"
                            onChange={handleSelectFromBottle}
                            value={data?.config?.selectedToFromBottle?.from ?? null}
                        />
                        <StyledDropdown
                            disabled={!data?.config?.selectedToFromBottle?.from}
                            label="To Bottle Section"
                            options={toBottleMenuItems}
                            // options={blockWiseBottle}
                            placeholder="Select To Block"
                            onChange={handleSelectToBlock}
                            value={data?.config?.selectedToFromBottle?.to ?? null}
                        />
                    </>
                ) : (
                    <StyledDropdown
                        label="Bottle Section"
                        options={blockWiseBottle}
                        placeholder="Select Block"
                        onChange={handleSelectFromBottle}
                        value={data?.config?.selectedToFromBottle?.from}
                    />
                ))}

            <div className="flex flex-row items-center w-full mt-2">
                <ToggleSwitch id="status" className="justify-between w-full" checked={data.config?.status === "on"} label="Status" handleChange={handleStatusChange} />
                <span className="ml-1.5 text-xs font-medium">{data.config?.status === "on" ? "ON" : "OFF"}</span>
            </div>

            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" style={{ height: 12, width: 12 }} />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-purple-500" style={{ height: 12, width: 12 }} />
        </div>
    )
})

BottleNode.displayName = "BottleNode"

export default BottleNode
