import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../../../../Components/Input/Input";
import { useWindowSize } from "@uidotdev/usehooks";

export default function SequenceEditing(props) {
    const { index } = props;

    const isEditing = index !== undefined;

    const { control, setValue, watch } = useFormContext();

    const setSelectedBlocks = (blocks) => setValue("selectedBlock", blocks);

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

    const handleSelectAll = () => {
        if (!isEditing) {
            if (isAllSelected()) {
                setSelectedBlocks([]);
                return;
            }

            const arrayLength = watch("sequenceString").split(" ")?.length;

            const selectedBlock = Array.from({ length: arrayLength }, (_, index) => index);

            setSelectedBlocks(selectedBlock);

            textAreaRef.current.select();
        }
    };

    const isAllSelected = () => {
        const arrayLength = watch("sequenceString").split(" ")?.length;
        return (selectedBlocks?.length ?? 0) === arrayLength && !!selectedBlocks.length;
    };

    const textAreaRef = useRef();

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

                    <span className="font-normal text-blue-500 text-base hover:underline underline-offset-2 cursor-pointer" onClick={handleSelectAll}>
                        {isAllSelected() ? "Unselect all" : "Select all"}
                    </span>
                </div>

                <Controller
                    key={index}
                    control={control}
                    name={index !== undefined ? `sequence.${index}.sequenceString` : "sequenceString"}
                    rules={{ required: "Sequence can't be empty, enter sequence" }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="relative">
                            <textarea
                                {...field}
                                value={field.value ?? ""}
                                placeholder="Enter sequence here"
                                rows={index !== undefined ? 20 : 22}
                                className={`shadow appearance-none border border-neutral-400 scrollbar-style rounded-lg w-full py-2 px-3 text-neutral-700 focus:outline-none focus:shadow-outline ${
                                    error ? "border-red-500 placeholder:text-red-500" : "border-gray-300"
                                }`}
                                ref={textAreaRef}
                                onSelect={handleSelection}
                            />

                            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />
            </div>
        </>
    );
}
