import React from "react";

export default function PumpBlock() {
    return (
        <>
            <div className="w-36 h-20 text-center bg-gray-300 mt-8 mx-auto flex items-center relative">
                <span className="mx-auto text-xl font-medium">Pump</span>
                <div className="absolute w-5 h-32 bg-neutral-400 bottom-20 left-[calc(50%-15px)]"></div>
            </div>
        </>
    );
}
