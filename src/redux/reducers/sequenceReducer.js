import { createSlice } from "@reduxjs/toolkit";

const sequenceSlice = createSlice({
    name: "sequence",
    initialState: {
        sequence: [],
    },
    reducers: {
        addSequence: (state, action) => {
            const existingSequence = state?.sequence?.find((seq) => seq.name.toLowerCase() === action.payload.name.toLowerCase());

            if (!existingSequence) {
                state.sequence.unshift(action.payload);
            } else {
                throw new Error("Sequence with the same name already exists.");
            }
        },
        editSequence: (state, action) => {
            console.log(`action.payload : `, action.payload);

            const { id, name } = action.payload;

            const nameConflict = state.sequence.find((sequence) => sequence.name.toLowerCase() === name.toLowerCase() && sequence.id !== id);

            if (nameConflict) {
                throw new Error("Sequence with the same name already exists.");
            }

            const sequenceToUpdateIndex = state.sequence.findIndex((sequence) => sequence.id === id);

            if (sequenceToUpdateIndex !== -1) {
                state.sequence[sequenceToUpdateIndex] = { ...state.sequence[sequenceToUpdateIndex], ...action.payload };
            }
        },
        deleteSequence: (state, action) => {
            state.sequence = state.sequence.filter((sequence) => sequence.id !== action.payload);
        },
    },
});

export const { addSequence, editSequence, deleteSequence } = sequenceSlice.actions;

export default sequenceSlice.reducer;
