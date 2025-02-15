import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/Helpers/Constant";

const initialState = {
    commands: [],
};

const commandsSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {
        addCommand: (state, action) => {
            const newCommand = { id: getUniqueId(), ...action.payload };
            state.commands.push(newCommand);
        },

        editCommand: (state, action) => {
            const { id, newCommand } = action.payload;
            const index = state.commands.findIndex((command) => command.id === id);
            if (index !== -1) {
                state.commands[index] = newCommand;
            }
        },

        deleteCommand: (state, action) => {
            const commandIds = action.payload;
            state.commands = state.commands.filter((command) => !commandIds.includes(command.id));
        },
    },
});

export const { addCommand, editCommand, deleteCommand } = commandsSlice.actions;

export default commandsSlice.reducer;
