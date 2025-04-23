import { Activity, RouteOff } from "lucide-react"
import React from "react"

export default function StylingBackground(props) {
    const { pipeState } = props

    return (
        <>
            {/* Background grid dots */}
            <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Status Indicator */}
            {!!pipeState?.length ? (
                <>
                    <div className="absolute top-4 right-4 bg-green-50 px-3 py-1 rounded-full border border-green-200 shadow-sm flex items-center">
                        <Activity size={16} className="text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-700">System Active</span>
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute top-4 right-4 bg-neutral-300 px-3 py-1 rounded-full border border-neutral-500 shadow-sm flex items-center">
                        <RouteOff size={16} className="text-gray-700 mr-1" />
                        <span className="text-sm font-medium text-gray-700">System Asleep</span>
                    </div>
                </>
            )}
        </>
    )
}
