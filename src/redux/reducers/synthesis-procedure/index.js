import { createSlice } from "@reduxjs/toolkit"
import { getUniqueId } from "../../../renderer/Helpers/Constant"

const initialState = {
    synthesisProcedure: []
}

const synthesisProcedureReducer = createSlice({
    name: "synthesis-procedure",
    initialState,
    reducers: {
        addSynthesisProcedure: (state, action) => {
            state.synthesisProcedure = [{ id: getUniqueId(), ...action.payload }, ...state.synthesisProcedure]
        },
        deleteSynthesisProcedure: (state, action) => {
            state.synthesisProcedure = state.synthesisProcedure.filter((item) => !action.payload.includes(item.id))
        }
    }
})

export const { addSynthesisProcedure, deleteSynthesisProcedure } = synthesisProcedureReducer.actions

export default synthesisProcedureReducer.reducer
