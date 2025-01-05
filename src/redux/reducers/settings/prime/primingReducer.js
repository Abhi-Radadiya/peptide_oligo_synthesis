import { createSlice } from "@reduxjs/toolkit";

const primingSlice = createSlice({
    name: "priming",
    initialState: {
        amedite: Array(24).fill({}),
        solvent: Array(10).fill({}),
    },
    reducers: {
        savePriming: (state, action) => {
            const { type, data } = action.payload;
            state[type] = data;
        },
    },
});

export const { savePriming } = primingSlice.actions;

export default primingSlice.reducer;
