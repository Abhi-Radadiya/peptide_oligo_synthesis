import React from "react";
import { useSelector } from "react-redux";
import SingleWasteBlock from "./single-waste-block";

export const MAX_WASTE_BOTTLES = 5;

export default function WasteContainer() {
    const containerBottles = useSelector((state) => state.hardwareSetup.wasteContainer);

    return (
        <>
            <div className="flex flex-col bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg border-neutral-200 border shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Waste Container</h2>

                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {containerBottles?.bottles?.length}/{MAX_WASTE_BOTTLES}
                    </span>
                </div>

                {containerBottles?.bottles.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 italic">No bottles added yet</div>
                ) : (
                    <div className="">
                        {containerBottles?.bottles.map((bottle, index) => (
                            <SingleWasteBlock key={index} bottle={bottle} index={index} />
                        ))}
                    </div>
                )}
                <div className="grow"></div>

                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-2 bg-indigo-600 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${(containerBottles.bottles.length / MAX_WASTE_BOTTLES) * 100}%` }}
                    ></div>
                </div>
                <div className="text-right mt-1 text-xs text-gray-500">{MAX_WASTE_BOTTLES - containerBottles.bottles.length} spaces remaining</div>
            </div>
        </>
    );
}
