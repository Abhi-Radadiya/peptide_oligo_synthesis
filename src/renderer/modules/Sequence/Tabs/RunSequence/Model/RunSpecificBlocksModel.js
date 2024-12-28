import React, { useEffect, useRef, useState } from "react";
import ModelWrapper from "../../../../../Components/Model/ModelWrapper";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button } from "../../../../../Components/Buttons/Buttons";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
import { methodOption } from "../../../../../Helpers/Constant";

export default function RunSpecificBlocksModel(props) {
    const { onClose, setPrintingState, handleRun } = props;

    const { watch, control, handleSubmit } = useFormContext();

    const allSequence = useSelector((state) => state.sequence.sequence);

    const [isAllSelected, setIsAllSelected] = useState(false);

    const textAreaRef = useRef();

    const sequenceString = allSequence?.find((el) => el.id === watch("sequence")?.value)?.sequenceString;

    const sequenceArrayLength = sequenceString.split(" ")?.length;

    const handleSelection = (event) => {
        setIsAllSelected(false);

        const textarea = event.target;
        const value = textarea.value;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (start === end) {
            setPrintingState((prevState) => ({
                ...prevState,
                startIndex: null,
                endIndex: null,
            }));
            return;
        }

        const spaceIndices = [
            -1,
            ...value
                .split("")
                .map((char, i) => (char === " " ? i : -1))
                .filter((i) => i >= 0),
            value.length,
        ];

        let startIndex = null;
        let endIndex = null;

        for (let i = 0; i < spaceIndices.length - 1; i++) {
            const currentStart = spaceIndices[i];
            const currentEnd = spaceIndices[i + 1];

            if (startIndex === null && start > currentStart && start <= currentEnd) {
                startIndex = i;
            }

            if (endIndex === null && end > currentStart && end <= currentEnd) {
                endIndex = i;
            }

            if (startIndex !== null && endIndex !== null) {
                break;
            }
        }

        const result = { startIndex, endIndex };

        setIsAllSelected(endIndex === sequenceArrayLength - 1 && startIndex === 0);

        setPrintingState((prevState) => ({
            ...prevState,
            ...result,
        }));
    };

    const selectAll = () => {
        setIsAllSelected(true);

        setPrintingState((prevState) => ({
            ...prevState,
            startIndex: 0,
            endIndex: sequenceArrayLength - 1,
        }));
    };

    useEffect(() => {
        selectAll();
    }, []);

    const handleSelectAll = (checked) => {
        setIsAllSelected(checked);

        if (checked) {
            selectAll();
            textAreaRef.current.select();
        } else {
            setPrintingState((prevState) => ({
                ...prevState,
                startIndex: 0,
                endIndex: 0,
            }));
        }
    };

    return (
        <>
            <ModelWrapper width="w-[80%]" header="Select sequence" onClose={onClose}>
                <div className="mt-6">
                    <div className="flex flex-row gap-4 items-center justify-between mb-4">
                        <div className="flex flex-row gap-4 items-center">
                            <span className="font-normal text-neutral-700">Select all : </span>
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={(e) => {
                                    handleSelectAll(e.target.checked);
                                }}
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl cursor-pointer"
                            />
                        </div>

                        <div className="flex flex-row items-start gap-6">
                            <SelectionController
                                isClearable={false}
                                className="w-[230px]"
                                menuItem={methodOption}
                                name="selectedMethodOption"
                                control={control}
                                rules={{ required: "Please select options" }}
                            />

                            <Button bgClassName="bg-green-300 hover:bg-green-400" label="Run synthesis" onClick={handleSubmit(handleRun)} />
                        </div>
                    </div>

                    <textarea
                        ref={textAreaRef}
                        value={sequenceString}
                        placeholder="Enter sequence here"
                        rows={22}
                        readOnly={true}
                        className="shadow cursor-text appearance-none border border-neutral-400 scrollbar-style rounded-lg w-full py-2 px-3 text-neutral-700 focus:outline-none focus:shadow-outline"
                        onSelect={handleSelection}
                    />
                </div>
            </ModelWrapper>
        </>
    );
}
