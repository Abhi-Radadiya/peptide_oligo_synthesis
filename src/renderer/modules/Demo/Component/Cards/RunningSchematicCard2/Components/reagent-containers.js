import React, { useState } from "react";
import { FlaskConical } from "lucide-react";
import { PipeFlow } from "./pipe-flow";
import ReagentModel from "../Models/ReagentModel";

export default function ReagentContainers(props) {
    const { pipeState } = props;

    const [showReagentModel, setShowReagentModel] = useState(false);

    return (
        <>
            <div
                className="absolute left-[280px] top-[550px] border border-amber-200 z-10 rounded-lg h-32 w-36 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-amber-50 to-amber-100 cursor-pointer transform -skew-x-[12deg] hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => setShowReagentModel(1)}
            >
                <div className="skew-x-[12deg] flex flex-col items-center">
                    <FlaskConical className="text-amber-500" size={32} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Reagent 1</span>
                </div>

                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm skew-x-[12deg] animate-pulse"></div>
            </div>

            <div
                className="absolute left-[1280px] top-[90px] z-10 border border-amber-200 rounded-lg h-32 w-36 shadow-lg flex flex-col justify-center items-center bg-gradient-to-r from-amber-50 to-amber-100 cursor-pointer transform -skew-x-[12deg] hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => setShowReagentModel(2)}
            >
                <div className="skew-x-[12deg] flex flex-col items-center">
                    <FlaskConical className="text-amber-500" size={32} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Reagent 2</span>
                </div>
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm skew-x-[12deg] animate-pulse"></div>
            </div>

            {/* Reagent 1 */}
            <PipeFlow className="w-[210px] z-[1] h-2 top-[442px] left-[254px] -rotate-90 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.reagent1} />

            {/* Reagent 2 */}
            <PipeFlow isVertical className="w-2 z-[1] h-[178px] top-[216px] left-[1361px] border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.reagent2LS3} />

            {!!showReagentModel && <ReagentModel reagentContainer={showReagentModel} onClose={() => setShowReagentModel(null)} />}
        </>
    );
}
