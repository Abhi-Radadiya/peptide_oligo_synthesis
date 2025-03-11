import { Sun } from "lucide-react";
import React from "react";
import { PipeFlow } from "./pipe-flow";

export default function UVSensor() {
    return (
        <>
            <div className="absolute top-[767px] left-[1095px] z-10 cursor-not-allowed">
                <div className="h-52 w-24 border border-neutral-300 rounded-lg bg-[#D3D3FF] flex justify-center items-center m-auto flex-col gap-2">
                    <div className="border-t border-neutral-500 w-full absolute top-7" />
                    <Sun />
                    <span className="text-neutral-700 text-sm font-normal">UV 1 -</span>
                    <span className="text-neutral-700 text-sm font-normal">UV 2 -</span>
                    <span className="text-neutral-700 text-sm font-normal">UV 3 -</span>
                    <div className="border-t border-neutral-500 w-full absolute top-[181px]" />
                </div>
            </div>

            {/* conductivity <---> UV chamber */}
            <PipeFlow className="w-[213px] z-[1] h-2 top-[863px] left-[884px] border border-neutral-500 bg-neutral-50" is_flowing={false} />

            {/* UV chamber <---> Waste Valve */}
            <PipeFlow className="w-2 z-[1] h-[155px] top-[613px] left-[1135px] border border-neutral-500 bg-neutral-50" is_flowing={false} isVertical />
        </>
    );
}
