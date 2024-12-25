import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function Sulfurization(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Solvent", value: selectedMethodData.n_sulfurizationSolvent.label },
        { key: "Volume", value: `${selectedMethodData.n_sulfurizationVolume} ml` },
        { key: "X - Factor", value: selectedMethodData.n_sulfurizationXFactor },
        { key: "Wash Solvent", value: selectedMethodData.n_sulfurizationWashSolvent.label },
        { key: "Wash Volume", value: `${selectedMethodData.n_sulfurizationWashVolume} ml` },
        { key: "Wash X - Factor", value: selectedMethodData.n_sulfurizationWashXFactor },
        { key: "Waste Column", value: selectedMethodData.n_sulfurizationWaste.label },
    ];

    return (
        <>
            <span className="font-medium text-base">Sulfurization</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    console.log("el =:= ", el);
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
