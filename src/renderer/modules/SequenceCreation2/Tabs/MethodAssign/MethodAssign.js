import React, { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import { useWindowSize } from "@uidotdev/usehooks";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";

const MethodAssign = (props) => {
    const { height: windowHeight } = useWindowSize();
    const { watch, control } = useFormContext();

    const [selectedBlocks, setSelectedBlocks] = useState(new Set());
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

    const blocks = watch("sequence");
    const displayOption = watch("displayOption");

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
                        newSelection.delete(index);
                    } else {
                        newSelection.add(index);
                    }
                }

                return newSelection;
            });

            setLastSelectedIndex(index);
        },
        [lastSelectedIndex]
    );

    const handleMethodSelect = (selectedOption) => {
        if (!selectedOption) return;
        console.log("Applying method", selectedOption.value, "to blocks:", Array.from(selectedBlocks));
    };

    const clearSelection = () => {
        setSelectedBlocks(new Set());
        setLastSelectedIndex(null);
    };

    const getBlockStyle = (index) => {
        const baseStyle = "px-2 py-1 m-1 border relative rounded transition-colors duration-200 w-fit";
        const selected = selectedBlocks.has(index);

        if (selected) {
            return `${baseStyle} bg-blue-200 border-blue-400`;
        }
        return `${baseStyle} bg-gray-100 border-gray-300 hover:bg-gray-200`;
    };

    const getBlockGroups = () => {
        if (displayOption?.value === 3) {
            return blocks?.reduce((acc, _, index) => {
                if (index % 3 === 0) {
                    const group = blocks.slice(index, index + 3);
                    if (group.length > 0) {
                        acc.push(group);
                    }
                }
                return acc;
            }, []);
        }
        return blocks?.map((block) => [block]);
    };

    const getConcatenatedBlocks = (group) => {
        return group.map((block) => block.block).join("");
    };

    const methodMenuItem = [
        { label: "Method 1", value: "method1" },
        { label: "Method 2", value: "method2" },
    ];

    return (
        <div className="relative w-1/2 overflow-y-auto ml-4 scrollbar-style overflow-x-hidden -mr-2 pr-2" style={{ height: windowHeight - 100 }}>
            <div className="sticky top-0 z-10 border-b border-neutral-300 pr-2 py-2 bg-[#fbfaf4]">
                <SelectionController
                    name="displayOption"
                    menuItem={[
                        { label: "1 block", value: 1 },
                        { label: "3 blocks", value: 3 },
                    ]}
                    control={control}
                />

                <div className="max-w-7xl mx-auto px-4 flex flex-row justify-between items-center">
                    <div className="pt-1 flex flex-row items-center gap-2">
                        <button onClick={clearSelection} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100">
                            Clear Selection
                        </button>
                        <Select
                            options={methodMenuItem}
                            placeholder="Select method"
                            onChange={handleMethodSelect}
                            value={null}
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
                    const baseIndex = groupIndex * (displayOption?.value || 1);
                    return (
                        <div key={groupIndex} className={`${displayOption?.value === 3 ? "mb-2 bg-gray-50 p-1 rounded inline-block" : "inline-block"}`}>
                            {displayOption?.value === 3 ? (
                                <div onClick={(e) => handleBlockClick(baseIndex, e)} className={getBlockStyle(baseIndex)} role="button" tabIndex={0}>
                                    <span>{getConcatenatedBlocks(group)}</span>
                                    {group[0].method && <span className="ml-2 text-xs text-gray-500">({group[0].method})</span>}
                                </div>
                            ) : (
                                group.map((block, innerIndex) => {
                                    const index = baseIndex + innerIndex;
                                    return (
                                        <div key={index} onClick={(e) => handleBlockClick(index, e)} className={getBlockStyle(index)} role="button" tabIndex={0}>
                                            <span>{block.block}</span>
                                            {block.method && <span className="ml-2 text-xs text-gray-500">({block.method})</span>}
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
                        Selected blocks:{" "}
                        {Array.from(selectedBlocks)
                            .map((i) => blocks[i]?.block)
                            .join(", ")}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MethodAssign;
