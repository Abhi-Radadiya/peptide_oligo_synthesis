import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sequenceReducer from "./reducers/sequenceReducer";
import amediteReducer from "./reducers/settings/amedite";
import bottleMappingReducer from "./reducers/settings/bottleMapping";
import primeAmediteReducer from "./reducers/settings/prime/primeAmedite";
import primeSolventReducer from "./reducers/settings/prime/primeSolvent";
import liquidDetectionReduce from "./reducers/settings/liquidDetection";
import uvSettingReduce from "./reducers/settings/uvSetting";
import pressureSettingReduce from "./reducers/settings/pressure";
import columnEditorReduce from "./reducers/settings/columnEditor";
import reagentReducer from "./reducers/settings/reagent";
import methodSetupReducer from "./reducers/methodSetup/methodSetup";
import formStateReducer from "./reducers/formState/formState";
import toastStateReducer from "./reducers/toastStateReducer/toastStateReducer";

const rootReducer = combineReducers({
    // setting
    amedite: amediteReducer,
    bottleMapping: bottleMappingReducer,
    primeAmedite: primeAmediteReducer,
    primeSolvent: primeSolventReducer,
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
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: [
        "sequence",
        "amedite",
        "bottleMapping",
        "primeAmedite",
        "primeSolvent",
        "liquidDetection",
        "uvSetting",
        "pressure",
        "columnEditor",
        "reagent",
        "methodSetup",
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
});

const persistor = persistStore(store);

export { store, persistor };
