import React from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";
import DeBlock from "../../MethodSetup2/Tabs/Nth/Tabs/DeBlock";
import Coupling from "../../MethodSetup2/Tabs/Nth/Tabs/Coupling";
import Oxidization from "../../MethodSetup2/Tabs/Nth/Tabs/Oxidization";
import Capping from "../../MethodSetup2/Tabs/Nth/Tabs/Capping";
import Sulfurization from "../../MethodSetup2/Tabs/Nth/Tabs/Sulfurization";
import Extra from "../../MethodSetup2/Tabs/Nth/Tabs/Extra";
import MethodDetails from "../../MethodSetup2/Tabs/Details/MethodDetails";

export default function GeneralModel(props) {
    const { openModel, onClose } = props;

    const models = {
        deBlock: { component: DeBlock, description: "De block configuration" },
        coupling: { component: Coupling, description: "Coupling configuration" },
        oxidization: { component: Oxidization, description: "Oxidization configuration" },
        capping: { component: Capping, description: "Capping configuration" },
        sulfurization: { component: Sulfurization, description: "Sulfurization configuration" },
        extra: { component: Extra, description: "Extra configuration" },
        details: { component: MethodDetails, description: "Details" },
    };

    const ComponentToRender = models[openModel].component;

    return (
        <>
            <ModelWrapper desc={models[openModel].description} width={openModel === "details" ? "w-[48%]" : "w-[80%]"} onClose={onClose}>
                <ComponentToRender disabled={true} />
            </ModelWrapper>
        </>
    );
}
