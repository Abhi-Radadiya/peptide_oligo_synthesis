import { BringToFront } from "lucide-react";
import React from "react";

export function LiquidSensor(props) {
    const { isEnable, sensorNumber, className } = props;
    return (
        <>
            <div
                className={`absolute scale-[0.7] z-10 h-20 w-36 flex flex-col justify-center items-center border rounded-lg ${className} ${
                    !isEnable ? "bg-gray-200 border-neutral-300 cursor-not-allowed" : "shadow-lg hover:shadow-xl transition-all duration-300 border bg-[#e6e2cf]"
                }`}
            >
                {/* valveStatus */}
                <div className="flex flex-col items-center">
                    <BringToFront className={`mb-2 ${isEnable ? "text-black" : "text-neutral-400"}`} size={28} />

                    <span className={`flex items-center text-center text-base font-medium ${isEnable ? "text-slate-700" : "text-neutral-400"}`}>
                        L S <strong className="font-black ml-2">{sensorNumber}</strong>
                    </span>
                </div>
                {/* <div className={`absolute right-0 top-0 bottom-0 w-1 ${activeFlows.columnToBottomValve ? "bg-blue-400" : "bg-transparent"}`}></div> */}
            </div>
        </>
    );
}
