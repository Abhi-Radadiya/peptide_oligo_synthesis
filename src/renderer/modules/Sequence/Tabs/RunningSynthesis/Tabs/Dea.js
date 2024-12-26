import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function Dea(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Solvent", value: selectedMethodData.last_deaSolvent.label },
        { key: "Volume", value: `${selectedMethodData.last_deaVolume} ml` },
        { key: "X - Factor", value: selectedMethodData.last_deaXFactor },
        { key: "Flow Rate", value: `${selectedMethodData.last_deaFlowRate} ml/min` },
        { key: "Wash Solvent", value: selectedMethodData.last_deaWashSolvent.label },
        { key: "Wash Volume", value: `${selectedMethodData.last_deaWashVolume} ml` },
        { key: "Wash X - Factor", value: selectedMethodData.last_deaWashXFactor },
        { key: "Wash Flow Rate", value: `${selectedMethodData.last_deaWashFlowRate} ml/min` },
        { key: "Waste Column", value: selectedMethodData.last_deaWaste.label },
    ];

    return (
        <>
            <span className="font-medium text-base">DEA</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
