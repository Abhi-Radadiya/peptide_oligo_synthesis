export const COLUMN_SIZE = "COLUMN SIZE"
export const SYNTHESIS_SCALE = "SYNTHESIS SCALE"
export const AMEDITE = "AMEDITE %"
export const ACT = "ACT %"
export const AMEDITE_CONC = "AMEDITE CONC."
export const WASH_COLUMN = "WASH COLUMN"
export const PRIME = "PRIME"
export const COUPLING = "COUPLING"
export const OXIDIZATION = "OXIDIZATION"
export const SULFURIZATION = "SULFURIZATION"
export const CAP_A_B = "CAP A/B"
export const FINAL_DE_BLOCK = "FINAL DE BLOCK"
export const DEA = "DEA"

const detailsGroup = {
    [COLUMN_SIZE]: ["columnSize"],
    [SYNTHESIS_SCALE]: ["synthesisScale"],
    [AMEDITE]: ["amediteExcessFactor"],
    [ACT]: ["actExcessFactor"],
    [AMEDITE_CONC]: ["amediteConcentration"],
    [WASH_COLUMN]: [""],
    [PRIME]: ["1_primingWaste", "1_primingXFactor", "1_primingFlowRate", "1_primingVolume", "1_primingPosition", "1_primingProcedure"],
    [COUPLING]: [
        "n_couplingWaste",
        "n_couplingXFactor",
        "n_couplingWashXFactor",
        "n_couplingVolume",
        "n_couplingAmediteVolume",
        "n_couplingActVolume",
        "n_couplingWashVolume",
        "n_couplingFlowRate",
        "n_couplingSolvent",
        "n_couplingMixTime",
        "n_couplingWashSolvent",
        "n_couplingWashFlowRate"
    ],
    [OXIDIZATION]: [
        "n_oxidizationWaste",
        "n_oxidizationXFactor",
        "n_oxidizationWashXFactor",
        "n_oxidizationVolume",
        "n_oxidizationWashVolume",
        "n_oxidizationSolvent",
        "n_oxidizationFlowRate",
        "n_oxidizationWashSolvent",
        "n_oxidizationWashFlowRate"
    ],
    [SULFURIZATION]: ["n_sulfurizationWaste", "n_sulfurizationXFactor", "n_sulfurizationWashXFactor", "n_sulfurizationVolume", "n_sulfurizationWashVolume"],
    [CAP_A_B]: [
        "n_cappingWaste",
        "n_cappingAXFactor",
        "n_cappingBXFactor",
        "n_cappingWashXFactor",
        "n_cappingAVolume",
        "n_cappingBVolume",
        "n_cappingWashVolume",
        "n_cappingASolvent",
        "n_cappingAFlowRate",
        "n_cappingBSolvent",
        "n_cappingBFlowRate",
        "n_cappingWashSolvent",
        "n_cappingWashFlowRate"
    ],
    [FINAL_DE_BLOCK]: [
        "last_deWaste",
        "last_deXFactor",
        "last_deWashXFactor",
        "last_deVolume",
        "last_deWashVolume",
        "last_deFlowRate",
        "last_deWashFlowRate",
        "last_deUVEnable",
        "last_deCheck",
        "last_deSolvent",
        "last_deWashSolvent",
        "last_deBlockProcedure",
        "last_deBlockWashProcedure"
    ],
    [DEA]: [
        "last_deaWaste",
        "last_deaXFactor",
        "last_deaWashXFactor",
        "last_deaVolume",
        "last_deaWashVolume",
        "last_deaFlowRate",
        "last_deaWashFlowRate",
        "last_deaSolvent",
        "last_deaWashSolvent",
        "last_deaProcedure",
        "last_deaWashProcedure"
    ]
}

export const tableColumns = [
    { label: COLUMN_SIZE, detailsGroupName: detailsGroup[COLUMN_SIZE] },
    { label: SYNTHESIS_SCALE, detailsGroupName: detailsGroup[SYNTHESIS_SCALE] },
    { label: AMEDITE, detailsGroupName: detailsGroup[AMEDITE] },
    { label: ACT, detailsGroupName: detailsGroup[ACT] },
    { label: AMEDITE_CONC, detailsGroupName: detailsGroup[AMEDITE_CONC] },
    { label: WASH_COLUMN, detailsGroupName: detailsGroup[WASH_COLUMN] },
    { label: PRIME, detailsGroupName: detailsGroup[PRIME] },
    { label: COUPLING, detailsGroupName: detailsGroup[COUPLING] },
    { label: OXIDIZATION, detailsGroupName: detailsGroup[OXIDIZATION] },
    { label: SULFURIZATION, detailsGroupName: detailsGroup[SULFURIZATION] },
    { label: CAP_A_B, detailsGroupName: detailsGroup[CAP_A_B] },
    { label: FINAL_DE_BLOCK, detailsGroupName: detailsGroup[FINAL_DE_BLOCK] },
    { label: DEA, detailsGroupName: detailsGroup[DEA] }
]
