import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/Helpers/Constant";

const amediteSlice = createSlice({
    name: "amedite",
    initialState: {
        amediteList: [],
    },
    reducers: {
        addAmedite: (state, action) => {
            const existingAmedite = state.amediteList.find((item) => item.full_name === action.payload.full_name);

            if (!existingAmedite) {
                state.amediteList = [{ ...action.payload, id: getUniqueId() }, ...state.amediteList];
            } else {
                throw new Error("Amedite with the same case number already exists.");
            }
        },
        updateAmedite: (state, action) => {
            const { id } = action.payload;

            const amediteIndex = state.amediteList.findIndex((item) => item.id === id);

            if (amediteIndex !== -1) {
                state.amediteList[amediteIndex] = {
                    ...state.amediteList[amediteIndex],
                    ...action.payload,
                };
            } else {
                throw new Error("Amedite with the specified case number not found.");
            }
        },
        deleteAmedites: (state, action) => {
            const idsToDelete = action.payload;
            state.amediteList = state.amediteList.filter((el) => !idsToDelete.includes(el.id));
        },
        deleteAmedite: (state, action) => {
            state.amediteList = state.amediteList.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addAmedite, updateAmedite, deleteAmedite, deleteAmedites } = amediteSlice.actions;

export default amediteSlice.reducer;
