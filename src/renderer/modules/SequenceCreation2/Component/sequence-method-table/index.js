import { useMemo, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigationPanel } from "../../../../../utils/context/navigation-provider"
import { useWindowSize } from "@uidotdev/usehooks"
import TableComponent from "../table-component"
import { tableColumns } from "../constants"
import MethodOptionEditingModel from "../../Model/method-option-editing-modell"
import { isEmpty } from "lodash"

export default function SequenceMethodTable() {
    const { watch, setValue } = useFormContext()

    const [editingSelectionOption, setEditingSelectionOption] = useState({})

    const sequence = watch("sequence")

    const methods = useSelector((state) => state.methodSetup.method)

    console.log(` o index factor : `, watch(`sequence[${0}].methodData.last_deaWashXFactor`))

    const sequenceMethod = useMemo(() => {
        return sequence?.map((el, index) => {
            const method = methods?.find((method) => method.id === el?.method?.value)

            setValue(`sequence[${index}].methodData`, { ...(isEmpty(watch(`sequence[${index}].methodData`)) ? method : watch(`sequence[${index}].methodData`)) })

            return {
                ...el
            }
        })
    }, [methods, sequence])

    const containerRef = useRef(null)

    const { isNavbarOpen } = useNavigationPanel()

    const { height: windowHeight } = useWindowSize()

    const handleClick = (option, methodData, index) => {
        option.detailsGroupName.map((el) => {
            setValue(el, methodData[el])
        })

        setEditingSelectionOption({ ...option, index })
    }

    return (
        <>
            <div className="bg-white shadow-xl rounded-lg p-6 max-w-full mx-auto border border-neutral-300">
                <div
                    ref={containerRef}
                    className={`overflow-x-auto rounded-lg border border-gray-200 shadow-inner transition-all duration-300 ${
                        isNavbarOpen ? "w-[calc(100vw-350px)]" : "w-[calc(100vw-100px)]"
                    }`}
                    style={{ height: windowHeight - (38 + 83.4 + 120 + 161.6 + 30) }}
                >
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="sticky left-0 top-0 z-30 bg-blue-800 text-white px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">
                                    Block
                                </th>

                                <th className="sticky left-[78px] top-0 z-30 bg-blue-800 text-white px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Method</th>

                                {tableColumns?.map((column, index) => (
                                    <th
                                        key={index}
                                        className="sticky top-0 z-20 bg-blue-600 text-white px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap"
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {sequenceMethod?.map((el, rowIndex) => {
                                return (
                                    <tr
                                        key={rowIndex}
                                        className={`group ${rowIndex % 2 === 0 ? "bg-white" : "bg-blue-50"} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}
                                    >
                                        <td
                                            className={`sticky left-0 z-10 px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap ${
                                                rowIndex % 2 === 0 ? "bg-white" : "bg-blue-50"
                                            } group-hover:bg-blue-100 transition-colors duration-200 ease-in-out`}
                                        >
                                            {el.block}
                                        </td>
                                        <td
                                            className={`sticky left-[78px] z-10 px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap ${
                                                rowIndex % 2 === 0 ? "bg-white" : "bg-blue-50"
                                            } group-hover:bg-blue-100 transition-colors duration-200 ease-in-out`}
                                        >
                                            {el.methodData.method_name ?? "-"}
                                        </td>

                                        {tableColumns?.map((column, index) => {
                                            return (
                                                <td key={index} className="border-t border-gray-200 px-4 py-2 text-sm text-gray-600 whitespace-nowrap">
                                                    <div
                                                        className="cursor-pointer group flex flex-row gap-2 items-center w-fit"
                                                        // TODO : need to change logic to save based on index
                                                        onClick={() => handleClick(column, el.methodData, rowIndex)}
                                                    >
                                                        <TableComponent methodData={el.methodData} column={column} />
                                                    </div>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {!isEmpty(editingSelectionOption) && <MethodOptionEditingModel onClose={() => setEditingSelectionOption({})} options={editingSelectionOption} />}
        </>
    )
}
