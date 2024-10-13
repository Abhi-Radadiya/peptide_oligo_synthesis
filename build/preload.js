const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    saveBottleMappingData: (data, mappingOption) => ipcRenderer.invoke("save-bottle-mapping-positions", data, mappingOption),
    getBottleMappingData: (mappingOption) => ipcRenderer.invoke("get-bottle-mapping-positions", mappingOption),
    saveBottleMappingDetails: (details, mappingOption) => ipcRenderer.invoke("save-bottle-mapping-details", details, mappingOption),
    getBottleMappingDetails: (mappingOption) => ipcRenderer.invoke("get-bottle-mapping-details", mappingOption),
    updateBottleMappingDetails: (amediteDetails, mappingOption) => ipcRenderer.invoke("update-bottle-mapping-details", amediteDetails, mappingOption),
    deleteBottleMappingDetails: (id, mappingOption) => ipcRenderer.invoke("delete-bottle-mapping-details", id, mappingOption),
    savePrimeAmediteDetails: (primeAmediteData) => ipcRenderer.invoke("save-prime-position-details", primeAmediteData),
});

// listPorts: () => ipcRenderer.invoke("list-ports"),
// openPort: (port) => ipcRenderer.invoke("open-port", port),
// sendData: (data) => ipcRenderer.invoke("send-data", data),
// onSerialData: (callback) => {
//     ipcRenderer.on("serial-data", (event, data) => callback(data));
//     return () => ipcRenderer.removeAllListeners("serial-data");
// },
// onPortStatus: (callback) => {
//     ipcRenderer.on("port-status", (event, status) => callback(status));
//     return () => ipcRenderer.removeAllListeners("port-status");
// },
// getPortInfo: () => ipcRenderer.invoke("get-port-info"),
// onPortDisconnected: (callback) => {
//     ipcRenderer.on("port-disconnected", () => callback());
//     return () => ipcRenderer.removeAllListeners("port-disconnected");
// },
