import React from "react";
import { Droplet, AlertCircle } from "lucide-react";

export default function SingleBottle(props) {
    const { bottleDetails, isActive, handleClick } = props;
    const { label, index, fillLevel = Math.random() * 0.9 + 0.1 } = bottleDetails;
    const isLow = fillLevel < 0.3;

    return (
        <div className="flex flex-col items-center group">
            <div className="relative w-24 h-32 mb-2">
                <div
                    className={`absolute bottom-0 w-full h-full rounded-t-full rounded-b-lg cursor-pointer transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 flex flex-col overflow-hidden border-2 ${
                        isActive ? "border-emerald-400 shadow-md shadow-emerald-100" : "border-slate-200 shadow-sm"
                    }`}
                    onClick={handleClick}
                >
                    {/* Bottle neck */}
                    <div className="h-5 w-10 mx-auto rounded-t-full bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-300"></div>

                    {/* Bottle body */}
                    <div className="flex-grow rounded-b-lg bg-gradient-to-r from-slate-50 to-slate-100 relative flex items-center justify-center">
                        {/* Liquid fill */}
                        <div
                            className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out ${
                                isActive ? "bg-gradient-to-t from-emerald-400 to-emerald-300" : "bg-gradient-to-t from-blue-400 to-blue-300"
                            }`}
                            style={{ height: `${fillLevel * 100}%` }}
                        >
                            {/* Bubble animation effect */}
                            <div className="absolute w-2 h-2 bg-white opacity-70 rounded-full left-1/4 animate-bubble-1"></div>
                            <div className="absolute w-1 h-1 bg-white opacity-70 rounded-full left-2/3 animate-bubble-2"></div>
                        </div>

                        {/* Chemical name label */}
                        <span className="text-center text-sm font-medium text-slate-700 z-10 px-1">{label}</span>

                        {/* Low level warning */}
                        {isLow && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-20 shadow-md animate-pulse">
                                <AlertCircle size={14} className="text-white" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 shadow-md flex items-center justify-center animate-pulse">
                        <Droplet size={12} className="text-white" />
                    </div>
                )}
            </div>

            {/* Bottle index number */}
            <div className="bg-slate-700 text-white text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center shadow-sm">{index}</div>
        </div>
    );
}
