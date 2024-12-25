import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function Oxidization(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Solvent", value: selectedMethodData.n_oxidizationSolvent.label },
        { key: "Volume", value: `${selectedMethodData.n_oxidizationVolume} ml` },
        { key: "X - Factor", value: selectedMethodData.n_oxidizationXFactor },
        { key: "Wash Solvent", value: selectedMethodData.n_oxidizationWashSolvent.label },
        { key: "Wash Volume", value: `${selectedMethodData.n_oxidizationWashVolume} ml` },
        { key: "Wash X - Factor", value: selectedMethodData.n_oxidizationWashXFactor },
        { key: "Waste Column", value: selectedMethodData.n_oxidizationWaste.label },
    ];

    return (
        <>
            <span className="font-medium text-base">Oxidization</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
