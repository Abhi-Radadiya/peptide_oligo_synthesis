import { createSlice } from "@reduxjs/toolkit";

const primeAmediteSlice = createSlice({
    name: "primeAmedite",
    initialState: {
        primeAmedites: {
            prime_amedite_1: {},
            prime_amedite_2: {},
            prime_amedite_3: {},
            prime_amedite_4: {},
            prime_amedite_5: {},
            prime_amedite_6: {},
            prime_amedite_7: {},
            prime_amedite_8: {},
            prime_amedite_9: {},
            prime_amedite_10: {},
            prime_amedite_11: {},
            prime_amedite_12: {},
            prime_amedite_13: {},
            prime_amedite_14: {},
            prime_amedite_15: {},
            prime_amedite_16: {},
            prime_amedite_17: {},
            prime_amedite_18: {},
            prime_amedite_19: {},
            prime_amedite_20: {},
            prime_amedite_21: {},
            prime_amedite_22: {},
            prime_amedite_23: {},
            prime_amedite_24: {},
        },
    },
    reducers: {
        savePrimeAmedite: (state, action) => {
            state.primeAmedites = action.payload;
        },

        updatePrimeAmedite: (state, action) => {
            const { key, value } = action.payload;
            state.primeAmedites[key] = {
                ...state.primeAmedites[key],
                ...value,
            };
        },

        updatePrimeAmediteValue: (state, action) => {
            const { key, value } = action.payload;
            state.primeAmedites[key] = {
                ...state.primeAmedites[key],
                value,
            };
        },

        togglePrimeAmediteCheck: (state, action) => {
            const key = action.payload;
            const currentCheck = state.primeAmedites[key]?.check;
            state.primeAmedites[key] = {
                ...state.primeAmedites[key],
                check: !currentCheck,
            };
        },

        clearPrimeAmedite: (state, action) => {
            const key = action.payload;
            state.primeAmedites[key] = {};
        },

        resetPrimeAmedite: (state) => {
            state.primeAmedites = Object.fromEntries(Object.keys(state.primeAmedites).map((key) => [key, {}]));
        },
    },
});

export const { savePrimeAmedite, updatePrimeAmedite, updatePrimeAmediteValue, togglePrimeAmediteCheck, clearPrimeAmedite, resetPrimeAmedite } = primeAmediteSlice.actions;

export default primeAmediteSlice.reducer;
