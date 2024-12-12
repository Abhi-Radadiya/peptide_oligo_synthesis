import { createSlice } from "@reduxjs/toolkit";

const primeSolventSlice = createSlice({
    name: "primeSolvent",
    initialState: {
        primeSolvents: {
            prime_solvent_1: {},
            prime_solvent_2: {},
            prime_solvent_3: {},
            prime_solvent_4: {},
            prime_solvent_5: {},
            prime_solvent_6: {},
            prime_solvent_7: {},
            prime_solvent_8: {},
            prime_solvent_9: {},
            prime_solvent_10: {},
        },
    },
    reducers: {
        savePrimeSolvent: (state, action) => {
            state.primeSolvents = action.payload;
        },

        updatePrimeSolvent: (state, action) => {
            const { key, value } = action.payload;
            state.primeSolvents[key] = {
                ...state.primeSolvents[key],
                ...value,
            };
        },

        updatePrimeSolventValue: (state, action) => {
            const { key, value } = action.payload;
            state.primeSolvents[key] = {
                ...state.primeSolvents[key],
                value,
            };
        },

        togglePrimeSolventCheck: (state, action) => {
            const key = action.payload;
            const currentCheck = state.primeSolvents[key]?.check;
            state.primeSolvents[key] = {
                ...state.primeSolvents[key],
                check: !currentCheck,
            };
        },

        clearPrimeSolvent: (state, action) => {
            const key = action.payload;
            state.primeSolvents[key] = {};
        },

        resetPrimeSolvent: (state) => {
            state.primeSolvents = Object.fromEntries(Object.keys(state.primeSolvents).map((key) => [key, {}]));
        },
    },
});

export const { savePrimeSolvent, updatePrimeSolvent, updatePrimeSolventValue, togglePrimeSolventCheck, clearPrimeSolvent, resetPrimeSolvent } = primeSolventSlice.actions;

export default primeSolventSlice.reducer;
