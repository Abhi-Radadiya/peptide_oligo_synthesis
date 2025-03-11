import { Tally2 } from "lucide-react";
import React from "react";
import { PipeFlow } from "./pipe-flow";

export default function ConductivityBlock() {
    return (
        <>
            <div className="absolute top-[800px] left-[790px] z-10 cursor-not-allowed">
                <div className="h-36 w-24 border border-neutral-300 rounded-lg bg-gray-200 flex justify-center items-center m-auto flex-col gap-2">
                    <div className="border-t border-neutral-500 w-full absolute top-7" />
                    <Tally2 className="ml-2 mt-4" />
                    <span className="text-neutral-700 text-sm font-normal">Conductivity</span>
                </div>
            </div>

            <PipeFlow className="w-2 z-[1] h-8 top-[773px] left-[773px] border border-neutral-500 bg-neutral-50" is_flowing={false} isVertical />
        </>
    );
}
