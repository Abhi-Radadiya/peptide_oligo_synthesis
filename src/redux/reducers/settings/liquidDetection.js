import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    detectors: [
        { position: "R1", threshold: "", checked: false, hardwareSensorId: "" },
        { position: "R2", threshold: "", checked: false, hardwareSensorId: "" },
        { position: "R3", threshold: "", checked: false, hardwareSensorId: "" },
        { position: "R4", threshold: "", checked: false, hardwareSensorId: "" },
        { position: "R5", threshold: "", checked: false, hardwareSensorId: "" }
    ]
}

const liquidDetectionSlice = createSlice({
    name: "liquidDetection",
    initialState,
    reducers: {
        updateThreshold: (state, action) => {
            const { position, threshold } = action.payload
            const detector = state.detectors.find((det) => det.position === position)
            if (detector) {
                detector.threshold = threshold
            }
        },
        toggleChecked: (state, action) => {
            const { position, checked } = action.payload
            const detector = state.detectors.find((det) => det.position === position)
            if (detector) {
                detector.checked = checked
            }
        },
        resetDetectors: () => initialState,
        setDetectors: (state, action) => {
            state.detectors = action.payload
        },
        assignSensor: (state, action) => {
            const { position, sensorId } = action.payload

            state.detectors = state.detectors.map((el) => {
                if (el.position === position) {
                    return { ...el, hardwareSensorId: sensorId }
                }

                return el
            })
        }
    }
})

export const { updateThreshold, toggleChecked, resetDetectors, setDetectors, assignSensor } = liquidDetectionSlice.actions

export default liquidDetectionSlice.reducer
