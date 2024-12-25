import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function DeBlock(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Solvent", value: selectedMethodData.n_deSolvent.label },
        { key: "Volume", value: `${selectedMethodData.n_deVolume} ml` },
        { key: "X - Factor", value: selectedMethodData.n_deXFactor },
        { key: "Wash Solvent", value: selectedMethodData.n_deWashSolvent.label },
        { key: "Wash Volume", value: `${selectedMethodData.n_deWashVolume} ml` },
        { key: "Wash X - Factor", value: selectedMethodData.n_deWashXFactor },
        { key: "Waste Column", value: selectedMethodData.n_deWaste.label },
    ];

    return (
        <>
            <span className="font-medium text-base">De Block</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
