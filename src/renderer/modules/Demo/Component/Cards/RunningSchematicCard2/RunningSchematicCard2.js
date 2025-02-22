import React, { useState } from "react";
import AmediteBottleModel from "./Models/AmediteBottleModel";

export default function RunningSchematicCard2() {
    const [showAmediteBottleModel, setShowAmediteBottleModel] = useState(null);

    return (
        <>
            <div className="flex flex-row gap-9 w-fit border border-neutral-300 rounded-lg p-6">
                <div
                    className="border border-neutral-400 rounded-lg shadow-md h-32 w-32 mt-8 flex justify-center cursor-pointer"
                    onClick={() => setShowAmediteBottleModel("amedite1")}
                >
                    <span className="flex items-center text-center text-base text-neutral-700">Amedite 1</span>
                </div>

                <div className="border border-neutral-400 rounded-lg shadow-md h-32 w-32 flex justify-center cursor-pointer" onClick={() => setShowAmediteBottleModel("amedite2")}>
                    <span className="flex items-center text-center text-base text-neutral-700">Amedite 2</span>
                </div>

                <div
                    className="border border-neutral-400 rounded-lg shadow-md h-32 w-32 mt-8 flex justify-center cursor-pointer"
                    onClick={() => setShowAmediteBottleModel("amedite3")}
                >
                    <span className="flex items-center text-center text-base text-neutral-700">Amedite 3</span>
                </div>
            </div>

            <AmediteBottleModel amedite={showAmediteBottleModel} onClose={setShowAmediteBottleModel} />
        </>
    );
}
