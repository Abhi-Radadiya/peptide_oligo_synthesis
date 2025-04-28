// src/store/synthesisProcedureSlice.js (adjust path as needed)
import { createSlice } from "@reduxjs/toolkit"
// Assuming getUniqueId generates a unique string ID
import { getUniqueId } from "../../../renderer/Helpers/Constant" // Adjust path

const initialState = {
    // List of all saved flows
    savedProcedures: [],
    // ID of the currently loaded flow in the editor, null if none/new
    currentlyLoadedId: null
}

const synthesisProcedureSlice = createSlice({
    name: "synthesisProcedure", // Renamed for clarity if needed, ensure store config matches
    initialState,
    reducers: {
        // Payload should be: { name: string, nodes: [], edges: [] }
        addSynthesisProcedure: (state, action) => {
            if (!action.payload || !action.payload.name) {
                console.error("Add Error: Payload must include a 'name'.")
                return // Prevent adding invalid data
            }
            const newProcedure = {
                id: getUniqueId(), // Generate unique ID for the procedure itself
                ...action.payload // Includes name, nodes, edges
            }
            state.savedProcedures.unshift(newProcedure) // Add to the beginning
            // Optionally, set the newly added one as currently loaded
            state.currentlyLoadedId = newProcedure.id
        },
        // Payload should be the single ID (string) of the procedure to delete
        deleteSynthesisProcedure: (state, action) => {
            const idToDelete = action.payload
            state.savedProcedures = state.savedProcedures.filter((item) => item.id !== idToDelete)
            // If the deleted one was loaded, reset currently loaded ID
            if (state.currentlyLoadedId === idToDelete) {
                state.currentlyLoadedId = null
            }
        },
        // Payload should be { id: string, updatedData: { name, nodes, edges } }
        // Optional: Implement update if needed
        updateSynthesisProcedure: (state, action) => {
            const { id, updatedData } = action.payload
            const index = state.savedProcedures.findIndex((proc) => proc.id === id)
            if (index !== -1) {
                // Merge existing with updated data, keeping the ID
                state.savedProcedures[index] = { ...state.savedProcedures[index], ...updatedData }
            }
        },
        // Payload should be the ID (string) of the procedure to load, or null to clear
        loadProcedure: (state, action) => {
            const idToLoad = action.payload
            // Check if the procedure exists before setting it
            if (idToLoad === null || state.savedProcedures.some((p) => p.id === idToLoad)) {
                state.currentlyLoadedId = idToLoad
            } else {
                console.warn(`Procedure with ID ${idToLoad} not found.`)
                state.currentlyLoadedId = null // Reset if not found
            }
        },
        // Action to clear the current flow editor (sets currentlyLoadedId to null)
        clearCurrentFlow: (state) => {
            state.currentlyLoadedId = null
        }
    }
})

export const {
    addSynthesisProcedure,
    deleteSynthesisProcedure,
    updateSynthesisProcedure, // Export if you implement it
    loadProcedure,
    clearCurrentFlow
} = synthesisProcedureSlice.actions

// Selector to get the list of saved procedures
export const selectSavedProcedures = (state) => state.synthesisProcedure.savedProcedures // Adjust path based on store structure

// Selector to get the data of the currently loaded procedure
export const selectCurrentProcedureData = (state) => {
    const currentId = state.synthesisProcedure.currentlyLoadedId
    if (!currentId) return null // No flow loaded
    return state.synthesisProcedure.savedProcedures.find((p) => p.id === currentId) || null
}

export default synthesisProcedureSlice.reducer
