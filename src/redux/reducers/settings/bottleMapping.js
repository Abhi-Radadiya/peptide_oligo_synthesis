import { createSlice } from "@reduxjs/toolkit";

const bottleMappingSlice = createSlice({
    name: "bottleMapping",
    initialState: {
        mappingData: {},
    },
    reducers: {
        saveBottleMapping: (state, action) => {
            state.mappingData = action.payload;
        },

        updateBottleMapping: (state, action) => {
            const { key, value } = action.payload;
            state.mappingData[key] = value;
        },

        clearBottleMapping: (state, action) => {
            const key = action.payload;
            delete state.mappingData[key];
        },

        resetBottleMapping: (state) => {
            state.mappingData = {};
        },
    },
});

export const { saveBottleMapping, updateBottleMapping, clearBottleMapping, resetBottleMapping } = bottleMappingSlice.actions;

export default bottleMappingSlice.reducer;
