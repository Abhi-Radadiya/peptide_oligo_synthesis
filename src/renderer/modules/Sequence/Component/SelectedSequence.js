import { useWindowSize } from "@uidotdev/usehooks";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function SelectedSequence(props) {
    const { selectedSequence } = props;

    const { height: windowHeight } = useWindowSize();

    const { watch } = useFormContext();

    const currentExecutionIndex = watch("currentExecutedBlock")?.index;

    return (
        <>
            <div className="">
                <div className="mb-1 font-semibold text-gray-900">Select sequence</div>
                <div className="w-full max-w-[40vw] overflow-auto scrollbar-style" style={{ height: windowHeight - 445 }}>
                    {selectedSequence?.block?.map((el, index) => {
                        return (
                            <span
                                className={`inline-block ${currentExecutionIndex === index ? "bg-amber-300 border border-neutral-300 rounded-lg px-2" : "py-1 px-2"}`}
                                key={index}
                            >
                                {el.block}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
