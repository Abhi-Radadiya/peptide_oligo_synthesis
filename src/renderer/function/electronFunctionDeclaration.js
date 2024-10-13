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

const savePrimeAmediteDetails = async (primePositions, primeOption) => {
    return await window.electron.savePrimeAmediteDetails(primePositions, primeOption);
};

export {
    getBottleMappingDetails,
    saveBottleMappingDetails,
    updateBottleMappingDetails,
    deleteBottleMappingDetails,
    saveBottleMappingData,
    getBottleMappingData,
    savePrimeAmediteDetails,
};
