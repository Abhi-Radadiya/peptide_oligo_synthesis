import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SelectionController } from "../../../../Components/Dropdown/Dropdown"
import { useForm } from "react-hook-form"
import InputField from "../../../../Components/Input/Input"
import { addSensor } from "../../../../../redux/reducers/settings/hardwareSetup"
import SingleSensorBlock from "../components/single-sensor-block"

export default function SensorSetup() {
    const { analogBoard, sensor } = useSelector((state) => state.hardwareSetup)

    const method = useForm({ defaultValues: { sensorName: "", selectedSensor: "" } })

    const { control, handleSubmit, reset } = method

    const dispatch = useDispatch()

    const handleAddSensor = (data) => {
        dispatch(addSensor({ sensor: data.selectedSensor.value, sensorName: data.sensorName }))

        reset()
    }

    const validateUniqueSensorName = (value) => {
        // Check if the value already exists in any bottle
        const isUnique = !sensor.some((el) => el.sensorName === value)

        // Return an error message if the name is not unique
        return isUnique || "Sensor name must be unique"
    }

    const [usedSensorIds, setUsedSensorIds] = useState([])

    const getSensorIds = () => {
        const usedSensorId = sensor.map((el) => {
            return el.sensor.id
        })

        setUsedSensorIds([...usedSensorId])
    }

    useEffect(() => {
        getSensorIds()
    }, [sensor])

    const sensorMenuItem = useMemo(() => {
        return analogBoard.flatMap((board, index) => {
            return board.sensors.map((sensorEl, sensorIndex) => {
                return {
                    label: `Sensor ${index * 8 + 1 + sensorIndex}`,
                    value: { id: sensorEl.id, index: index * 8 + 1 + sensorIndex },
                    isDisabled: usedSensorIds.includes(sensorEl.id)
                }
            })
        })
    }, [analogBoard, usedSensorIds, sensor])

    return (
        <>
            <div className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-3xl border border-amber-400 p-8">
                <div className="mx-auto space-y-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Sensor Setup</h2>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <InputField
                                    name="sensorName"
                                    control={control}
                                    label="Sensor Name"
                                    placeholder="Enter unique sensor name"
                                    rules={{ required: "Sensor name is required", validate: validateUniqueSensorName }}
                                />
                            </div>

                            <div className="col-span-1">
                                <SelectionController
                                    height={41.6}
                                    placeholder="Select Sensor"
                                    label="Select Sensor"
                                    menuItem={sensorMenuItem}
                                    name="selectedSensor"
                                    rules={{ required: "Sensor is required" }}
                                    control={control}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit(handleAddSensor)}
                            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:ring-2 ring-indigo-300 outline-1 ring-offset-2"
                        >
                            Add Sensor
                        </button>
                    </div>

                    <div
                        className={`bg-gradient-to-br flex flex-col from-purple-50 to-purple-100 rounded-lg border-neutral-200 border shadow-md p-6 transition-all duration-300 hover:shadow-lg`}
                    >
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Sensor</h2>

                        {sensor?.length === 0 ? (
                            <div className="flex items-center justify-center grow text-gray-500 italic">
                                <span>No sensors added yet</span>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-3 gap-4">
                                    {sensor?.map((sensorEl, index) => {
                                        return <SingleSensorBlock key={index} {...sensorEl} />
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
