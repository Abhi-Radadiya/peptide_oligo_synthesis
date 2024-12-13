import React from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";

export default function SequenceStringPopup(props) {
    const { onClose, selectedSequence } = props;

    return (
        <>
            <ModelWrapper header="Sequence" width="w-[65vw]" onClose={onClose}>
                <div className="h-fit max-h-[85vh] overflow-auto scrollbar-style pr-2">
                    <p>{selectedSequence}</p>
                </div>
            </ModelWrapper>
        </>
    );
}
