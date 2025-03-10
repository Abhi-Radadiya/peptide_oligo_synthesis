import React, { useState } from "react";
import WasteBlockSelectionModel from "../Models/waste-block-selection-model";
import { PipeFlow } from "./pipe-flow";

export default function WasteBlock() {
    const [showWasteBlockSelectionModel, setShowWasteBlockSelectionModel] = useState(false);

    return (
        <>
            <div
                className="absolute left-[1246px] top-[670px] border-2 z-10 border-cyan-300 rounded-full h-24 w-40 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-cyan-50 to-cyan-100 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => setShowWasteBlockSelectionModel(true)}
            >
                <div className="absolute inset-1 rounded-full border border-dashed border-cyan-200"></div>
                <span className="flex items-center text-center text-base font-medium text-slate-700">Waste Column</span>
                <div className="w-3/4 px-2 mt-1">
                    <div className="bg-gray-200 rounded-full h-1 w-full">
                        <div className="bg-cyan-500 h-1 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                </div>
            </div>

            <PipeFlow className="w-[66px] z-[1] h-2 top-[636px] left-[1299px] -rotate-90 border border-neutral-500 bg-neutral-50" is_flowing={false} />

            {showWasteBlockSelectionModel && <WasteBlockSelectionModel onClose={() => setShowWasteBlockSelectionModel(false)} />}
        </>
    );
}
