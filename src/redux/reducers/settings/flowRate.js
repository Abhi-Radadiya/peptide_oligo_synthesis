import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/modules/MethodSetup2/Constant";

const initialState = {
    items: [],
};

const flowRateSlice = createSlice({
    name: "flowRate",
    initialState,
    reducers: {
        addFlowRate: (state, action) => {
            state.items = [{ id: getUniqueId(), ...action.payload }, ...state.items];
        },
        updateFlowRate: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteFlowRates: (state, action) => {
            state.items = state.items.filter((item) => !action.payload.includes(item.id));
        },
    },
});

export const { addFlowRate, updateFlowRate, deleteFlowRates } = flowRateSlice.actions;
export default flowRateSlice.reducer;
