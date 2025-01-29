import React, { useState, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import { useWindowSize } from "@uidotdev/usehooks";
import { useSelector } from "react-redux";
import { getTextColorForBackground } from "../../../../Helpers/Constant";
import { InfoIcon } from "lucide-react";
import MethodDetailModel from "../../Model/MethodDetailModel";

const MethodAssign = () => {
    const { height: windowHeight } = useWindowSize();
    const { watch, setValue } = useFormContext();

    const methods = useSelector((state) => state.methodSetup.method);

    const methodMenuItem = useMemo(() => {
        return methods.map((el) => {
            return { label: el.method_name, value: el.id, option: { color: el.color } };
        });
    }, [methods]);

    const [selectedBlocks, setSelectedBlocks] = useState(new Set());

    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

    const [displayOption, setDisplayOption] = useState(1);

    const sequence = watch("sequence");

    const handleBlockClick = useCallback(
        (index, event) => {
            setSelectedBlocks((prev) => {
                const newSelection = new Set(prev);

                if (event.shiftKey && lastSelectedIndex !== null) {
                    const start = Math.min(lastSelectedIndex, index);
                    const end = Math.max(lastSelectedIndex, index);

                    for (let i = start; i <= end; i++) {
                        newSelection.add(i);
                    }
                } else {
                    if (newSelection.has(index)) {
                        if (displayOption === 1) newSelection.delete(index);
                        else {
                            newSelection.delete(index);
                            newSelection.delete(index + 1);
                            newSelection.delete(index + 2);
                        }
                    } else {
                        if (displayOption === 1) newSelection.add(index);
                        else {
                            newSelection.add(index);
                            newSelection.add(index + 1);
                            newSelection.add(index + 2);
                        }
                    }
                }

                const updatedSequence = sequence.map((block, i) => ({
                    ...block,
                    isSelected: newSelection.has(i),
                }));

                setValue("sequence", updatedSequence);

                return newSelection;
            });

            setLastSelectedIndex(index);
        },
        [lastSelectedIndex, sequence, setValue, displayOption]
    );

    const clearSelection = () => {
        setSelectedBlocks(new Set());
        setLastSelectedIndex(null);

        const updatedSequence = sequence.map((block) => ({
            ...block,
            isSelected: false,
        }));
        setValue("sequence", updatedSequence);
    };

    const handleSelectAll = useCallback(() => {
        setSelectedBlocks(() => {
            const newSelection = new Set();

            sequence.forEach((_, index) => {
                newSelection.add(index);
            });

            const updatedSequence = sequence.map((block, index) => ({
                ...block,
                isSelected: true,
            }));

            setValue("sequence", updatedSequence);

            return newSelection;
        });

        setLastSelectedIndex(sequence.length - 1);
    }, [sequence, setValue]);

    const handleMethodSelect = (displayOption) => {
        if (!displayOption) return;

        const methodAssignedSequence = sequence.map((el) => {
            if (el.isSelected) {
                return { ...el, isSelected: false, method: { value: displayOption.value } };
            } else return { ...el, isSelected: false };
        });

        setValue("sequence", methodAssignedSequence);

        setSelectedBlocks(new Set());

        setLastSelectedIndex(null);
    };

    const getBlockStyle = (index) => {
        const baseStyle = "px-2 py-1 m-1 border relative rounded transition-colors duration-200 w-fit";
        const selected = selectedBlocks.has(index);

        if (selected) {
            return `${baseStyle} border-blue-400`;
        }

        return `${baseStyle} border-gray-300 hover:bg-gray-200`;
    };

    const getBlockGroups = () => {
        if (displayOption === 3) {
            return sequence?.reduce((acc, _, index) => {
                if (index % 3 === 0) {
                    const group = sequence.slice(index, index + 3);
                    if (group.length > 0) {
                        acc.push(group);
                    }
                }
                return acc;
            }, []);
        }
        return sequence?.map((block) => [block]);
    };

    const getMethodDetailsById = (id) => {
        return methodMenuItem.find((el) => el.value === id);
    };

    const toggleDisplayOption = () => {
        clearSelection();

        const currentDisplayOption = displayOption === 3 ? 1 : 3;

        setDisplayOption(currentDisplayOption);

        const blocks = sequence.map((block) => block.block);

        let sequenceString = "";

        if (currentDisplayOption === 1) {
            sequenceString = blocks.join(" ");
        } else {
            sequenceString = blocks.map((block, index) => (index > 0 && (index + 1) % 3 === 0 ? `${block} ` : block)).join("");
        }

        setValue("textAreaSequenceString", sequenceString);
    };

    const [displayMethodDetailBlock, setDisplayMethodDetailBlock] = useState(false);

    return (
        <>
            <div className="relative w-1/2 overflow-y-auto ml-4 scrollbar-style overflow-x-hidden -mr-2 pr-2" style={{ height: windowHeight - 100 }}>
                <div className="sticky top-0 z-10 border-b border-neutral-300 pr-2 py-2 bg-[#fbfaf4]">
                    <div className="max-w-7xl mx-auto flex flex-row justify-between items-center">
                        <div className="pt-1 flex flex-row items-center gap-2">
                            <button
                                onClick={handleSelectAll}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Select All
                            </button>

                            <button
                                onClick={clearSelection}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Clear Selection
                            </button>

                            <button
                                onClick={toggleDisplayOption}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                {displayOption} Block
                            </button>
                        </div>

                        <div className="flex flex-row items-center gap-1">
                            <InfoIcon size={20} className="cursor-pointer" onClick={() => setDisplayMethodDetailBlock(true)} />

                            <Select
                                options={methodMenuItem}
                                placeholder="Assign method"
                                onChange={handleMethodSelect}
                                value={null}
                                isDisabled={selectedBlocks.size === 0}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        width: "250px",
                                        borderColor: "#d1d5db",
                                        "&:hover": {
                                            borderColor: "#6b7280",
                                        },
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    {getBlockGroups()?.map((group, groupIndex) => {
                        const baseIndex = groupIndex * (displayOption || 1);

                        const selected = selectedBlocks.has(baseIndex);

                        return (
                            <div key={groupIndex} className={`${displayOption === 3 ? "mb-2 p-1 rounded inline-block" : "inline-block"}`}>
                                {displayOption === 3 ? (
                                    <div
                                        onClick={(e) => handleBlockClick(baseIndex, e)}
                                        className={getBlockStyle(baseIndex)}
                                        style={{ background: selected ? "#bedbff" : "#f3f4f6" }}
                                        role="button"
                                        tabIndex={groupIndex}
                                    >
                                        <div className="flex flex-row gap-2 items-center">
                                            {group.map((block, blockIndex) => {
                                                const methodDetails = getMethodDetailsById(block?.method?.value);

                                                return (
                                                    <p key={blockIndex + "_block"}>
                                                        {block.block}
                                                        {block?.method?.value && <span className="ml-2 text-xs text-gray-500">({methodDetails.label})</span>}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    group.map((block, innerIndex) => {
                                        const index = baseIndex + innerIndex;
                                        const methodDetails = getMethodDetailsById(block?.method?.value);
                                        const selected = selectedBlocks.has(index);
                                        const backgroundColor = selected ? "#bedbff" : methodDetails?.option?.color ?? "#f3f4f6";
                                        const textColor = getTextColorForBackground(backgroundColor);

                                        return (
                                            <div
                                                key={index}
                                                onClick={(e) => handleBlockClick(index, e)}
                                                className={getBlockStyle(index)}
                                                role="button"
                                                style={{ background: backgroundColor, color: textColor }}
                                                tabIndex={innerIndex + groupIndex}
                                            >
                                                <span className={`text-[${textColor}]`}>{block.block}</span>
                                                {block?.method?.value && <span className={`ml-2 text-xs`}>({methodDetails?.label})</span>}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        );
                    })}
                </div>

                {selectedBlocks.size > 0 && (
                    <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                        <p className="text-sm text-gray-600">
                            Selected blocks :{" "}
                            {Array.from(selectedBlocks)
                                .map((i) => sequence[i]?.block)
                                .join(", ")}
                        </p>
                    </div>
                )}
            </div>

            {displayMethodDetailBlock && <MethodDetailModel methods={methods} onClose={() => setDisplayMethodDetailBlock(false)} />}
        </>
    );
};

export default MethodAssign;
