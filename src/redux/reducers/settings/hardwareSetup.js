import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../../renderer/Helpers/Constant";

const initialState = {
    amediteContainer: { container1: { bottles: [] }, container2: { bottles: [] }, container3: { bottles: [] } },
    reagentContainer: { container1: { bottles: [] }, container2: { bottles: [] } },
    wasteContainer: { bottles: [] }
};

const hardwareSetupSlice = createSlice({
    name: "hardwareSetup",
    initialState,
    reducers: {
        addAmediteContainerBottle: (state, action) => {
            const { bottleName, containerName } = action.payload;

            state.amediteContainer[containerName].bottles = [...(state.amediteContainer?.[containerName]?.bottles ?? []), { id: getUniqueId(), bottleName }];
        },

        removeAmediteContainerBottle: (state, action) => {
            const { bottleId, containerName } = action.payload;

            const selectedContainerBottles = state.amediteContainer[containerName].bottles;

            state.amediteContainer[containerName].bottles = selectedContainerBottles.filter((el) => el.id !== bottleId);
        },

        addReagentContainerBottle: (state, action) => {
            const { bottleName, containerName } = action.payload;

            state.reagentContainer[containerName].bottles = [...(state.reagentContainer?.[containerName]?.bottles ?? []), { id: getUniqueId(), bottleName }];
        },

        removeReagentContainerBottle: (state, action) => {
            const { bottleId, containerName } = action.payload;

            const selectedContainerBottles = state.reagentContainer[containerName].bottles;

            state.reagentContainer[containerName].bottles = selectedContainerBottles.filter((el) => el.id !== bottleId);
        },

        addWasteContainerBottle: (state, action) => {
            const { bottleName } = action.payload;

            state.wasteContainer.bottles = [...(state.wasteContainer.bottles ?? []), { id: getUniqueId(), bottleName }];
        },

        removeWasteContainerBottle: (state, action) => {
            const { bottleId } = action.payload;

            state.wasteContainer.bottles = state.wasteContainer.bottles.filter((el) => el.id !== bottleId);
        }
    }
});

export const {
    addAmediteContainerBottle,
    removeAmediteContainerBottle,
    addReagentContainerBottle,
    removeReagentContainerBottle,
    addWasteContainerBottle,
    removeWasteContainerBottle
} = hardwareSetupSlice.actions;

export default hardwareSetupSlice.reducer;
