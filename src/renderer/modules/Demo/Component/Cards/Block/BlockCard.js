import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import Lucide icons

export default function BlockCard() {
    const sequence = useSelector((state) => state.sequence.sequence);
    const { watch } = useFormContext();
    const [isOpen, setIsOpen] = useState(true); // State to manage dropdown open/close

    const selectedSequenceData = sequence?.find((seq) => seq.id === watch("sequence.value"));
    const selectedBlockIndices = watch("selectedBlocks")?.map((block) => block.index);
    const activeBlockIndex = watch("activeBlockIndex");
    const blocks = watch("option") == 3 ? [...(selectedSequenceData?.block ?? [])]?.reverse() : selectedSequenceData?.block;

    const getMethodName = (methodId) => {
        return watch("selectedBlocks")?.find((el) => el.method.id === methodId)?.method.method_name;
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white shadow-lg flex-grow rounded-xl overflow-hidden min-w-[400px] w-[400px] border border-neutral-200 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4 flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
                <span className="text-lg font-semibold text-neutral-800">Blocks</span>
                {!watch("showConfigurationCard") && (
                    <div className="transition-transform duration-300 transform">{isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}</div>
                )}
            </div>

            <div className={`${isOpen ? "p-4 -m-2 h-auto" : "h-0"} overflow-hidden transition-all duration-300`}>
                {blocks?.map((el, index) => {
                    const isDisabled = !selectedBlockIndices.includes(index);
                    const methodName = getMethodName(el.method.value);
                    const isActive = watch("selectedBlocks")?.[activeBlockIndex]?.index === index;

                    return (
                        <div
                            className={`inline-block rounded-lg px-2 py-1 m-2 transition-all duration-300 relative ${
                                isActive
                                    ? "bg-amber-200 border-amber-400 border scale-105 shadow-lg"
                                    : isDisabled
                                    ? "bg-neutral-100 text-neutral-400 text-sm italic shadow-sm opacity-70 cursor-not-allowed"
                                    : "border bg-neutral-50 shadow-lg border-neutral-400"
                            }`}
                            key={index}
                        >
                            {isActive && <div className="h-3 w-3 rounded-full bg-green-500 absolute -right-1 -top-1 animate-ping" />}
                            <span className="font-medium mr-1">{el.block}</span>
                            {!!methodName && <span className={`italic text-xs ${isDisabled ? "text-neutral-400" : "text-neutral-600"}`}>({methodName})</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
