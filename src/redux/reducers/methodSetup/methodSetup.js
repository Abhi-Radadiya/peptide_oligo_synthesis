import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/Helpers/Constant";

const initialState = {
    method: [],
};

const methodSetup = createSlice({
    name: "method",
    initialState,
    reducers: {
        addMethodSetup: (state, action) => {
            state.method = [{ id: getUniqueId(), ...action.payload }, ...state.method];
        },
        updateMethodSetup: (state, action) => {
            const index = state.method.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.method[index] = action.payload;
            }
        },
        deleteMethodSetup: (state, action) => {
            state.method = state.method.filter((item) => !action.payload.includes(item.id));
        },
    },
});

export const { addMethodSetup, updateMethodSetup, deleteMethodSetup } = methodSetup.actions;
export default methodSetup.reducer;
