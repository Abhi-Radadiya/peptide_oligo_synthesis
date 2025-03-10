import React from "react";

export default function Legends() {
    return (
        <>
            {/* Legend */}
            <div className="absolute top-4 left-4 bg-white bg-opacity-80 z-20 p-2 rounded-lg shadow-sm border border-gray-100">
                <div className="text-xs font-medium text-gray-700 mb-1">Flow Legend</div>
                <div className="flex items-center gap-1 mb-1">
                    <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                    <span className="text-xs">Amedite</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span className="text-xs">Reagent</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                    <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    <span className="text-xs">Pump Flow</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-xs">Process Flow</span>
                </div>
            </div>
        </>
    );
}
