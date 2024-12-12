import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/modules/MethodSetup2/Constant";

const initialState = {
    reagentList: [],
};

const reagentSlice = createSlice({
    name: "reagent",
    initialState,
    reducers: {
        addReagent: (state, action) => {
            state.reagentList = [{ id: getUniqueId(), ...action.payload }, ...state.reagentList];
        },
        updateReagent: (state, action) => {
            const { id, data } = action.payload;
            state.reagentList = state.reagentList.map((el) => {
                if (el.id === id) {
                    return { ...el, ...data };
                }
                return el;
            });
        },
        deleteReagent: (state, action) => {
            const id = action.payload;
            state.reagentList = state.reagentList.filter((el) => el.id !== id);
        },
        deleteReagents: (state, action) => {
            const idsToDelete = action.payload;
            state.reagentList = state.reagentList.filter((el) => !idsToDelete.includes(el.id));
        },
    },
});

export const { addReagent, updateReagent, deleteReagent, deleteReagents } = reagentSlice.actions;
export default reagentSlice.reducer;
