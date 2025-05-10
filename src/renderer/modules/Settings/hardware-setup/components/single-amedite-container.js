import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import SingleValveBlock from "./single-valve-block"

export const MAX_BOTTLES_PER_AMEDITE_CONTAINER = 20
export const MAX_BOTTLE_PER_REAGENT_CONTAINER = 20

export default function SingleAmediteContainer(props) {
    const { containerName, containerType } = props

    const isReagent = containerType === "reagent"

    const containerBottles = useSelector((state) => state.hardwareSetup[containerType === "reagent" ? "reagentContainer" : "amediteContainer"]?.[containerName])

    const getTitle = useMemo(() => {
        switch (containerName) {
            // Rename in redux to change it from container to block
            case "container1":
                return "Block 1"

            case "container2":
                return "Block 2"

            case "container3":
                return "Block 3"

            default:
                break
        }
    }, [containerName])

    return (
        <>
            <div
                className={`bg-gradient-to-br flex flex-col from-purple-50 to-purple-100 rounded-lg border-neutral-200 border shadow-md p-6 transition-all duration-300 hover:shadow-lg`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">{getTitle}</h2>

                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {containerBottles?.bottles?.length}/{isReagent ? MAX_BOTTLE_PER_REAGENT_CONTAINER : MAX_BOTTLES_PER_AMEDITE_CONTAINER}
                    </span>
                </div>

                {containerBottles?.bottles.length === 0 ? (
                    <div className="flex items-center justify-center grow text-gray-500 italic">
                        <span>No bottles added yet</span>
                    </div>
                ) : (
                    <>
                        <div className="space-y-3 pr-2 -mr-2 max-h-[210px] pb-2 overflow-auto scrollbar-style">
                            {containerBottles?.bottles.map((bottle, index) => {
                                return <SingleValveBlock containerName={containerName} containerType={containerType} key={index} index={index} bottle={bottle} />
                            })}
                        </div>
                        <div className="grow" />
                    </>
                )}

                <div className="mt-4 h-2 bg-gray-300 rounded-full">
                    <div
                        className="h-2 bg-indigo-600 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${(containerBottles.bottles.length / (isReagent ? MAX_BOTTLE_PER_REAGENT_CONTAINER : MAX_BOTTLES_PER_AMEDITE_CONTAINER)) * 100}%` }}
                    ></div>
                </div>

                <div className="text-right mt-1 text-xs text-gray-500">
                    {(isReagent ? MAX_BOTTLE_PER_REAGENT_CONTAINER : MAX_BOTTLES_PER_AMEDITE_CONTAINER) - containerBottles.bottles.length} spaces remaining
                </div>
            </div>
        </>
    )
}
