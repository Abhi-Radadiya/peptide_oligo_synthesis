import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function Details(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Method Name", value: selectedMethodData.method_name },
        { key: "Color", value: selectedMethodData.color },
        { key: "Column Size", value: selectedMethodData.columnSize.label },
        { key: "Synthesis Scale", value: `${selectedMethodData.synthesisScale}` },
        { key: "Loading Time", value: `${selectedMethodData.loadingTime} min` },
        { key: "Amedite Excess Factor", value: `${selectedMethodData.amediteExcessFactor}` },
        { key: "ActExcess Factor", value: `${selectedMethodData.actExcessFactor}` },
        { key: "Amedite Concentration", value: `${selectedMethodData.amediteConcentration}` },
        { key: "Act Volume", value: `${selectedMethodData.actVolume} ml` },
        { key: "Amedite Volume", value: `${selectedMethodData.amediteVolume} ml` },
        { key: "Delivery Time Act", value: `${selectedMethodData.deliveryTimeAct} ml/min` },
        { key: "Total Coupling Volume", value: `${selectedMethodData.totalCouplingVolume} ml` },
        { key: "Delivery Time Amedite", value: `${selectedMethodData.deliveryTimeAmedite} ml/min` },
    ];

    return (
        <>
            <span className="font-medium text-base">Details</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
