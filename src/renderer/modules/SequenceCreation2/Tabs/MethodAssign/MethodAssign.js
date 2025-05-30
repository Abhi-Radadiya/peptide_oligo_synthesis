import { useState, useCallback, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import Select from "react-select"
import { useSelector } from "react-redux"
import { getTextColorForBackground } from "../../../../Helpers/Constant"
import { InfoIcon } from "lucide-react"
import MethodDetailModel from "../../Model/MethodDetailModel"
import { usePopper } from "react-popper"

const MethodAssign = (props) => {
    const { isExpanded } = props
    const { watch, setValue } = useFormContext()
    const [tooltipContent, setTooltipContent] = useState(null)
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [showTooltip, setShowTooltip] = useState(false)

    const methods = useSelector((state) => state.methodSetup.method)

    const methodMenuItem = useMemo(() => {
        return methods.map((el) => {
            return { label: el.method_name, value: el.id, option: { color: el.color } }
        })
    }, [methods])

    const [selectedBlocks, setSelectedBlocks] = useState(new Set())

    const [lastSelectedIndex, setLastSelectedIndex] = useState(null)

    const [displayOption, setDisplayOption] = useState(1)

    const sequence = watch("sequence")

    const handleBlockClick = useCallback(
        (index, event) => {
            setSelectedBlocks((prev) => {
                const newSelection = new Set(prev)

                if (event.shiftKey && lastSelectedIndex !== null) {
                    const start = Math.min(lastSelectedIndex, index)
                    const end = Math.max(lastSelectedIndex, index)

                    for (let i = start; i <= end; i++) {
                        newSelection.add(i)
                    }
                } else {
                    if (newSelection.has(index)) {
                        if (displayOption === 1) newSelection.delete(index)
                        else {
                            newSelection.delete(index)
                            newSelection.delete(index + 1)
                            newSelection.delete(index + 2)
                        }
                    } else {
                        if (displayOption === 1) newSelection.add(index)
                        else {
                            newSelection.add(index)
                            newSelection.add(index + 1)
                            newSelection.add(index + 2)
                        }
                    }
                }

                const updatedSequence = sequence.map((block, i) => ({
                    ...block,
                    isSelected: newSelection.has(i)
                }))

                setValue("sequence", updatedSequence)

                return newSelection
            })

            setLastSelectedIndex(index)
        },
        [lastSelectedIndex, sequence, setValue, displayOption]
    )

    const clearSelection = () => {
        setSelectedBlocks(new Set())
        setLastSelectedIndex(null)

        const updatedSequence = sequence.map((block) => ({
            ...block,
            isSelected: false
        }))
        setValue("sequence", updatedSequence)
    }

    const handleSelectAll = useCallback(() => {
        setSelectedBlocks(() => {
            const newSelection = new Set()

            sequence.forEach((_, index) => {
                newSelection.add(index)
            })

            const updatedSequence = sequence.map((block, index) => ({
                ...block,
                isSelected: true
            }))

            setValue("sequence", updatedSequence)

            return newSelection
        })

        setLastSelectedIndex(sequence.length - 1)
    }, [sequence, setValue])

    const handleMethodSelect = (displayOption) => {
        if (!displayOption) return

        const methodAssignedSequence = sequence.map((el) => {
            if (el.isSelected) {
                return { ...el, isSelected: false, method: { value: displayOption.value } }
            } else return { ...el, isSelected: false }
        })

        setValue("sequence", methodAssignedSequence)

        setSelectedBlocks(new Set())

        setLastSelectedIndex(null)
    }

    const getBlockStyle = (index) => {
        const baseStyle = "m-1 border relative rounded transition-colors duration-200 w-fit"
        const selected = selectedBlocks.has(index)

        if (selected) {
            return `${baseStyle} border-blue-400`
        }

        return `${baseStyle} border-gray-300 hover:bg-gray-200`
    }

    const getBlockGroups = () => {
        if (displayOption === 3) {
            return sequence?.reduce((acc, _, index) => {
                if (index % 3 === 0) {
                    const group = sequence.slice(index, index + 3)
                    if (group.length > 0) {
                        acc.push(group)
                    }
                }
                return acc
            }, [])
        }
        return sequence?.map((block) => [block])
    }

    const getMethodDetailsById = (id) => {
        return methodMenuItem.find((el) => el.value === id)
    }

    const toggleDisplayOption = () => {
        clearSelection()

        const currentDisplayOption = displayOption === 3 ? 1 : 3

        setDisplayOption(currentDisplayOption)

        const blocks = sequence.map((block) => block.block)

        let sequenceString = ""

        if (currentDisplayOption === 1) {
            sequenceString = blocks.join(" ")
        } else {
            sequenceString = blocks.map((block, index) => (index > 0 && (index + 1) % 3 === 0 ? `${block} ` : block)).join("")
        }

        setValue("textAreaSequenceString", sequenceString)
    }

    const [displayMethodDetailBlock, setDisplayMethodDetailBlock] = useState(false)

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: "top",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 10]
                }
            }
        ]
    })

    const handleMouseEnter = (label, element) => {
        if (!label) return
        setTooltipContent(label)
        setReferenceElement(element)
        setShowTooltip(true)
    }

    const handleMouseLeave = () => {
        setShowTooltip(false)
    }

    return (
        <>
            <div className={`relative w-1/2 overflow-y-auto scrollbar-style overflow-x-hidden px-2 -mr-2 pr-2 ml-4 ${isExpanded ? "h-[calc(100vh-60px)]" : "h-[150px]"}`}>
                <div className="z-10 border-b border-neutral-300 pr-2 pb-2">
                    <div className="max-w-7xl mx-auto flex flex-row justify-between items-center">
                        <div className="pt-1 flex flex-row items-center gap-2">
                            <button onClick={handleSelectAll} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100">
                                Select All
                            </button>

                            <button onClick={clearSelection} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100">
                                Clear Selection
                            </button>

                            <button onClick={toggleDisplayOption} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100">
                                {displayOption} Block
                            </button>
                        </div>

                        <div className="flex flex-row items-center gap-1">
                            <InfoIcon size={20} className="cursor-pointer" onClick={() => setDisplayMethodDetailBlock(true)} />

                            <Select
                                options={methodMenuItem}
                                placeholder="Assign method"
                                onChange={handleMethodSelect}
                                value={null}
                                isDisabled={selectedBlocks.size === 0}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        width: "250px",
                                        borderColor: "#d1d5db",
                                        "&:hover": {
                                            borderColor: "#6b7280"
                                        }
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    {getBlockGroups()?.map((group, groupIndex) => {
                        const baseIndex = groupIndex * (displayOption || 1)

                        const selected = selectedBlocks.has(baseIndex)

                        return (
                            <div key={groupIndex} className={`${displayOption === 3 ? "mb-2 p-1 rounded inline-block" : "inline-block"}`}>
                                {displayOption === 3 ? (
                                    <div
                                        onClick={(e) => handleBlockClick(baseIndex, e)}
                                        className={getBlockStyle(baseIndex)}
                                        style={{ background: selected ? "#bedbff" : "#f3f4f6" }}
                                        role="button"
                                        tabIndex={groupIndex}
                                    >
                                        <div className="flex flex-row gap-1 items-center">
                                            {group.map((block, blockIndex) => {
                                                const methodDetails = getMethodDetailsById(block?.method?.value)

                                                return (
                                                    <p
                                                        key={blockIndex + "_block"}
                                                        onMouseLeave={handleMouseLeave}
                                                        onMouseEnter={(e) => handleMouseEnter(methodDetails?.label, e.currentTarget)}
                                                        className="w-8 h-8 flex items-center justify-center rounded cursor-pointer transition-all duration-300 hover:shadow"
                                                        style={{ backgroundColor: block.color }}
                                                    >
                                                        {block.block}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    group.map((block, innerIndex) => {
                                        const index = baseIndex + innerIndex
                                        const methodDetails = getMethodDetailsById(block?.method?.value)
                                        const selected = selectedBlocks.has(index)
                                        const backgroundColor = selected ? "#bedbff" : methodDetails?.option?.color ?? "#f3f4f6"
                                        const textColor = getTextColorForBackground(backgroundColor)

                                        return (
                                            <div
                                                key={index}
                                                onClick={(e) => handleBlockClick(index, e)}
                                                className={getBlockStyle(index) + " px-2 py-1 hover:shadow-md hover:scale-110 hover:rounded-lg transition-all duration-300"}
                                                role="button"
                                                style={{ background: backgroundColor, color: textColor }}
                                                tabIndex={innerIndex + groupIndex}
                                                onMouseEnter={(e) => handleMouseEnter(methodDetails?.label, e.currentTarget)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <span className={`text-[${textColor}]`}>{block.block}</span>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        )
                    })}
                </div>

                {selectedBlocks.size > 0 && (
                    <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                        <p className="text-sm text-gray-600">
                            Selected blocks :{" "}
                            {Array.from(selectedBlocks)
                                .map((i) => sequence[i]?.block)
                                .join(", ")}
                        </p>
                    </div>
                )}
            </div>

            {showTooltip && (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className={`bg-black text-white px-3 py-1 z-[11] rounded text-sm transition-opacity duration-300 ${showTooltip ? "opacity-100" : "opacity-0"}`}
                >
                    {tooltipContent}
                </div>
            )}

            {displayMethodDetailBlock && <MethodDetailModel methods={methods} onClose={() => setDisplayMethodDetailBlock(false)} />}
        </>
    )
}

export default MethodAssign

// const ZoomablePanel = () => {
//     const [isExpanded, setIsExpanded] = useState(false)

//     return (
//         <>
//             {!isExpanded && (
//                 <motion.div layoutId="method-panel" className="rounded-lg w-1/2 border p-2 -mr-2 pr-2 ml-4" onClick={() => setIsExpanded(true)}>
//                     <MethodAssign />
//                 </motion.div>
//             )}

//             {isExpanded && (
//                 <motion.div
//                     layoutId="method-panel"
//                     className="fixed inset-0 z-50 bg-white p-4 border rounded-lg w-[90vw] h-[90vh] border-neutral-500 m-auto overflow-auto"
//                     onClick={() => setIsExpanded(false)}
//                 >
//                     <MethodAssign />
//                 </motion.div>
//             )}
//         </>
//     )
// }

// export default ZoomablePanel
