import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function LastDeBlock(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Solvent", value: selectedMethodData.last_deSolvent.label },
        { key: "Volume", value: `${selectedMethodData.last_deVolume} ml` },
        { key: "X - Factor", value: selectedMethodData.last_deXFactor },
        { key: "Flow Rate", value: `${selectedMethodData.last_deFlowRate} ml/min` },
        { key: "Wash Solvent", value: selectedMethodData.last_deWashSolvent.label },
        { key: "Wash Volume", value: `${selectedMethodData.last_deWashVolume} ml` },
        { key: "Wash X - Factor", value: selectedMethodData.last_deWashXFactor },
        { key: "Wash Flow Rate", value: `${selectedMethodData.last_deWashFlowRate} ml/min` },
        { key: "Waste Column", value: selectedMethodData.last_deWaste.label },
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
