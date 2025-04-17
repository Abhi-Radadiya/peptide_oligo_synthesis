import React from "react"
import { useForm } from "react-hook-form"
import StepForm from "../components/step-form"

export default function CreateSynthesisProcedure() {
    const data = [
        {
            type: "valve",
            afterDelay: 2000, // (ms) default 0
            procedure: [
                {
                    valveSection: "amedite",
                    container: { name: "container1" },
                    valve: { id: "xxxxx", name: "" },
                    afterCloseTime: 1090 // ms
                },
                {
                    valveSection: "reagent",
                    container: { name: "container1" },
                    valve: { id: "xxxxx", name: "" },
                    afterCloseTime: 1090 // ms
                }
            ]
        },
        {
            afterDelay: 0,
            type: "valve",
            procedure: [
                {
                    valveSection: "waste",
                    valve: { id: "xxxxx", name: "" },
                    afterCloseTime: 1090 // ms
                },
                {
                    valveSection: "other",
                    valve: { id: "xxxxx", name: "" },
                    afterCloseTime: 1090 // ms
                }
            ]
        },
        {
            afterDelay: 1200,
            type: "pump",
            procedure: [
                {
                    type: "pump",
                    pump: { id: "xxxxx", name: "" },
                    rpm: 100,
                    runningParameter: "time",
                    time: 1200, //(ms)
                    dischargeableVolume: null // (ml)
                },
                {
                    pump: { id: "xxxxx", name: "" },
                    rpm: 800,
                    runningParameter: "liquidVolume",
                    time: null, //(ms)
                    dischargeableVolume: 120 // (ml)
                }
            ]
        },
        {
            type: "liquidSensor",
            afterDelay: 0,
            procedure: [
                {
                    sensor: { id: "xxxxx", name: "" },
                    threshold: 200
                }
            ]
        }
    ]

    const method = useForm({
        defaultValues: {
            type: "",
            afterDelay: 0,
            procedure: []
        }
    })

    return (
        <>
            <div className="p-4 overflow-auto h-[95vh]">
                <StepForm />
            </div>
        </>
    )
}
