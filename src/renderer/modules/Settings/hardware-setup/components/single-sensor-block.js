import { Check, Pencil, Trash2, X } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import ConfirmationPopup from "../../../../Components/Popup/ConfirmationPopup"
import { useDispatch, useSelector } from "react-redux"
import InputField from "../../../../Components/Input/Input"
import { useForm } from "react-hook-form"
import { removeSensor, updateSensor } from "../../../../../redux/reducers/settings/hardwareSetup"

export default function SinglePumpBlock(props) {
    const { sensor, sensorName } = props

    const [showDeleteConfirmationModel, setShowDeleteConfirmationModel] = useState(null)

    const [isModify, setIsModify] = useState(false)

    const containerBottles = useSelector((state) => state.hardwareSetup)

    const dispatch = useDispatch()

    const inputRef = useRef(null)

    const handleRemoveSensor = () => {
        dispatch(removeSensor({ sensorId: sensor.sensorId }))

        setShowDeleteConfirmationModel(false)
    }

    const { control, handleSubmit, setValue } = useForm({ defaultValues: { sensorName: "" } })

    const validateUniqueSensorName = (value) => {
        // Check if the value already exists in any bottle
        const isUnique = !containerBottles.sensor.some((el) => el.sensorName === value)

        // Return an error message if the name is not unique
        return isUnique || "Sensor name must be unique"
    }

    const inputName = `sensorName.${sensor.index}`

    const handleModify = () => {
        setValue(inputName, sensorName)
        setIsModify(true)
    }

    useEffect(() => {
        if (isModify && !!inputRef.current) {
            inputRef.current.focus()
        }
    }, [isModify])

    const handleSaveName = (data) => {
        dispatch(updateSensor({ sensorName: data.sensorName[sensor.index], sensorId: sensor.id }))

        setIsModify(false)
    }

    return (
        <>
            <div className="col-span-1 flex items-center border bg-neutral-100 border-neutral-300 rounded-lg justify-between p-3 text-neutral-700 mb-2">
                <div className="flex items-center flex-1 min-w-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    {isModify ? (
                        <InputField
                            name={inputName}
                            control={control}
                            placeholder="Enter unique sensor name"
                            rules={{ required: "Sensor name is required", validate: validateUniqueSensorName }}
                            inputRef={inputRef}
                            wrapperClassName="w-full"
                        />
                    ) : (
                        <span className="font-normal text-sm">
                            Name : <strong className="">{sensorName}</strong>
                        </span>
                    )}

                    <strong className="mx-4">|</strong>

                    <span className="font-normal text-sm flex-shrink-0">
                        Sensor : <strong>{sensor?.index}</strong>
                    </span>
                </div>

                {isModify ? (
                    <>
                        <button
                            onClick={handleSubmit(handleSaveName)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-green-300"
                        >
                            <Check className="h-5 w-5 text-green-500" />
                        </button>

                        <button
                            onClick={() => setIsModify(false)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-red-300"
                        >
                            <X className="h-5 w-5 text-red-500" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleModify}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-blue-300"
                        >
                            <Pencil className="h-5 w-5 text-blue-700" />
                        </button>

                        <button
                            onClick={() => setShowDeleteConfirmationModel(true)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-red-300"
                        >
                            <Trash2 className="h-5 w-5 text-red-500" />
                        </button>
                    </>
                )}
            </div>

            <ConfirmationPopup
                closePopup={() => setShowDeleteConfirmationModel(false)}
                isOpen={!!showDeleteConfirmationModel}
                header="Delete Sensor"
                desc="Are you sure to proceed?"
                handleConfirm={handleRemoveSensor}
            />
        </>
    )
}
