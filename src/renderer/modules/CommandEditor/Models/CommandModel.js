import React from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";

export default function CommandModel(props) {
    const { onClose, command } = props;

    return (
        <>
            <ModelWrapper header="Commands" width="w-[45vw]" onClose={onClose}>
                <ul>
                    {command?.map((el, index) => (
                        <li className="mb-2" key={index}>
                            {el}
                        </li>
                    ))}
                </ul>
            </ModelWrapper>
        </>
    );
}
