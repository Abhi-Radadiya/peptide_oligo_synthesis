import { v4 as uuidv4 } from "uuid";

export const wasteMenuItems = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
];

export const amedites = [
    { label: "A", value: "a" },
    { label: "C", value: "c" },
    { label: "mA", value: "mA" },
    { label: "fC", value: "fC" },
];

export const methodOption = [
    {
        label: "First",
        options: [{ label: "Column wash", value: "first_wash" }],
    },
    {
        label: "Nth",
        options: [
            { label: "De block", value: "n_block" },
            { label: "Coupling", value: "n_coupling" },
            { label: "Oxidization", value: "n_oxidization" },
            { label: "Sulfurization", value: "n_sulfurization" },
            { label: "Capping", value: "n_capping" },
            { label: "Extra", value: "n_extra" },
        ],
    },
    {
        label: "Last",
        options: [
            { label: "De block", value: "last_deBlock" },
            { label: "DEA", value: "last_dea" },
        ],
    },
];

export const getUniqueId = () => uuidv4();

const flags = {
    details: {
        details: [
            "color",
            "method_name",
            "columnSize",
            "synthesisScale",
            "loadingTime",
            "amediteExcessFactor",
            "actExcessFactor",
            "amediteConcentration",
            "actVolume",
            "amediteVolume",
            "deliveryTimeAct",
            "totalCouplingVolume",
            "deliveryTimeAmedite",
        ],
    },
    1: {
        columnWash: ["1_waste", "1_XFactor", "1_volume", "1_flowRate", "1_solvent"],
    },
    n: {
        deBlock: ["n_deSolvent", "n_deVolume", "n_deXFactor", "n_deWashSolvent", "n_deWashVolume", "n_deWashXFactor", "n_deUVEnable", "n_deCheck", "n_deWaste"],
        amedite: [
            "n_couplingSolvent",
            "n_couplingVolume",
            "n_couplingXFactor",
            "n_couplingFlowRate",
            "n_couplingMixTime",
            "n_couplingAmediteVolume",
            "n_couplingActVolume",
            "n_couplingWashSolvent",
            "n_couplingWashVolume",
            "n_couplingWashXFactor",
            "n_couplingUVEnable",
            "n_couplingCheck",
            "n_couplingWaste",
        ],
        oxidization: [
            "n_oxidizationSolvent",
            "n_oxidizationVolume",
            "n_oxidizationXFactor",
            "n_oxidizationWashSolvent",
            "n_oxidizationWashVolume",
            "n_oxidizationWashXFactor",
            "n_oxidizationConductivity",
            "n_oxidizationCheck",
            "n_oxidizationWaste",
        ],
        sulfurization: [
            "n_sulfurizationSolvent",
            "n_sulfurizationVolume",
            "n_sulfurizationXFactor",
            "n_sulfurizationWashSolvent",
            "n_sulfurizationWashVolume",
            "n_sulfurizationWashXFactor",
            "n_sulfurizationConductivityEnable",
            "n_sulfurizationCheck",
            "n_sulfurizationWaste",
        ],
        extra: ["n_extraSolvent", "n_extraVolume", "n_extraXFactor", "n_extraWashSolvent", "n_extraWashVolume", "n_extraWashXFactor", "n_extraWaste"],
        capping: [
            "n_cappingASolvent",
            "n_cappingAVolume",
            "n_cappingAXFactor",
            "n_cappingBSolvent",
            "n_cappingBVolume",
            "n_cappingBXFactor",
            "n_cappingWashSolvent",
            "n_cappingWashVolume",
            "n_cappingWashXFactor",
            "n_cappingWaste",
        ],
    },
    last: {
        deBlock: [
            "last_deSolvent",
            "last_deVolume",
            "last_deXFactor",
            "last_deFlowRate",
            "last_deWashSolvent",
            "last_deWashVolume",
            "last_deWashXFactor",
            "last_deWashFlowRate",
            "last_deUVEnable",
            "last_deCheck",
            "last_deWaste",
        ],
        dea: [
            "last_deaSolvent",
            "last_deaVolume",
            "last_deaXFactor",
            "last_deaFlowRate",
            "last_deaWashSolvent",
            "last_deaWashVolume",
            "last_deaWashXFactor",
            "last_deaWashFlowRate",
            "last_deaWaste",
        ],
    },
};

export const findAmediteLabel = (amediteList, amediteId) => {
    return amediteList.find((el) => amediteId === el.id)?.full_name;
};

export const getTextColorForBackground = (backgroundColor) => {
    // Convert hex color to RGB
    const hexToRgb = (hex) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    };

    // Calculate luminance
    const calculateLuminance = (r, g, b) => {
        const a = [r, g, b].map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    // Get RGB values from the background color
    const rgb = hexToRgb(backgroundColor);

    if (!rgb) return "#000000"; // Default to black if color is invalid

    const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

    // Use white text for dark backgrounds and black text for light backgrounds
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
};
