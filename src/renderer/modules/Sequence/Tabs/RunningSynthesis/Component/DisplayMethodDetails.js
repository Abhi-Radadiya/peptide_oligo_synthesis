import React, { useEffect, useState } from "react";
import Details from "../Tabs/Details";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useWindowSize } from "@uidotdev/usehooks";
import ColumnWash from "../Tabs/ColumnWash";
import DeBlock from "../Tabs/DeBlock";
import Coupling from "../Tabs/Coupling";
import Oxidization from "../Tabs/Oxidization";
import Sulfurization from "../Tabs/Sulfurization";
import Extra from "../Tabs/Extra";
import Capping from "../Tabs/Capping";
import LastDeBlock from "../Tabs/LastDeBlock";
import Dea from "../Tabs/Dea";

const data = {
    id: "e8c86c8f-7d86-4335-9399-d923f6faed1b",
    color: "#971c7d",
    method_name: "METHOD XYZ",
    columnSize: {
        label: "20 MLS",
        value: {
            id: "d3f8dd6d-7536-4ff4-a563-7bf777d0c179",
            volume: "20",
            flowRate: "20",
        },
    },
    synthesisScale: "12",
    loadingTime: "23",
    amediteExcessFactor: "45",
    actExcessFactor: "56",
    amediteConcentration: "5",
    actVolume: 137.45,
    amediteVolume: 108,
    deliveryTimeAct: 4.696,
    totalCouplingVolume: 245.45,
    deliveryTimeAmedite: 5.976,

    "1_waste": { label: 1, value: 1 },
    "1_XFactor": 1,
    "1_volume": "20",
    "1_flowRate": "120",
    "1_solvent": {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },

    n_deWaste: { label: 1, value: 1 },
    n_couplingWaste: { label: 1, value: 1 },
    n_oxidizationWaste: { label: 1, value: 1 },
    n_sulfurizationWaste: { label: 1, value: 1 },
    n_extraWaste: { label: 1, value: 1 },
    n_cappingWaste: { label: 1, value: 1 },
    last_deWaste: { label: 1, value: 1 },
    last_deaWaste: { label: 1, value: 1 },
    last_deaXFactor: 1,
    last_deaWashXFactor: 1,
    last_deXFactor: 1,
    last_deWashXFactor: 1,
    n_deXFactor: 1,
    n_deWashXFactor: 1,
    n_couplingXFactor: 1,
    n_couplingWashXFactor: 1,
    n_oxidizationXFactor: 1,
    n_oxidizationWashXFactor: 1,
    n_sulfurizationXFactor: 1,
    n_sulfurizationWashSolvent: { label: "Amedite 1", value: "d83ef78c-85d1-48d1-9f0a-b2633734faed" },
    n_sulfurizationSolvent: { label: "Amedite 1", value: "d83ef78c-85d1-48d1-9f0a-b2633734faed" },
    n_sulfurizationWashXFactor: 1,
    n_extraXFactor: 1,
    n_extraWashXFactor: 1,
    n_cappingAXFactor: 1,
    n_cappingBXFactor: 1,
    n_cappingWashXFactor: 1,
    hasOxidization: true,

    n_deVolume: "20",
    n_deWashVolume: "20",
    n_couplingVolume: "20",
    n_couplingAmediteVolume: "20",
    n_couplingActVolume: "20",
    n_couplingWashVolume: "20",
    n_oxidizationVolume: "20",
    n_oxidizationWashVolume: "20",
    n_sulfurizationVolume: "20",
    n_sulfurizationWashVolume: "20",
    n_extraVolume: "20",
    n_extraWashVolume: "20",
    n_cappingAVolume: 54,
    n_cappingBVolume: 54,
    n_cappingWashVolume: "20",

    n_deSolvent: {
        label: "Amedite 2",
        value: "d60815e6-793b-4154-a46c-3cf8c68e9271",
    },
    n_deFlowRate: "22",
    n_deWashSolvent: {
        label: "Amedite 2",
        value: "d60815e6-793b-4154-a46c-3cf8c68e9271",
    },
    n_deWashFlowRate: "22",
    n_couplingSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_couplingFlowRate: "12",
    n_couplingMixTime: "20",
    n_couplingWashSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_couplingWashFlowRate: "12",
    n_oxidizationSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_oxidizationFlowRate: "12",
    n_oxidizationWashSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_oxidizationWashFlowRate: "12",
    n_cappingASolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_cappingAFlowRate: "12",
    n_cappingBSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_cappingBFlowRate: "12",
    n_cappingWashSolvent: {
        label: "Amedite 2",
        value: "d60815e6-793b-4154-a46c-3cf8c68e9271",
    },
    n_cappingWashFlowRate: "22",

    last_deSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    last_deFlowRate: "12",
    last_deWashSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    last_deWashFlowRate: "12",
    last_deaSolvent: {
        label: "Amedite 3",
        value: "9f44ee15-f48f-4731-8bcb-6eb7565833ed",
    },
    last_deaFlowRate: "55",
    last_deaWashSolvent: {
        label: "Amedite 2",
        value: "d60815e6-793b-4154-a46c-3cf8c68e9271",
    },
    last_deaWashFlowRate: "22",
    last_deVolume: "20",
    last_deWashVolume: "20",
    last_deaVolume: "20",
    last_deaWashVolume: "20",
};

const flags = {
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
    first_wash: ["1_waste", "1_XFactor", "1_volume", "1_flowRate", "1_solvent"],
    n_block: ["n_deSolvent", "n_deVolume", "n_deXFactor", "n_deWashSolvent", "n_deWashVolume", "n_deWashXFactor", "n_deUVEnable", "n_deCheck", "n_deWaste"],
    n_coupling: [
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
    n_oxidization: [
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
    n_sulfurization: [
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
    n_extra: ["n_extraSolvent", "n_extraVolume", "n_extraXFactor", "n_extraWashSolvent", "n_extraWashVolume", "n_extraWashXFactor", "n_extraWaste"],
    n_capping: [
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
    last_deBlock: [
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
    last_dea: [
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
};

const DisplayMethodDetails = React.memo((props) => {
    const { currentBlock } = props;

    const { watch } = useFormContext();

    const methods = useSelector((state) => state.methodSetup.method);

    const component = {
        [`${undefined}`]: Details,
        details: Details,
        first_wash: ColumnWash,
        n_block: DeBlock,
        n_coupling: Coupling,
        n_oxidization: Oxidization,
        n_sulfurization: Sulfurization,
        n_extra: Extra,
        n_capping: Capping,
        last_deBlock: LastDeBlock,
        last_dea: Dea,
    };

    const ComponentToRender = component[watch("selectedOptionToDisplay")?.value];

    const selectedMethodData = methods?.find((el) => el.id === currentBlock?.method?.value);

    const { height: windowHeight } = useWindowSize();

    return (
        <>
            <div className="px-4 py-4 rounded-lg border-neutral-300 border shadow overflow-auto scrollbar-style" style={{ height: windowHeight - 220 }}>
                <ComponentToRender selectedMethodData={data} />
            </div>
        </>
    );
});

export default DisplayMethodDetails;
