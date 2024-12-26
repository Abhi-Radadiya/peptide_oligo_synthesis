import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function Extra(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    console.log("selectedMethodData.n_extraWaste =:= ", selectedMethodData.n_extraWaste);

    console.log("selectedMethodData.n_extraWaste.label =:= ", selectedMethodData.n_extraWaste.label);
    console.log("selectedMethodData.n_extraWashXFactor }, =:= ", selectedMethodData.n_extraWashXFactor);
    console.log("selectedMethodData.n_extraWashVolume} =:= ", selectedMethodData.n_extraWashVolume);
    console.log("selectedMethodData.n_extraWashSolvent.label =:= ", selectedMethodData.n_extraWashSolvent.label);
    console.log("selectedMethodData.n_extraXFactor }, =:= ", selectedMethodData.n_extraXFactor);
    console.log("selectedMethodData.n_extraVolume} =:= ", selectedMethodData.n_extraVolume);
    console.log("selectedMethodData.n_extraSolvent.label =:= ", selectedMethodData.n_extraSolvent.label);

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
            <span className="font-medium text-base">Extra</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
