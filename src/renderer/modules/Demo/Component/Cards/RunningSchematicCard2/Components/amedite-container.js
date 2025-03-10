import React, { useState } from "react";
import { PipeFlow } from "./pipe-flow";
import { Beaker } from "lucide-react";
import AmediteBottleModel from "../Models/AmediteBottleModel";

export default function AmediteContainer(props) {
    const { pipeState } = props;

    const [showAmediteBottleModel, setShowAmediteBottleModel] = useState(null);

    return (
        <>
            {/* Amedite 1  */}
            <div
                className="absolute border border-purple-200 z-10 rounded-lg shadow-lg h-36 w-36 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 left-36"
                onClick={() => setShowAmediteBottleModel(`amedite${1}`)}
            >
                <div className="flex flex-col items-center">
                    <Beaker className="mb-2 text-purple-500" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite 1</span>
                </div>

                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm animate-pulse"></div>
            </div>

            {/* Amedite 2 */}
            <div
                className="border border-purple-200 rounded-lg z-10 shadow-lg h-36 w-36 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 absolute left-8 top-52"
                onClick={() => setShowAmediteBottleModel(`amedite${2}`)}
            >
                <div className="flex flex-col items-center">
                    <Beaker className="mb-2 text-purple-500" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite 2</span>
                </div>

                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm animate-pulse"></div>
            </div>

            {/* Amedite 3 */}
            <div
                className="border border-purple-200 rounded-lg shadow-lg h-36 w-36 z-10 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 absolute left-36 top-[380px]"
                onClick={() => setShowAmediteBottleModel(`amedite${3}`)}
            >
                <div className="flex flex-col items-center">
                    <Beaker className="mb-2 text-purple-500" size={28} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Amedite 3</span>
                </div>

                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm animate-pulse"></div>
            </div>

            {/* Amedite 1  <--->  Dist block */}
            <PipeFlow className="w-20 z-[1] h-2 top-48 left-[265px] rotate-45 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.amedite1} />

            {/* Amedite 2  <--->   Dist block */}
            <PipeFlow className="w-32 z-[1] h-2 top-[270px] left-[174px] border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.amedite2} />

            {/* Amedite 3  <--->   Dist block */}
            <PipeFlow className="w-20 z-[1] h-2 top-[358px] left-[266px] -rotate-45 border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.amedite3} />

            {!!showAmediteBottleModel && <AmediteBottleModel amedite={showAmediteBottleModel} onClose={() => setShowAmediteBottleModel(null)} />}
        </>
    );
}
