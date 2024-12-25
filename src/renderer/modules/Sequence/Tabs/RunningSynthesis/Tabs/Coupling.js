import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function Coupling(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Solvent", value: selectedMethodData.n_couplingSolvent.label },
        { key: "Volume", value: `${selectedMethodData.n_couplingVolume} ml` },
        { key: "X - Factor", value: selectedMethodData.n_couplingXFactor },
        { key: "Flow Rate", value: `${selectedMethodData.n_couplingFlowRate} ml/min` },
        { key: "Mix Time", value: `${selectedMethodData.n_couplingMixTime} min` },
        { key: "Amedite Volume", value: `${selectedMethodData.n_couplingAmediteVolume} ml` },
        { key: "Act Volume", value: `${selectedMethodData.n_couplingActVolume} ml` },
        { key: "Wash Solvent", value: selectedMethodData.n_couplingWashSolvent.label },
        { key: "Wash Volume", value: `${selectedMethodData.n_couplingWashVolume} ml` },
        { key: "Wash X - Factor", value: selectedMethodData.n_couplingWashXFactor },
        { key: "Waste Column", value: selectedMethodData.n_couplingWaste.label },
    ];

    return (
        <>
            <span className="font-medium text-base">Coupling</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
