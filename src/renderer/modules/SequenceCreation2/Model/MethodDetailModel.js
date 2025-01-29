import React from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";
import MethodDataDisplayComponent from "../Component/MethodDataDisplayComponent/MethodDataDisplayComponent";

export default function MethodDetailModel(props) {
    const { onClose } = props;

    return (
        <>
            <ModelWrapper header="Method details" width="w-[45%]" onClose={onClose}>
                <div className="-mx-2 max-h-[65vh] h-fit overflow-auto scrollbar-style">
                    {/*  TODO display method details */}
                    <MethodDataDisplayComponent />
                </div>

                <div className="flex flex-row justify-end w-full gap-2 mt-4">
                    <button onClick={onClose} className="text-sm hover:bg-neutral-100 transition-colors duration-300 rounded-lg px-4 py-1">
                        Close
                    </button>
                </div>
            </ModelWrapper>
        </>
    );
}

const sections = [
    {
        "1st": [{ "1_waste": "Waste column" }, { "1_primingWaste": "Priming waste column" }, { "1_XFactor": "Loop no." }, { "1_primingXFactor": "Priming loop no." }],
    },
    {
        nth: [
            { n_deWaste: "De waste column" },
            { n_couplingWaste: "Coupling waste column" },
            { n_oxidizationWaste: "Oxidization waste column" },
            { n_sulfurizationWaste: "Sulfurization waste column" },
            { n_extraWaste: "Extra waste column" },
            { n_cappingWaste: "Capping waste column" },
            { n_deXFactor: "De loop no." },
            { n_deWashXFactor: "De wash loop no." },
            { n_couplingXFactor: "Coupling loop no." },
            { n_couplingWashXFactor: "Coupling wash loop no." },
            { n_oxidizationXFactor: "Oxidization loop no." },
            { n_oxidizationWashXFactor: "Oxidization wash loop no." },
            { n_sulfurizationXFactor: "Sulfurization loop no." },
            { n_sulfurizationWashXFactor: "Sulfurization wash loop no." },
            { n_extraXFactor: "Extra loop no." },
            { n_extraWashXFactor: "Extra wash loop no." },
            { n_cappingAXFactor: "Capping A loop no." },
            { n_cappingBXFactor: "Capping B loop no." },
            { n_cappingWashXFactor: "Capping wash loop no." },
        ],
    },
    {
        last: [
            { last_deWaste: "De waste column" },
            { last_deaWaste: "Dea waste column" },
            { last_deaXFactor: "Dea loop no." },
            { last_deaWashXFactor: "Dea wash loop no." },
            { last_deXFactor: "De loop no." },
            { last_deWashXFactor: "De wash loop no." },
            { last_deVolume: "De volume" },
            { last_deWashVolume: "De wash volume" },
            { last_deaVolume: "Dea volume" },
            { last_deaWashVolume: "Dea wash volume" },
            { last_deaFlowRate: "Dea flow rate" },
            { last_deaWashFlowRate: "Dea wash flow rate" },
            { last_deFlowRate: "De flow rate" },
            { last_deWashFlowRate: "De wash flow rate" },
            { last_deCheck: "De check" },
            { last_deSolvent: "De solvent" },
            { last_deWashSolvent: "De wash solvent" },
            { last_deaSolvent: "Dea solvent" },
            { last_deaWashSolvent: "Dea wash solvent" },
        ],
    },
    {
        details: [
            { method_name: "Method name" },
            { columnSize: "Column Size" },
            { synthesisScale: "Synthesis scale" },
            { loadingTime: "Loading time" },
            { amediteExcessFactor: "Amedite excess factor" },
            { actExcessFactor: "ACT excess factor" },
            { amediteConcentration: "Amedite concentration" },
            { color: "Color" },
        ],
    },
];
