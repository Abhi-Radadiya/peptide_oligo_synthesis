import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export default function BlockCard() {
    const sequence = useSelector((state) => state.sequence.sequence);

    const { watch } = useFormContext();

    const selectedSequenceData = sequence?.find((seq) => seq.id === watch("sequence.value"));

    const selectedBlockIndices = watch("selectedBlocks")?.map((block) => block.index);

    const getMethodName = (methodId) => {
        return watch("selectedBlocks")?.find((el) => el.method.id === methodId)?.method.method_name;
    };

    return (
        <div className="bg-white shadow-lg flex-grow rounded-xl overflow-hidden min-w-[400px] w-[400px] border border-neutral-200 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4">
                <h2 className="text-lg font-semibold text-neutral-800">Blocks</h2>
            </div>

            <div className="p-4 -m-2">
                {selectedSequenceData?.block?.map((el, index) => {
                    const isDisabled = !selectedBlockIndices.includes(index);

                    const methodName = getMethodName(el.method.value);

                    return (
                        <div
                            className={`inline-block rounded-lg px-2 py-1 m-2 transition-all duration-300 ${
                                isDisabled
                                    ? "bg-neutral-100 text-neutral-400 text-sm italic shadow-sm opacity-70 cursor-not-allowed"
                                    : "border bg-neutral-50 shadow-lg border-neutral-400"
                            }`}
                            key={index}
                        >
                            <span className="font-medium mr-1">{el.block}</span>

                            {!!methodName && <span className={`italic text-xs ${isDisabled ? "text-neutral-400" : "text-neutral-600"}`}>({methodName})</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
