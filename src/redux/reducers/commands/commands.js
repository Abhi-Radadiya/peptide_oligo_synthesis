import { createSlice } from "@reduxjs/toolkit"
import { getUniqueId } from "../../../renderer/Helpers/Constant"

const initialState = {
    commands: []
}

const commandsSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {
        addCommand: (state, action) => {
            // schema : {id : uniqueId uuid , commands, name }
            const newCommand = { id: getUniqueId(), ...action.payload }
            state.commands.push(newCommand)
        },

        editCommand: (state, action) => {
            const { id } = action.payload
            state.commands = state.commands.map((el) => {
                if (el.id === id) {
                    return { ...el, ...action.payload }
                }

                return el
            })
        },

        deleteCommand: (state, action) => {
            const commandIds = action.payload
            state.commands = state.commands.filter((command) => !commandIds.includes(command.id))
        }
    }
})

export const { addCommand, editCommand, deleteCommand } = commandsSlice.actions

export default commandsSlice.reducer
