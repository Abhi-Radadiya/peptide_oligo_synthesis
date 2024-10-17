// get any table data
const getTableData = async (tableName) => {
    return await window.electron.getTableData(tableName);
};

const getBottleMappingDetails = async (mappingOption) => {
    return await window.electron.getBottleMappingDetails(mappingOption);
};

const saveBottleMappingDetails = async (data, mappingOption) => {
    return await window.electron.saveBottleMappingDetails(data, mappingOption);
};

const updateBottleMappingDetails = async (amediteDetails, mappingOption) => {
    return await window.electron.updateBottleMappingDetails(amediteDetails, mappingOption);
};

const deleteBottleMappingDetails = async (id, mappingOption) => {
    return await window.electron.deleteBottleMappingDetails(id, mappingOption);
};

const saveBottleMappingData = async (mappingDetails, mappingOption) => {
    return await window.electron.saveBottleMappingData(mappingDetails, mappingOption);
};

const getBottleMappingData = async (mappingOption) => {
    return await window.electron.getBottleMappingData(mappingOption);
};

// prime function
const savePrimeDetails = async (primePositions, primeOption) => {
    return await window.electron.savePrimeDetails(primePositions, primeOption);
};

const getPrimePosition = async (primeOption) => {
    return await window.electron.getPrimePosition(primeOption);
};

// liquid detection

const saveLiquidDetectionDetails = async (details) => {
    return await window.electron.saveLiquidDetectionDetails(details);
};

const getLiquidDetection = async () => {
    return await window.electron.getLiquidDetection();
};

// UV Settings
const saveUVSettings = async (details) => {
    return await window.electron.saveUVSettings(details);
};

export {
    // get any table data
    getTableData,
    getBottleMappingDetails,
    saveBottleMappingDetails,
    updateBottleMappingDetails,
    deleteBottleMappingDetails,
    saveBottleMappingData,
    getBottleMappingData,
    savePrimeDetails,
    getPrimePosition,

    // liquid detection
    saveLiquidDetectionDetails,
    getLiquidDetection,

    // UV Settings
    saveUVSettings,
};
