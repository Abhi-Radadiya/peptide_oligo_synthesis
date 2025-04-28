import { createSlice } from "@reduxjs/toolkit"
import { getUniqueId } from "../../../renderer/Helpers/Constant"

const initialState = {
    positions: [
        { name: "10 Barrel", id: getUniqueId() },
        { name: "50 Barrel", id: getUniqueId() },
        { name: "5 MLS", id: getUniqueId() },
        { name: "20 MLS", id: getUniqueId() }
    ]
}

const columnSlice = createSlice({
    name: "column",
    initialState,
    reducers: {
        addPosition: (state, action) => {
            state.positions = [{ id: getUniqueId(), ...action.payload }, ...state.positions]
        },
        updatePosition: (state, action) => {
            const { id } = action.payload
            state.positions = state.positions.map((el) => {
                if (el.id === id) {
                    return { ...el, ...action.payload }
                }
                return el
            })
        },
        deletePositions: (state, action) => {
            const idsToDelete = action.payload
            state.positions = state.positions.filter((el) => !idsToDelete.includes(el.id))
        }
    }
})

export const { addPosition, updatePosition, deletePositions } = columnSlice.actions
export default columnSlice.reducer
