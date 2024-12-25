import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function Extra(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Solvent", value: selectedMethodData.n_extraSolvent.label },
        { key: "Volume", value: `${selectedMethodData.n_extraVolume} ml` },
        { key: "X - Factor", value: selectedMethodData.n_extraXFactor },
        { key: "Wash Solvent", value: selectedMethodData.n_extraWashSolvent.label },
        { key: "Wash Volume", value: `${selectedMethodData.n_extraWashVolume} ml` },
        { key: "Wash X - Factor", value: selectedMethodData.n_extraWashXFactor },
        { key: "Waste Column", value: selectedMethodData.n_extraWaste.label },
    ];

    return (
        <>
            <span className="font-medium text-base">Sulfurization</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
