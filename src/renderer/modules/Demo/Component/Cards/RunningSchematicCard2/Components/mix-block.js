import { Vault } from "lucide-react";
import React from "react";
import { PipeFlow } from "./pipe-flow";

export default function MixBlock(props) {
    const { pipeState } = props;

    return (
        <>
            {/* Mix Block */}
            <div className="absolute top-[220px] left-[780px] bg-gradient-to-br z-[10] from-blue-100 to-neutral-50 rounded-full h-24 w-24 flex flex-col justify-center items-center border-2 border-blue-200 shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center">
                    <Vault className="mb-2 text-blue-500" size={28} />
                    <span className="flex items-center text-center text-xs font-medium text-blue-600">Mix Block</span>
                </div>
                <div className={`absolute inset-2 rounded-full border border-dashed border-blue-200`}></div>
            </div>

            <PipeFlow className="w-[24px] z-[1] h-2 top-[322px] left-[815px] border rotate-90 border-neutral-500 bg-neutral-50" is_flowing={pipeState?.mixBlockTopValve} />
        </>
    );
}
