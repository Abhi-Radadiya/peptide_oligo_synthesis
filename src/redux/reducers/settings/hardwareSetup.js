import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/Helpers/Constant";

const initialState = {
    amediteContainer: { container1: { bottles: [] }, container2: { bottles: [] }, container3: { bottles: [] } },
    reagentContainer: { container1: { bottles: [] }, container2: { bottles: [] } },
    wasteContainer: { bottles: [] },
    analogBoard: [],
    valveBoard: []
};

const hardwareSetupSlice = createSlice({
    name: "hardwareSetup",
    initialState,
    reducers: {
        addAmediteContainerBottle: (state, action) => {
            const { bottleName, containerName, valve } = action.payload;

            state.amediteContainer[containerName].bottles = [...(state.amediteContainer?.[containerName]?.bottles ?? []), { id: getUniqueId(), bottleName, valve }];
        },

        removeAmediteContainerBottle: (state, action) => {
            const { bottleId, containerName } = action.payload;

            const selectedContainerBottles = state.amediteContainer[containerName].bottles;

            state.amediteContainer[containerName].bottles = selectedContainerBottles.filter((el) => el.id !== bottleId);
        },

        updateValve: (state, action) => {
            const { bottleName, containerName, bottleId, containerType } = action.payload;

            const updatedBottleIndex = state[containerType][containerName].bottles.findIndex((el) => el.id === bottleId);

            if (bottleName) state[containerType][containerName].bottles[updatedBottleIndex].bottleName = bottleName;
        },

        addReagentContainerBottle: (state, action) => {
            const { bottleName, containerName, valve } = action.payload;

            state.reagentContainer[containerName].bottles = [...(state.reagentContainer?.[containerName]?.bottles ?? []), { id: getUniqueId(), bottleName, valve }];
        },

        removeReagentContainerBottle: (state, action) => {
            const { bottleId, containerName } = action.payload;

            const selectedContainerBottles = state.reagentContainer[containerName].bottles;

            state.reagentContainer[containerName].bottles = selectedContainerBottles.filter((el) => el.id !== bottleId);
        },

        addWasteContainerBottle: (state, action) => {
            const { bottleName, valve } = action.payload;

            state.wasteContainer.bottles = [...(state.wasteContainer.bottles ?? []), { id: getUniqueId(), bottleName, valve }];
        },

        removeWasteContainerBottle: (state, action) => {
            const { bottleId } = action.payload;

            state.wasteContainer.bottles = state.wasteContainer.bottles.filter((el) => el.id !== bottleId);
        },

        addBoard: (state, action) => {
            const { boardType, boardData } = action.payload;

            state[boardType] = [...state[boardType], boardData];
        },

        deleteBoard: (state, action) => {
            const { boardType, boardId } = action.payload;

            state[boardType] = state[boardType].filter((el) => {
                return el.boardId !== boardId;
            });
        },

        updateWasteContainerValve: (state, action) => {
            const { bottleName, bottleId } = action.payload;

            const updatedBottleIndex = state.wasteContainer.bottles.findIndex((el) => el.id === bottleId);

            if (bottleName) state.wasteContainer.bottles[updatedBottleIndex].bottleName = bottleName;
        }
    }
});

export const {
    addBoard,
    updateValve,
    deleteBoard,
    addWasteContainerBottle,
    addReagentContainerBottle,
    addAmediteContainerBottle,
    updateWasteContainerValve,
    removeWasteContainerBottle,
    removeAmediteContainerBottle,
    removeReagentContainerBottle
} = hardwareSetupSlice.actions;

export default hardwareSetupSlice.reducer;
