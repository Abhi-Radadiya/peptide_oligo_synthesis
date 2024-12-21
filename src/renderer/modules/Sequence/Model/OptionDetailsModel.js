import React from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";

export default function OptionDetailsModel(props) {
    const { onClose, type } = props;

    return (
        <>
            <ModelWrapper width="w-[30vw]" onClose={onClose}>
                {type === "option" ? (
                    <span className="text-neutral-700">
                        Option <strong>3'</strong> will reverse sequence
                    </span>
                ) : (
                    <>
                        <div className="mb-2">
                            <strong> Standard</strong> option start synthesis from
                            <strong> second</strong> block
                        </div>
                        <span>
                            <strong>Universal </strong>
                            option start synthesis from <strong> first </strong> block
                        </span>
                    </>
                )}
            </ModelWrapper>
        </>
    );
}
