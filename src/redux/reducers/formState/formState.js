import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formState: {
        isDirty: false,
    },
};

const methodSetup = createSlice({
    name: "formState",
    initialState,
    reducers: {
        updateFormState: (state, action) => {
            state.formState.isDirty = action.payload;
        },
    },
});

export const { updateFormState } = methodSetup.actions;

export default methodSetup.reducer;
