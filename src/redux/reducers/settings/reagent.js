import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/Helpers/Constant";

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
            const { id } = action.payload;

            const solventIndex = state.reagentList.findIndex((item) => item.id === id);

            if (solventIndex !== -1) {
                state.reagentList[solventIndex] = {
                    ...state.reagentList[solventIndex],
                    ...action.payload,
                };
            } else {
                throw new Error("Solvent with the specified case number not found.");
            }
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
