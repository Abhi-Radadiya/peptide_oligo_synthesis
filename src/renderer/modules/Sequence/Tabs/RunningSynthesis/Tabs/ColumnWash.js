import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function ColumnWash(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "Solvent", value: selectedMethodData["1_solvent"].label },
        { key: "Flow rate", value: `${selectedMethodData["1_flowRate"]} ml/min` },
        { key: "Volume", value: `${selectedMethodData["1_volume"]} ml` },
        { key: "Waste Column", value: selectedMethodData["1_waste"].label },
        { key: "X Factor", value: selectedMethodData["1_XFactor"] },
    ];

    return (
        <>
            <span className="font-medium text-base">Column Wash</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
