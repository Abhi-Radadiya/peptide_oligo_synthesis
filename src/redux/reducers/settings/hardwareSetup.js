import { createSlice } from "@reduxjs/toolkit"
import { getUniqueId } from "../../../renderer/Helpers/Constant"

const initialState = {
    amediteContainer: { container1: { bottles: [] }, container2: { bottles: [] }, container3: { bottles: [] } },
    reagentContainer: { container1: { bottles: [] }, container2: { bottles: [] } },
    wasteContainer: { bottles: [] },
    otherValve: { topValve: {}, bottomValve: {}, rgValve: {}, wasteValve: {} },
    analogBoard: [],
    valveBoard: [],
    pump: [],
    sensor: []
}

const hardwareSetupSlice = createSlice({
    name: "hardwareSetup",
    initialState,
    reducers: {
        addAmediteContainerBottle: (state, action) => {
            const { bottleName, containerName, valve } = action.payload

            // TODO : Need to remove id: getUniqueId as used once at updateValve and removeValve
            state.amediteContainer[containerName].bottles = [...(state.amediteContainer?.[containerName]?.bottles ?? []), { id: getUniqueId(), bottleName, valve }]
        },

        removeAmediteContainerBottle: (state, action) => {
            const { bottleId, containerName } = action.payload

            const selectedContainerBottles = state.amediteContainer[containerName].bottles

            state.amediteContainer[containerName].bottles = selectedContainerBottles.filter((el) => el.id !== bottleId)
        },

        updateValve: (state, action) => {
            const { bottleName, containerName, bottleId, containerType } = action.payload

            const updatedBottleIndex = state[containerType][containerName].bottles.findIndex((el) => el.id === bottleId)

            if (bottleName) state[containerType][containerName].bottles[updatedBottleIndex].bottleName = bottleName
        },

        addReagentContainerBottle: (state, action) => {
            const { bottleName, containerName, valve } = action.payload

            state.reagentContainer[containerName].bottles = [...(state.reagentContainer?.[containerName]?.bottles ?? []), { id: getUniqueId(), bottleName, valve }]
        },

        removeReagentContainerBottle: (state, action) => {
            const { bottleId, containerName } = action.payload

            const selectedContainerBottles = state.reagentContainer[containerName].bottles

            state.reagentContainer[containerName].bottles = selectedContainerBottles.filter((el) => el.id !== bottleId)
        },

        addWasteContainerBottle: (state, action) => {
            const { bottleName, valve } = action.payload

            state.wasteContainer.bottles = [...(state.wasteContainer.bottles ?? []), { id: getUniqueId(), bottleName, valve }]
        },

        removeWasteContainerBottle: (state, action) => {
            const { bottleId } = action.payload

            state.wasteContainer.bottles = state.wasteContainer.bottles.filter((el) => el.id !== bottleId)
        },

        addBoard: (state, action) => {
            const { boardType, boardData } = action.payload

            state[boardType] = [...state[boardType], boardData]
        },

        deleteBoard: (state, action) => {
            const { boardType, boardId } = action.payload

            state[boardType] = state[boardType].filter((el) => {
                return el.boardId !== boardId
            })
        },

        updateWasteContainerValve: (state, action) => {
            const { bottleName, bottleId } = action.payload

            const updatedBottleIndex = state.wasteContainer.bottles.findIndex((el) => el.id === bottleId)

            if (bottleName) state.wasteContainer.bottles[updatedBottleIndex].bottleName = bottleName
        },

        updateOtherValve: (state, action) => {
            const { valveType, assignedValve } = action.payload

            state.otherValve[valveType] = { ...assignedValve, id: getUniqueId() }
        },

        // Pump operation
        addPump: (state, action) => {
            state.pump = [...state.pump, action.payload]
        },

        removePump: (state, action) => {
            const { pumpId } = action.payload

            state.pump = state.pump.filter((el) => el.pump.pumpId !== pumpId)
        },

        updatePump: (state, action) => {
            const { pumpId, pumpName } = action.payload

            state.pump = state.pump.map((el) => {
                if (el.pump.pumpId === pumpId) {
                    return { ...el, pumpName }
                }
                return el
            })
        },

        // sensor operation
        addSensor: (state, action) => {
            state.sensor = [...state.sensor, action.payload]
        },

        removeSensor: (state, action) => {
            const { sensorId } = action.payload

            state.sensor = state.sensor.filter((el) => el.sensor.sensorId !== sensorId)
        },

        updateSensor: (state, action) => {
            const { sensorId, sensorName } = action.payload

            console.log(`sensorId, sensorName : `, sensorId, sensorName)

            state.sensor = state.sensor.map((el) => {
                console.log(`el.sensor.sensorId : `, el.sensor.sensorId)

                if (el.sensor.sensorId === sensorId) {
                    return { ...el, sensorName }
                }
                return el
            })
        }
    }
})

export const {
    addPump,
    addBoard,
    addSensor,
    removePump,
    updatePump,
    updateValve,
    deleteBoard,
    removeSensor,
    updateSensor,
    updateOtherValve,
    addWasteContainerBottle,
    addReagentContainerBottle,
    addAmediteContainerBottle,
    updateWasteContainerValve,
    removeWasteContainerBottle,
    removeAmediteContainerBottle,
    removeReagentContainerBottle
} = hardwareSetupSlice.actions

export default hardwareSetupSlice.reducer
