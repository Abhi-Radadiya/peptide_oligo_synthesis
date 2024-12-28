import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false, text: "", icon: "" };

const toastState = createSlice({
    name: "toastState",
    initialState,
    reducers: {
        openToast: (state, action) => {
            state.isOpen = true;
            state.text = action.payload.text;
            state.icon = action.payload.icon;
        },
        closeToast: (state) => {
            state.isOpen = false;
            state.text = "";
            state.icon = "";
        },
    },
});

export const { openToast, closeToast } = toastState.actions;

export default toastState.reducer;
