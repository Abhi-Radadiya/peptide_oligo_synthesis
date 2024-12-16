import React, { useState } from "react";
import ToggleSwitch from "../../../Components/FormController/Switch";

export default function SelectedSequence(props) {
    const { selectedSequence } = props;

    return (
        <>
            {selectedSequence?.block?.map((el, index) => {
                return <span className="mx-5">{el.block}</span>;
            })}
        </>
    );
}
