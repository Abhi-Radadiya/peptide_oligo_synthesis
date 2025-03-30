import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SelectionController } from "../../../../Components/Dropdown/Dropdown"
import { useForm } from "react-hook-form"
import InputField from "../../../../Components/Input/Input"
import { addPump } from "../../../../../redux/reducers/settings/hardwareSetup"
import SinglePumpBlock from "../components/single-pump-block"

export default function PumpSetup() {
    const { analogBoard, pump } = useSelector((state) => state.hardwareSetup)

    const method = useForm({ defaultValues: { pumpName: "", selectedPump: "" } })

    const { control, handleSubmit, reset } = method

    const pumpMenuItem = useMemo(() => {
        return analogBoard.map((el, index) => {
            return { label: `Pump ${index + 1}`, value: { pumpId: el.pumpId, index: index + 1 }, isDisabled: pump.some((pumpEl) => pumpEl.pump.pumpId === el.pumpId) }
        })
    }, [analogBoard, pump])

    const dispatch = useDispatch()

    const handleAddPump = (data) => {
        dispatch(addPump({ pump: data.selectedPump.value, pumpName: data.pumpName }))

        reset()
    }

    const validateUniquePumpName = (value) => {
        // Check if the value already exists in any bottle
        const isUnique = !pump.some((el) => el.pumpName === value)

        // Return an error message if the name is not unique
        return isUnique || "Pump name must be unique"
    }

    return (
        <>
            <div className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-3xl border border-amber-400 p-8">
                <div className="mx-auto space-y-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Pump Setup</h2>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <InputField
                                    name="pumpName"
                                    control={control}
                                    label="Pump Name"
                                    placeholder="Enter unique pump name"
                                    rules={{ required: "Pump name is required", validate: validateUniquePumpName }}
                                />
                            </div>

                            <div className="col-span-1">
                                <SelectionController
                                    height={41.6}
                                    placeholder="Select Pump"
                                    label="Select Pump"
                                    menuItem={pumpMenuItem}
                                    name="selectedPump"
                                    rules={{ required: "Pump is required" }}
                                    control={control}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit(handleAddPump)}
                            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:ring-2 ring-indigo-300 outline-1 ring-offset-2"
                        >
                            Add Pump
                        </button>
                    </div>

                    <div
                        className={`bg-gradient-to-br flex flex-col from-purple-50 to-purple-100 rounded-lg border-neutral-200 border shadow-md p-6 transition-all duration-300 hover:shadow-lg`}
                    >
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Pump</h2>

                        {pump.length === 0 ? (
                            <div className="flex items-center justify-center grow text-gray-500 italic">
                                <span>No pumps added yet</span>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3 pr-2 -mr-2 max-h-[210px] pb-2 overflow-auto scrollbar-style">
                                    {pump.map((pump, index) => {
                                        return <SinglePumpBlock key={index} {...pump} />
                                    })}
                                </div>

                                <div className="grow" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
