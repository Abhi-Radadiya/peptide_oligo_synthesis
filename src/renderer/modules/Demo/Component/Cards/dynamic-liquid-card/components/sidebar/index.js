import React, { useMemo } from "react"
import { useSelector } from "react-redux"

export const Sidebar = ({ onAddNode }) => {
    const renderSection = (title, items, nodeType, dataExtractor) => (
        <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 border-b pb-1">{title}</h3>
            <div className="space-y-1">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onAddNode(nodeType, dataExtractor(item))}
                        className="block w-full text-left px-2 py-1 text-sm bg-white hover:bg-indigo-100 border border-gray-200 rounded shadow-sm transition-colors duration-150 ease-in-out"
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )

    const hardwareSetup = useSelector((state) => state.hardwareSetup)

    const wasteOption = useMemo(() => {
        return hardwareSetup?.wasteContainer?.bottles?.map((el) => ({ name: el.bottleName, id: el.id })) ?? []
    }, [hardwareSetup.sensor])

    const sensorOptions = useMemo(() => {
        return hardwareSetup?.sensor?.map((el) => ({ name: el.sensorName, id: el.sensor.id, index: el.sensor.index })) ?? []
    }, [hardwareSetup.sensor])

    const pumpOption = useMemo(() => {
        return hardwareSetup?.pump?.map((el) => ({ name: el.pumpName, id: el.pump.id, index: el.pump.index })) ?? []
    }, [hardwareSetup.pump])

    const valveOptions = [
        { name: "Bottom Valve", ...hardwareSetup.otherValve.bottomValve },
        { name: "Top Valve", ...hardwareSetup.otherValve.topValve },
        { name: "RG Valve", ...hardwareSetup.otherValve.rgValve },
        { name: "Waste Valve", ...hardwareSetup.otherValve.wasteValve }
    ]

    return (
        <div className="w-64 h-full bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto scrollbar-style shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Components</h2>

            <button
                onClick={() => onAddNode("bottleNode", {})}
                className="block w-full text-left px-2 py-1 text-sm bg-white hover:bg-purple-100 border border-gray-200 rounded shadow-sm transition-colors duration-150 ease-in-out"
                title={`Add Bottle`}
            >
                Add Bottle
            </button>

            <button
                onClick={() => onAddNode("delayBlock", {})}
                className="block w-full text-left px-2 py-1 text-sm bg-white hover:bg-purple-100 border border-gray-200 rounded shadow-sm transition-colors duration-150 ease-in-out"
                title="Delay Block"
            >
                Delay Block
            </button>

            {renderSection("Valves", valveOptions, "valveNode", (item) => ({ name: item.name, originalId: item.id }))}
            {renderSection("Pumps", pumpOption, "pumpNode", (item) => ({ name: item.name, originalId: item.id }))}
            {renderSection("Liquid Sensors", sensorOptions, "sensorNode", (item) => ({ name: item.name, originalId: item.id }))}
            {renderSection("Waste Valves", wasteOption, "wasteValveNode", (item) => ({ name: item.name, originalId: item.id }))}
        </div>
    )
}
