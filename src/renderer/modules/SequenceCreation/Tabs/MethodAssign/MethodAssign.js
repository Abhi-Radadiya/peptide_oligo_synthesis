import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import { useWindowSize } from "@uidotdev/usehooks";
import { useSelector } from "react-redux";

export default function MethodAssign(props) {
    const { index } = props;

    const { watch, setValue } = useFormContext();

    const blockName = index !== undefined ? `sequence.${index}.block` : "block";

    const blocks = watch(blockName);

    const setBlocks = (block) => setValue(blockName, block);

    const [selectedMethod, setSelectedMethod] = useState(null);

    const blockContainerRef = useRef(null);

    const selectedBlocks = watch("selectedBlock");

    const setSelectedBlocks = (blocks) => setValue("selectedBlock", blocks);

    const handleMethodSelect = (selectedOption) => {
        setSelectedMethod(selectedOption);
        const updatedBlocks = blocks.map((block, index) => (selectedBlocks.includes(index) ? { ...block, method: selectedOption } : block));
        setBlocks(updatedBlocks);
        setSelectedBlocks([]);
        setSelectedMethod(null);
    };

    const scrollToSelectedBlock = useCallback(() => {
        if (!selectedBlocks?.length || !blockContainerRef.current) return;

        const container = blockContainerRef.current;
        const selectedBlockElement = Array.from(container.querySelectorAll("div")).find((el) => selectedBlocks.includes(Number(el.dataset.index)));

        if (selectedBlockElement) {
            const containerHeight = container.clientHeight;
            const blockHeight = selectedBlockElement.offsetHeight;

            const scrollTop = selectedBlockElement.offsetTop - containerHeight / 2 + blockHeight / 2;

            container.scrollTo({
                top: scrollTop,
                behavior: "smooth",
            });
        }
    }, [selectedBlocks]);

    useEffect(() => {
        scrollToSelectedBlock();
    }, [scrollToSelectedBlock]);

    const { height: windowHeight } = useWindowSize();

    const methods = useSelector((state) => state.methodSetup.method).map((el) => ({ label: el.method_name, value: el.id }));

    const colorCode = { A: "#65b330", T: "#cf5140", G: "#cfbe69", C: "#6078d6" };

    const [hoveredBlock, setHoveredBlock] = useState(null);

    const isSelectDisabled = !blocks?.length || selectedBlocks?.length === 0 || selectedBlocks === undefined;

    return (
        <>
            <div
                ref={blockContainerRef}
                className="relative w-1/2 overflow-y-auto ml-4 scrollbar-style overflow-x-hidden -mr-2 pr-2"
                style={{ height: windowHeight - (index !== undefined ? 172 : 100) }}
            >
                <div className="flex flex-row justify-between sticky top-0 bg-white z-10 border-b border-neutral-300 pr-2">
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold">Method Selection</label>
                        <p className="italic text-neutral-500 text-sm mb-2">(Apply method to selected blocks)</p>
                    </div>
                    <div className="pt-1">
                        <Select isDisabled={isSelectDisabled} options={methods} placeholder="Select method" value={selectedMethod} onChange={handleMethodSelect} />
                    </div>
                </div>

                <div className="mt-4 -mx-1">
                    {blocks?.map((block, index) => {
                        const isHovered = index === hoveredBlock;

                        const tooltipClasses = [
                            "absolute z-10 flex flex-row items-center justify-center gap-4 transition-all",
                            isHovered ? "-top-10 opacity-100 group-hover:opacity-100" : "top-0 opacity-0",
                            "bg-neutral-200 border rounded-xl p-2 border-neutral-300",
                        ]
                            .filter(Boolean)
                            .join(" ");

                        const hasMethod = Boolean(block.method);

                        return (
                            <div
                                key={index}
                                data-index={index}
                                onContextMenu={() => setHoveredBlock(index)}
                                onMouseLeave={() => setHoveredBlock(null)}
                                className={`inline-block px-2 py-1 m-1 border relative group rounded ${
                                    selectedBlocks?.includes(index)
                                        ? "bg-yellow-200 border-yellow-500"
                                        : !!block?.method
                                        ? "bg-green-300 border-green-400"
                                        : "bg-gray-100 border-gray-300"
                                }`}
                            >
                                {block.block.split("").map((char, charIndex) => (
                                    <span key={charIndex} style={{ color: colorCode[char] }}>
                                        {char}
                                    </span>
                                ))}

                                {hasMethod && (
                                    <div className={`${tooltipClasses} left-1/2 transform -translate-x-1/2`}>
                                        {hasMethod && <div className="text-sm text-neutral-700 whitespace-nowrap">{block.method.label}</div>}
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
