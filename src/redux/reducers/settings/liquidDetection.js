import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detectors: [
        { position: "R1", threshold: "", checked: false },
        { position: "R2", threshold: "", checked: false },
        { position: "R3", threshold: "", checked: false },
        { position: "R4", threshold: "", checked: false },
        { position: "R5", threshold: "", checked: false },
        { position: "A1", threshold: "", checked: false },
    ],
};

const liquidDetectionSlice = createSlice({
    name: "liquidDetection",
    initialState,
    reducers: {
        updateThreshold: (state, action) => {
            const { position, threshold } = action.payload;
            const detector = state.detectors.find((det) => det.position === position);
            if (detector) {
                detector.threshold = threshold;
            }
        },
        toggleChecked: (state, action) => {
            const { position, checked } = action.payload;
            const detector = state.detectors.find((det) => det.position === position);
            if (detector) {
                detector.checked = checked;
            }
        },
        resetDetectors: () => initialState,
        setDetectors: (state, action) => {
            state.detectors = action.payload;
        },
    },
});

export const { updateThreshold, toggleChecked, resetDetectors, setDetectors } = liquidDetectionSlice.actions;

export default liquidDetectionSlice.reducer;