import { createSlice } from "@reduxjs/toolkit";

// Initial state with the detector positions
const initialState = {
    detectors: [
        { position: "1", value: "", checked: false },
        { position: "2", value: "", checked: false },
        { position: "3", value: "", checked: false },
    ],
};

const uvSettingSlice = createSlice({
    name: "uvSetting",
    initialState,
    reducers: {
        // Update value for a specific position
        updateValue: (state, action) => {
            const { position, value } = action.payload;
            const detector = state.detectors.find((det) => det.position === position);
            if (detector) {
                detector.value = value;
            }
        },
        // Toggle checked status for a specific position
        toggleChecked: (state, action) => {
            const { position, checked } = action.payload;
            const detector = state.detectors.find((det) => det.position === position);
            if (detector) {
                detector.checked = checked;
            }
        },
        // Reset all detectors to initial state
        resetDetectors: () => initialState,
        // Set all detectors at once (useful for loading saved data)
        setDetectors: (state, action) => {
            state.detectors = action.payload;
        },
    },
});

export const { updateValue, toggleChecked, resetDetectors, setDetectors } = uvSettingSlice.actions;

export default uvSettingSlice.reducer;
