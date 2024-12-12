import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/modules/MethodSetup2/Constant";

const initialState = {
    positions: [
        { id: getUniqueId(), position: "Main", setValue: "", tripValue: "", disable: false, file: null },
        { id: getUniqueId(), position: "Amedite", setValue: "", tripValue: "", disable: false, file: null },
        { id: getUniqueId(), position: "Solvent", setValue: "", tripValue: "", disable: false, file: null },
        { id: getUniqueId(), position: "Empty C.", setValue: "", tripValue: "", disable: false, file: null },
    ],
};

const pressureSlice = createSlice({
    name: "pressure",
    initialState,
    reducers: {
        updateFile: (state, action) => {
            const { id, file } = action.payload;
            const pos = state.positions.find((p) => p.id === id);
            if (pos) {
                pos.file = file;
            }
        },
        updatePositions: (state, action) => {
            state.positions = action.payload;
        },
        deletePositions: (state, action) => {
            state.positions = state.positions.filter((pos) => !action.payload.includes(pos.id));
        },
    },
});

export const { updateFile, updatePositions, deletePositions } = pressureSlice.actions;
export default pressureSlice.reducer;
