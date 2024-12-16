import React, { useState } from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";
import ToggleSwitch from "../../../Components/FormController/Switch";

export default function SequenceStringPopup(props) {
    const { onClose, selectedSequence } = props;

    const spaceRemovedSequence = selectedSequence.replaceAll(" ", "");

    const [isThreeBlock, setIsThreeBlock] = useState(false);

    function convertString(inputStr, option) {
        if (!option) {
            let groupedStr = inputStr.match(/.{1,3}/g).join(" ");
            return groupedStr;
        } else {
            let spacedStr = inputStr.split("").join(" ");
            return spacedStr;
        }
    }

    return (
        <>
            <ModelWrapper header="Sequence" width="w-[65vw]" onClose={onClose}>
                <div className="flex items-center gap-4 my-8">
                    <span className="font-medium text-base text-neutral-700">Display block : </span>
                    <span className="font-normal">3</span>
                    <ToggleSwitch checked={isThreeBlock} handleChange={() => setIsThreeBlock(!isThreeBlock)} />
                    <span className="font-normal">1</span>
                </div>

                <div className="h-fit max-h-[85vh] overflow-auto scrollbar-style pr-2">
                    <p>{convertString(spaceRemovedSequence, isThreeBlock)}</p>
                </div>
            </ModelWrapper>
        </>
    );
}
