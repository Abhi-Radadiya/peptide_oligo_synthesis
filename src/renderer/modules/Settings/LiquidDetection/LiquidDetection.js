import React, { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import InputField from "../../../Components/Input/Input"
import { assignSensor, setDetectors } from "../../../../redux/reducers/settings/liquidDetection"
import { openToast } from "../../../../redux/reducers/toastStateReducer/toastStateReducer"
import { SUCCESS } from "../../../Helpers/Icons"
import { SelectionController } from "../../../Components/Dropdown/Dropdown"

export default function LiquidDetection() {
    const dispatch = useDispatch()
    const detectors = useSelector((state) => state.liquidDetection.detectors)

    console.log(`detectors : `, detectors)

    const { control, handleSubmit, getValues } = useForm({
        defaultValues: detectors.reduce((form, item) => {
            form[item.position] = {
                threshold: item.threshold,
                checked: item.checked
            }
            return form
        }, {})
    })

    const saveThreshold = async (data) => {
        try {
            const detectorSettings = detectors.map((detector) => ({
                position: detector.position,
                threshold: data[detector.position]?.threshold || "",
                checked: data[detector.position]?.checked || false
            }))

            dispatch(openToast({ text: "Liquid detection saved successfully.", icon: SUCCESS }))

            dispatch(setDetectors(detectorSettings))

            // dispatch(assignSensor(detectorSettings))
        } catch (error) {
            console.error("Failed to save liquid detection settings:", error)
        }
    }

    const { sensor } = useSelector((state) => state.hardwareSetup)

    const sensorMenuItem = useMemo(() => {
        return sensor.map((el) => ({ label: el.sensorName, value: { sensorId: el.sensor.id } }))
    }, [sensor])

    const validateUniqueSensor = (value) => {
        console.log(`value : `, value)

        const allSelectedSensors = Object.keys(getValues("detectors"))
            .map((el) => getValues("detectors")[el]?.sensor?.value?.sensorId)
            .filter(Boolean)

        //  TODO : Need to be unique sensor
        const isAlreadyUsed = allSelectedSensors.includes(value?.value?.sensorId)

        return isAlreadyUsed ? "Each selection must have a unique sensor." : true
    }

    return (
        <>
            <div className="overflow-x-auto p-4 border border-neutral-300 rounded-xl bg-neutral-50 w-fit">
                <div className="flex flex-row justify-between mb-4">
                    <h1 className="text-xl font-medium">Threshold</h1>

                    <button className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]" onClick={handleSubmit(saveThreshold)}>
                        Save
                    </button>
                </div>

                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Position</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Threshold</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Disabled</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Sensor</th>
                        </tr>
                    </thead>

                    <tbody>
                        {detectors.map((el, index) => {
                            return (
                                <tr key={index} className="border-b hover:bg-gray-100 even:bg-neutral-50">
                                    <td className="py-3 px-6">
                                        <span>{el.position}</span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <InputField control={control} name={`${el.position}.threshold`} placeholder={`Enter ${el.position} threshold`} type={"number"} />
                                    </td>
                                    <td className="py-3 px-6">
                                        <InputField width="w-5" className="h-5" control={control} name={`${el.position}.checked`} type={"checkbox"} />
                                    </td>
                                    <td className="py-3 px-6">
                                        <SelectionController
                                            width={300}
                                            placeholder="Select sensor"
                                            rules={{ validate: validateUniqueSensor }}
                                            control={control}
                                            name={`detectors.${el.position}.sensor`}
                                            menuItem={sensorMenuItem}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
