import React from "react";

export default function BlockCard() {
    const blocks = [
        { block: "fU", method: "m1 xyz" },
        { block: "fC", method: "m1 xyz" },
        { block: "A", method: "m1 xyz" },
        { block: "mA", method: "m1 xyz" },
        { block: "A", method: "m1 xyz" },
        { block: "T", method: "m1 xyz" },
        { block: "G", method: "m1 xyz" },
        { block: "A", method: "m1 xyz" },
        { block: "C", method: "m1 xyz" },
        { block: "y", method: "m1 xyz" },
        { block: "U", method: "m1 xyz" },
        { block: "fC", method: "m1 xyz" },
        { block: "A", method: "m1 xyz" },
        { block: "mA", method: "m1 xyz" },
        { block: "A", method: "m1 xyz" },
        { block: "T", method: "m1 xyz" },
        { block: "G", method: "m1 xyz" },
        { block: "A", method: "m1 xyz" },
        { block: "C", method: "m1 xyz" },
        { block: "y", method: "m1 xyz" },
        { block: "U", method: "m1 xyz" },
        { block: "fC", method: "m1 xyz" },
        { block: "A", method: "m1 xyz" },
    ];

    return (
        <>
            <div className="bg-white shadow-lg flex-grow rounded-xl overflow-hidden min-w-[400px] w-[400px] border border-neutral-200 transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4">
                    <h2 className="text-lg font-semibold text-neutral-800">Blocks</h2>
                </div>

                <div className="p-4 -m-2">
                    {blocks.map((el, index) => {
                        return (
                            <div
                                className={`border inline-block border-neutral-300 rounded-lg px-2 py-1 m-2 ${index === 8 ? "bg-amber-200" : "bg-neutral-100"}`}
                                key={index}
                            >
                                <span className="font-medium mr-1">{el.block}</span>

                                <span className="text-sm italic text-neutral-700">({el.method})</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
