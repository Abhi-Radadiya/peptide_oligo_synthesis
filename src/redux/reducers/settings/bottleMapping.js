import { createSlice } from "@reduxjs/toolkit";

const bottleMappingSlice = createSlice({
    name: "bottleMapping",
    initialState: {
        amedite: Array(24).fill({}),
        solvent: Array(10).fill({}),
    },
    reducers: {
        saveBottleMapping: (state, action) => {
            const { type, data } = action.payload;
            state[type] = data;
        },
    },
});

export const { saveBottleMapping } = bottleMappingSlice.actions;

export default bottleMappingSlice.reducer;
