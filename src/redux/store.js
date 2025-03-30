import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"

import sequenceReducer from "./reducers/sequenceReducer"
import hardwareSetupReducer from "./reducers/settings/hardwareSetup"
import amediteReducer from "./reducers/settings/amedite"
import bottleMappingReducer from "./reducers/settings/bottleMapping"
import primingReducer from "./reducers/settings/prime/primingReducer"
import liquidDetectionReduce from "./reducers/settings/liquidDetection"
import uvSettingReduce from "./reducers/settings/uvSetting"
import pressureSettingReduce from "./reducers/settings/pressure"
import columnEditorReduce from "./reducers/settings/columnEditor"
import reagentReducer from "./reducers/settings/reagent"
import methodSetupReducer from "./reducers/methodSetup/methodSetup"
import formStateReducer from "./reducers/formState/formState"
import commandsReducer from "./reducers/commands/commands"
import toastStateReducer from "./reducers/toastStateReducer/toastStateReducer"

const rootReducer = combineReducers({
    // setting
    hardwareSetup: hardwareSetupReducer,
    amedite: amediteReducer,
    bottleMapping: bottleMappingReducer,
    priming: primingReducer,
    liquidDetection: liquidDetectionReduce,
    uvSetting: uvSettingReduce,
    pressure: pressureSettingReduce,
    columnEditor: columnEditorReduce,
    reagent: reagentReducer,
    // method setup
    methodSetup: methodSetupReducer,
    // sequence
    sequence: sequenceReducer,
    // is form dirty
    formState: formStateReducer,
    // toaster
    toastState: toastStateReducer,
    commands: commandsReducer
})

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: [
        "sequence",
        "amedite",
        "bottleMapping",
        "priming",
        "liquidDetection",
        "uvSetting",
        "pressure",
        "columnEditor",
        "reagent",
        "methodSetup",
        "commands",
        "hardwareSetup"
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } })
})

const persistor = persistStore(store)

export { store, persistor }
