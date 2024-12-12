import { createSlice } from "@reduxjs/toolkit";

const sequenceSlice = createSlice({
    name: "sequence",
    initialState: {
        sequence: [],
    },
    reducers: {
        addSequence: (state, action) => {
            const existingSequence = state.sequence.find((seq) => seq.name.toLowerCase() === action.payload.name.toLowerCase());

            if (!existingSequence) {
                state.sequence.unshift(action.payload);
            } else {
                throw new Error("Sequence with the same name already exists.");
            }
        },
        editSequence: (state, action) => {
            const { id, updatedSequence } = action.payload;
            const sequenceToUpdate = state.sequence.find((sequence) => sequence.id === id);

            if (sequenceToUpdate) {
                sequenceToUpdate.block = updatedSequence.block;
                sequenceToUpdate.name = updatedSequence.name;
            }
        },
        deleteSequence: (state, action) => {
            state.sequence = state.sequence.filter((sequence) => sequence.id !== action.payload);
        },
    },
});

export const { addSequence, editSequence, deleteSequence } = sequenceSlice.actions;

export default sequenceSlice.reducer;
