import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";

export default function MethodAssign() {
    const { watch, setValue } = useFormContext();

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [hoveredBlock, setHoveredBlock] = useState(null);
    const [selectedBlocks, setSelectedBlocks] = useState([]);

    const blocks = watch("block");

    const setBlocks = (block) => setValue("block", block);

    const colorCode = { A: "#65b330", T: "#cf5140", G: "#cfbe69", C: "#6078d6" };

    const methods = [
        { value: "method1", label: "Method 1" },
        { value: "method2", label: "Method 2" },
        { value: "method3", label: "Method 3" },
    ];

    const handleBlockSelect = (index) => {
        setSelectedBlocks((prevSelected) => (prevSelected.includes(index) ? prevSelected.filter((i) => i !== index) : [...prevSelected, index]));
    };

    const combineSequenceBlocks = (blocks) => {
        if (!blocks || blocks.length === 0) return [];

        return blocks.reduce((combined, current) => {
            if (combined.length === 0) {
                return [current];
            }

            const lastItem = combined[combined.length - 1];

            const methodsMatch = lastItem.method && current.method && lastItem.method.value === current.method.value;

            if (methodsMatch) {
                lastItem.block += ` ${current.block}`;
                return combined;
            } else {
                return [...combined, current];
            }
        }, []);
    };

    const handleMethodSelect = (selectedOption) => {
        setSelectedMethod(selectedOption);
        const updatedBlocks = blocks.map((block, index) => (selectedBlocks.includes(index) ? { ...block, method: selectedOption } : block));
        setBlocks(combineSequenceBlocks(updatedBlocks));
        setSelectedBlocks([]);
        setSelectedMethod(null);
    };

    const handleSeparate = (index) => {
        const blockToSeparate = blocks[index];
        const separatedBlocks = blockToSeparate.block.split(/\s+/).map((block) => ({
            block,
            method: blockToSeparate.method,
        }));
        const updatedBlocks = [...blocks.slice(0, index), ...separatedBlocks, ...blocks.slice(index + 1)];
        setBlocks(updatedBlocks);
        setHoveredBlock(null);
    };

    const [focusedBlock, setFocusedBlock] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Tab") {
                event.preventDefault();
                if (event.shiftKey) {
                    setFocusedBlock((prev) => (prev === null ? blocks.length - 1 : (prev - 1 + blocks.length) % blocks.length));
                } else {
                    setFocusedBlock((prev) => (prev === null ? 0 : (prev + 1) % blocks.length));
                }
            } else if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                if (focusedBlock !== null) {
                    handleBlockSelect(focusedBlock);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [focusedBlock, blocks?.length]);

    return (
        <>
            <div className="relative pb-4">
                <div className="pt-4 sticky top-[70px] bg-white z-10">
                    <label className="block text-gray-700 text-sm font-bold">Method Selection</label>
                    <p className="italic text-neutral-500 text-sm mb-2">(Apply method to selected blocks)</p>
                    <Select isDisabled={selectedBlocks.length === 0} options={methods} placeholder="Select method" value={selectedMethod} onChange={handleMethodSelect} />
                </div>

                <div className="mt-4 -mx-1">
                    {blocks?.map((blockData, index) => {
                        const isHovered = index === hoveredBlock;
                        const isFocused = index === focusedBlock;

                        const isSelected = selectedBlocks.includes(index);
                        const hasMethod = Boolean(blockData.method);
                        const hasSpace = blockData.block.includes(" ");
                        const blockClasses = [
                            "inline-block border p-2 m-1 mx-3 cursor-pointer relative group",
                            hasMethod ? "bg-green-200" : "bg-white",
                            isSelected ? "bg-yellow-200" : "",
                            isFocused ? "outline outline-2 outline-blue-500" : "",
                        ]
                            .filter(Boolean)
                            .join(" ");

                        const tooltipClasses = [
                            "absolute z-10 flex flex-row items-center justify-center gap-4 transition-all",
                            isHovered ? "-top-10 opacity-100 group-hover:opacity-100" : "top-0 opacity-0",
                            "bg-neutral-200 border rounded-xl p-2 border-neutral-300",
                        ]
                            .filter(Boolean)
                            .join(" ");

                        return (
                            <div
                                key={index}
                                className={blockClasses}
                                onClick={() => handleBlockSelect(index)}
                                onContextMenu={() => setHoveredBlock(index)}
                                onMouseLeave={() => setHoveredBlock(null)}
                                tabIndex={isFocused ? 0 : -1}
                                onFocus={() => setFocusedBlock(index)}
                                onBlur={() => setFocusedBlock(null)}
                            >
                                {blockData.block.split("").map((char, charIndex) => (
                                    <span key={charIndex} style={{ color: colorCode[char] }}>
                                        {char}
                                    </span>
                                ))}

                                {(hasMethod || hasSpace) && (
                                    <div className={`${tooltipClasses} left-1/2 transform -translate-x-1/2`}>
                                        {hasMethod && <div className="text-sm text-neutral-700 whitespace-nowrap">{blockData.method.label}</div>}
                                        {hasSpace && (
                                            <button
                                                className="bg-orange-400 text-white px-0.5 pb-0.5 -my-1 h-fit text-sm font-bold rounded whitespace-nowrap"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSeparate(index);
                                                }}
                                            >
                                                Separate
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
