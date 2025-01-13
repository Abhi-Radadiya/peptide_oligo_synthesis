import React, { useRef, useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import BlockSelection from "./Component/BlockSelection";
import TextArea from "./Component/TextArea";
import { Button } from "../../../../../../Components/Buttons/Buttons";
import { useFormContext } from "react-hook-form";

export default function EnterSequenceModel(props) {
    const { onClose, index } = props;

    const { setValue } = useFormContext();

    const textAreaRef = useRef(null);

    const [textContent, setTextContent] = useState("");

    const [cursorPosition, setCursorPosition] = useState(0);

    const textAreaName = index !== undefined ? `sequence.${index}.sequenceString` : "sequenceString";

    const handleTextAreaChange = (e) => {
        setTextContent(e.target.value);
        setCursorPosition(e.target.selectionStart);
    };

    const handleSave = () => {
        const sequenceString = textContent[0] === " " ? textContent.slice(1) : textContent;

        setValue(textAreaName, sequenceString.replace(/\s+/g, " ").trim());

        onClose();
    };

    return (
        <>
            <ModelWrapper header="Create sequence" desc="Select blocks to create sequence" width="w-[80vw]" hasOutSideClick={false} onClose={onClose}>
                <div className="flex flex-row items-start">
                    <BlockSelection
                        textContent={textContent}
                        cursorPosition={cursorPosition}
                        setTextContent={setTextContent}
                        setCursorPosition={setCursorPosition}
                        textAreaRef={textAreaRef}
                    />

                    <TextArea textAreaRef={textAreaRef} textContent={textContent} handleTextAreaChange={handleTextAreaChange} setCursorPosition={setCursorPosition} />
                </div>

                <div className="flex justify-end mt-6 gap-4">
                    <Button label="Reset" onClick={() => setTextContent("")} />
                    <Button
                        label="Save"
                        onClick={() => {
                            handleSave();
                        }}
                        bgClassName="bg-green-300 hover:bg-green-400"
                    />
                </div>
            </ModelWrapper>
        </>
    );
}
