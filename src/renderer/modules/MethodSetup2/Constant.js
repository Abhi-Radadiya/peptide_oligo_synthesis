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
