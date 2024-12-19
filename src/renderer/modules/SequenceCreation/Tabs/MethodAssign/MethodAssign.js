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

    const blockContainerRef = useRef(null);

    const selectedBlocks = watch("selectedBlock");

    const setSelectedBlocks = (blocks) => setValue("selectedBlock", blocks);

    const handleMethodSelect = (selectedOption) => {
        const updatedBlocks = blocks.map((block, index) => (selectedBlocks.includes(index) ? { ...block, method: selectedOption } : block));

        setBlocks(updatedBlocks);

        setSelectedBlocks([]);
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

    const methods = useSelector((state) => state.methodSetup.method);

    const methodMenuItem = useMemo(() => methods.map((el) => ({ label: el.method_name, value: el.id })), [methods]);

    const [hoveredBlock, setHoveredBlock] = useState(null);

    const isSelectDisabled = !blocks?.length || selectedBlocks?.length === 0 || selectedBlocks === undefined;

    return (
        <>
            <div
                ref={blockContainerRef}
                className="relative w-1/2 overflow-y-auto ml-4 scrollbar-style overflow-x-hidden -mr-2 pr-2"
                style={{ height: windowHeight - (index !== undefined ? 172 : 100) }}
            >
                <div className="sticky top-0 z-10 border-b border-neutral-300 pr-2 py-2 bg-[#fbfaf4]">
                    <div className="max-w-7xl mx-auto px-4 flex flex-row justify-between items-center">
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold">Method Selection</label>
                            <p className="italic text-neutral-500 text-sm mb-2">(Apply method to selected blocks)</p>
                        </div>
                        <div className="pt-1">
                            <Select
                                isDisabled={isSelectDisabled}
                                options={methodMenuItem}
                                placeholder="Select method"
                                onChange={handleMethodSelect}
                                value={{ label: "Select method", value: "" }}
                                styles={{
                                    control: (base) => ({
                                        ...base,
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

                <div className="mt-4 -mx-1">
                    {blocks?.map((block, index) => {
                        const isHovered = index === hoveredBlock;

                        const tooltipClasses = [
                            "absolute z-10 flex flex-row items-center justify-center gap-4",
                            isHovered ? "-top-10 opacity-100 group-hover:opacity-100" : "top-0 opacity-0",
                            "bg-neutral-200 border rounded-xl p-2 border-neutral-300",
                        ]
                            .filter(Boolean)
                            .join(" ");

                        const hasMethod = Boolean(block.method);

                        const selectedColor = methods.find((el) => el.id === block?.method?.value)?.color;

                        return (
                            <div
                                key={index}
                                data-index={index}
                                onContextMenu={() => setHoveredBlock(index)}
                                onMouseLeave={() => setHoveredBlock(null)}
                                className={`inline-block px-2 py-1 m-1 border relative group rounded ${
                                    selectedBlocks?.includes(index) ? "bg-yellow-200 border-yellow-500" : "bg-gray-100 border-gray-300"
                                }`}
                                style={{ ...(!!selectedColor && !selectedBlocks?.includes(index) ? { background: selectedColor } : {}) }}
                            >
                                {block.block}

                                {/* {hasMethod && (
                                    <div className={`${tooltipClasses} left-1/2`}>
                                        {hasMethod && <div className="text-sm text-neutral-700 whitespace-nowrap">{block.method.label}</div>}
                                    </div>
                                )} */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
