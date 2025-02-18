import React from "react";
import SingleBottle from "./SingleBottle";

export default function DistBlock() {
    return (
        <>
            <div className="flex flex-row px-12 items-center mt-6">
                <div className="border border-neutral-300 bg-[#fffce3] rounded-lg shadow-lg h-96 w-96 p-3 mt-2 grid grid-cols-3">
                    {[...Array(7)].map((_, index) => {
                        return <SingleBottle key={index} details={{ label: index + 1 }} />;
                    })}
                </div>

                <div className="h-5 w-48 bg-amber-200"></div>

                <div className="rounded-full border border-neutral-300 bg-neutral-50 h-60 w-60 p-3 z-10 relative flex items-center">
                    <span className="mx-auto text-left font-medium">Dist Block</span>
                </div>
            </div>
        </>
    );
}
