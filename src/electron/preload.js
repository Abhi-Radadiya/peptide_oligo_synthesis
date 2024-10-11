const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    saveBottleMappingData: (data, mappingOption) => ipcRenderer.invoke("save-bottle-mapping-positions", data, mappingOption),
    getBottleMappingData: (mappingOption) => ipcRenderer.invoke("get-bottle-mapping-positions", mappingOption),
    saveBottleMappingDetails: (details, mappingOption) => ipcRenderer.invoke("save-bottle-mapping-details", details, mappingOption),
    getBottleMappingDetails: (mappingOption) => ipcRenderer.invoke("get-bottle-mapping-details", mappingOption),
    updateBottleMappingDetails: (amediteDetails, mappingOption) => ipcRenderer.invoke("update-bottle-mapping-details", amediteDetails, mappingOption),
    deleteBottleMappingDetails: (id, mappingOption) => ipcRenderer.invoke("delete-bottle-mapping-details", id, mappingOption),
});
