import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"
import { useSelector } from "react-redux"

export const ColumnNode = memo(({ id, data, selected }) => {
    const columnEditor = useSelector((state) => state.columnEditor.positions)

    const handleDelete = useCallback(() => {
        if (data.deleteNode) {
            data.deleteNode(id)
        } else {
            console.warn("deleteNode function not passed to node:", id)
        }
    }, [id, data.deleteNode])

    const columnDetails = useMemo(() => columnEditor.find((column) => column.id === data.originalId), [columnEditor, data])

    return (
        <div className={`bg-teal-50 rounded-lg shadow border-2 ${selected ? "border-teal-600" : "border-teal-300"} p-3 w-64 transition-colors duration-150 ease-in-out`}>
            {id}
            <button
                onClick={handleDelete}
                className="absolute top-0 right-0 -mt-1 -mr-1 p-0.5 bg-red-500 text-white rounded-full text-xs leading-none hover:bg-red-700 transition-colors focus:outline-none"
                title="Delete Node"
                aria-label="Delete Node"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <div className="font-semibold text-sm mb-2 text-teal-800">{data.name} Column</div>

            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
                <p className="mt-2 text-gray-600 flex justify-between w-full">
                    <span>Diameter:</span>
                    <strong>{columnDetails.diameter} PSI</strong>
                </p>
                <p className="mt-2 text-gray-600 flex justify-between w-full">
                    <span>Height:</span>
                    <strong>{columnDetails.height} mm</strong>
                </p>
                <p className="mt-2 text-gray-600 flex justify-between w-full">
                    <span>Max Flow Rate:</span>
                    <strong>{columnDetails.maxFlowRate} ml/s</strong>
                </p>
                <p className="mt-2 text-gray-600 flex justify-between w-full">
                    <span>Diameter:</span>
                    <strong>{columnDetails.diameter} mm</strong>
                </p>
                <p className="mt-2 text-gray-600 flex justify-between w-full">
                    <span>Max Pressure:</span>
                    <strong>{columnDetails.maxPressure} ml</strong>
                </p>
                <p className="mt-2 text-gray-600 flex justify-between w-full">
                    <span>Liquid volume:</span>
                    <strong>{columnDetails.liquidVolume} ml</strong>
                </p>
                <p className="mt-2 text-gray-600 flex justify-between w-full">
                    <span>Loading volume:</span>
                    <strong>{columnDetails.loadingVolume} ml</strong>
                </p>
            </div>

            <Handle type="target" position={Position.Left} id={`${id}-target`} className="!bg-gray-400" style={{ height: 12, width: 12 }} />
            <Handle type="source" position={Position.Right} id={`${id}-source`} className="!bg-teal-500" style={{ height: 12, width: 12 }} />
        </div>
    )
})

ColumnNode.displayName = "ColumnNode"
