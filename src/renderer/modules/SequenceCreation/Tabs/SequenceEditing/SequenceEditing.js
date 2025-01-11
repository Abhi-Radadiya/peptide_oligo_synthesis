import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../../Components/Input/Input";
import { useWindowSize } from "@uidotdev/usehooks";
import TextArea from "./Component/TextArea";
import { ReactComponent as ReimbursementIcon } from "../../../../Assets/reimbursement.svg";
import InvalidSequenceBlockModel from "./Model/InvalidSequenceBlockModel";
import { Button } from "../../../../Components/Buttons/Buttons";
import EnterSequenceModel from "./Model/EnterSequenceModel";

export default function SequenceEditing(props) {
    const { index } = props;

    const isEditing = index !== undefined;

    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const textAreaRef = useRef();

    const setSelectedBlocks = (blocks) => setValue("selectedBlock", blocks);

    const [showInvalidBlockModel, setShowInvalidBlockModel] = useState(false);

    const [showEnterSequenceModel, setShowEnterSequenceModel] = useState(false);

    const selectedBlocks = watch("selectedBlock");

    const handleSelection = (event) => {
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        if (selectedText.trim() === "") {
            setSelectedBlocks([]);
            return;
        }

        const selectedBlocks = [];
        let currentIndex = 0;
        let currentBlock = "";

        for (let i = 0; i < textarea.value.length; i++) {
            if (i >= start && i < end) {
                currentBlock += textarea.value[i];
            }
            if (textarea.value[i] === " " || i === textarea.value.length - 1) {
                if (currentBlock.trim() !== "") {
                    selectedBlocks.push(currentIndex);
                }
                currentIndex++;
                currentBlock = "";
            }
        }

        setSelectedBlocks(selectedBlocks);
    };

    const { height: windowHeight } = useWindowSize();

    const invalidBlock = errors?.invalidSequenceBlock?.invalidBlock;

    return (
        <>
            <div className="w-1/2 pr-4 border-r border-neutral-300 overflow-auto no-scrollbar" style={{ height: windowHeight - (index !== undefined ? 172 : 100) }}>
                <label className="block text-gray-700 text-sm font-bold">Log File</label>
                <p className="italic text-neutral-500 text-sm mb-2">(It will be name of below sequence)</p>

                <InputField
                    control={control}
                    name={index !== undefined ? `sequence.${index}.name` : "name"}
                    borderClass="border border-neutral-400"
                    placeholder="Enter log file"
                    wrapperClassName="mb-4 pl-1"
                    rules={{ required: "Please enter log file" }}
                    key={`${index}.name`}
                />

                <div className="flex flex-row justify-between items-end mb-2">
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold">Sequence</label>
                        <p className="italic text-neutral-500 text-sm">(Enter Sequence Here)</p>
                    </div>

                    <div className="flex flex-row items-center gap-3">
                        {invalidBlock?.length && (
                            <ReimbursementIcon className="rotate-180 fill-red-400 cursor-pointer stroke-red-100" onClick={() => setShowInvalidBlockModel(true)} />
                        )}

                        <Button label="Enter block" onClick={() => setShowEnterSequenceModel(true)} />
                    </div>
                </div>

                <TextArea index={index} textAreaRef={textAreaRef} handleSelection={handleSelection} />
            </div>

            {showInvalidBlockModel && <InvalidSequenceBlockModel invalidBlock={invalidBlock} onClose={() => setShowInvalidBlockModel(false)} />}

            {showEnterSequenceModel && <EnterSequenceModel onClose={() => setShowEnterSequenceModel(false)} />}
        </>
    );
}
