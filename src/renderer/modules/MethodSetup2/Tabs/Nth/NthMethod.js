import React from "react";
import DeBlock from "./Tabs/DeBlock";
import Coupling from "./Tabs/Coupling";
import Oxidization from "./Tabs/Oxidization";
import Sulfurization from "./Tabs/Sulfurization";
import Extra from "./Tabs/Extra";
import Capping from "./Tabs/Capping.js";
import CheckAdditionComponent from "../../Components/CheckAdditionComponent/CheckAdditionComponent";
import { useFormContext } from "react-hook-form";

export default function NthMethod() {
    const { watch } = useFormContext();

    return (
        <>
            <CheckAdditionComponent />

            <DeBlock />
            <Coupling />
            {watch("hasOxidization") && <Oxidization />}
            {watch("hasSulfurization") && <Sulfurization />}
            {watch("hasExtra") && <Extra />}
            <Capping />
        </>
    );
}
