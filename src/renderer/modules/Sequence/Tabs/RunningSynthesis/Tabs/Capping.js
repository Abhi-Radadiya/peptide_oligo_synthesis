import React from "react";
import OptionDetailsBox from "../Component/OptionDetailsBox";

export default function Capping(props) {
    const { selectedMethodData } = props;

    if (!selectedMethodData) return;

    const data = [
        { key: "A - Solvent", value: selectedMethodData.n_cappingASolvent.label },
        { key: "A - Volume", value: `${selectedMethodData.n_cappingAVolume} ml` },
        { key: "A - X Factor", value: selectedMethodData.n_cappingAXFactor },
        { key: "B - Solvent", value: selectedMethodData.n_cappingBSolvent.label },
        { key: "B - Volume", value: `${selectedMethodData.n_cappingBVolume} ml` },
        { key: "B - X Factor", value: selectedMethodData.n_cappingBXFactor },
        { key: "Wash Solvent", value: selectedMethodData.n_cappingWashSolvent.label },
        { key: "Wash Volume", value: `${selectedMethodData.n_cappingWashVolume} ml` },
        { key: "Wash X Factor", value: selectedMethodData.n_cappingWashXFactor },
        { key: "Waste Column", value: selectedMethodData.n_cappingWaste.label },
    ];

    return (
        <>
            <span className="font-medium text-base">Capping</span>

            <div className="space-y-2 my-4">
                {data.map((el, index) => {
                    return <OptionDetailsBox optionKey={el.key} value={el.value} key={index} />;
                })}
            </div>
        </>
    );
}
