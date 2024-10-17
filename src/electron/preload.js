const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    // get any table data
    getTableData: (tableName) => ipcRenderer.invoke("get-table-data", tableName),

    saveBottleMappingData: (data, mappingOption) => ipcRenderer.invoke("save-bottle-mapping-positions", data, mappingOption),
    getBottleMappingData: (mappingOption) => ipcRenderer.invoke("get-bottle-mapping-positions", mappingOption),
    saveBottleMappingDetails: (details, mappingOption) => ipcRenderer.invoke("save-bottle-mapping-details", details, mappingOption),
    getBottleMappingDetails: (mappingOption) => ipcRenderer.invoke("get-bottle-mapping-details", mappingOption),
    updateBottleMappingDetails: (amediteDetails, mappingOption) => ipcRenderer.invoke("update-bottle-mapping-details", amediteDetails, mappingOption),
    deleteBottleMappingDetails: (id, mappingOption) => ipcRenderer.invoke("delete-bottle-mapping-details", id, mappingOption),
    onUpdateAvailable: (callback) => ipcRenderer.on("update_available", callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on("update_downloaded", callback),

    // setting - prime
    savePrimeDetails: (primePositions, primeOption) => ipcRenderer.invoke("save-prime-position-details", primePositions, primeOption),
    getPrimePosition: (primeOption) => ipcRenderer.invoke("get-prime-position", primeOption),

    // liquid detection
    saveLiquidDetectionDetails: (details) => ipcRenderer.invoke("save-liquid-detection-details", details),
    getLiquidDetection: () => ipcRenderer.invoke("get-liquid-detection"),

    // UV Settings
    saveUVSettings: (details) => ipcRenderer.invoke("save-UV-setting-details", details),
});

// // listPorts: () => ipcRenderer.invoke("list-ports"),
// // openPort: (port) => ipcRenderer.invoke("open-port", port),
// // sendData: (data) => ipcRenderer.invoke("send-data", data),
// // onSerialData: (callback) => {
// //     ipcRenderer.on("serial-data", (event, data) => callback(data));
// //     return () => ipcRenderer.removeAllListeners("serial-data");
// // },
// // onPortStatus: (callback) => {
// //     ipcRenderer.on("port-status", (event, status) => callback(status));
// //     return () => ipcRenderer.removeAllListeners("port-status");
// // },
// // getPortInfo: () => ipcRenderer.invoke("get-port-info"),
// // onPortDisconnected: (callback) => {
// //     ipcRenderer.on("port-disconnected", () => callback());
// //     return () => ipcRenderer.removeAllListeners("port-disconnected");
// // },

// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("api", {
//     onUpdateAvailable: (callback) => ipcRenderer.on("update_available", callback),
//     onUpdateDownloaded: (callback) => ipcRenderer.on("update_downloaded", callback),
// });
