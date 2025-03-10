import { Atom } from "lucide-react";
import React from "react";
import { PipeFlow } from "./pipe-flow";

export default function DistBlock(props) {
    const { pipeState } = props;

    return (
        <>
            <div className="h-32 w-32 rounded-full border-2 border-yellow-200 z-10 flex flex-col justify-center items-center cursor-pointer bg-gradient-to-r from-yellow-50 to-yellow-100 absolute left-[300px] top-[215px] hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center">
                    <Atom className="mb-2 text-yellow-500" size={32} />
                    <span className="flex items-center text-center text-base font-medium text-slate-700">Dist. Block</span>
                </div>
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
            </div>

            {/* dist <---> pump 1 */}
            <PipeFlow className="w-[57px] z-[1] h-2 top-[270px] left-[425px] border border-neutral-500 bg-neutral-50" is_flowing={pipeState?.distPump1} />
        </>
    );
}
