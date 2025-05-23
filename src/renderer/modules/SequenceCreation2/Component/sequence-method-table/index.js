import { isBoolean, isObject, isString, set } from "lodash"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"

export default function SequenceMethodTable() {
    const { watch, setValue } = useFormContext()

    const sequence = watch("sequence")

    const methods = useSelector((state) => state.methodSetup.method)

    function categorizeObject(obj) {
        const first = []
        const nth = []
        const last = []
        const other = []

        for (const key in obj) {
            if (key.startsWith("1_")) {
                first.push({ key: key.slice(2), value: obj[key], originalKey: key })
            } else if (key.startsWith("n_")) {
                nth.push({ key: key.slice(2), value: obj[key], originalKey: key })
            } else if (key.startsWith("last_")) {
                last.push({ key: key.slice(5), value: obj[key], originalKey: key })
            } else {
                other.push({ key, value: obj[key], originalKey: key })
            }
        }

        return { first, nth, last, other }
    }

    const sequenceMethod = useMemo(() => {
        return sequence?.map((el, index) => {
            const method = methods?.find((method) => method.id === el?.method?.value)

            setValue(`sequence[${index}].methodData`, { ...el, methodData: method })

            return {
                ...el,
                method: { ...(categorizeObject(method) ?? {}), id: el?.method?.value }
            }
        })
    }, [methods, sequence])

    useEffect(() => {
        if (!sequenceMethod) {
            return
        }

        // setValue('')
    }, [sequenceMethod])

    console.log(`watch("sequence") : `, watch("sequence"))

    const [columns, setColumns] = useState([])
    const containerRef = useRef(null)
    const columnRefs = useRef({})

    // Collect all unique keys from first/nth/last/other
    useEffect(() => {
        const keys = new Set()
        sequenceMethod?.forEach(({ method }) => {
            ;["first", "nth", "last", "other"].forEach((group) => {
                method[group].forEach((item) => keys.add(item.key))
            })
        })
        setColumns([...keys])
    }, [sequenceMethod])

    const handleScrollToColumn = (key) => {
        const col = columnRefs.current[key]
        if (col && containerRef.current) {
            containerRef.current.scrollTo({
                left: col.offsetLeft - 500, // adjust for sticky block name
                behavior: "smooth"
            })
        }
    }

    function formatKey(str) {
        return str
            .replace(/([A-Z])/g, " $1") // Add space before each capital letter
            .replace(/^./, (s) => s.toUpperCase()) // Capitalize the first character
    }

    return (
        <>
            <div className="bg-white shadow-xl rounded-lg p-6 max-w-full mx-auto">
                {/* Table Title */}

                {/* Search & Scroll to Column Section */}
                <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <label htmlFor="column-select" className="block text-sm font-medium text-gray-700 whitespace-nowrap">
                        Search & Scroll to Column:
                    </label>
                    <div className="relative w-full md:w-80">
                        <select
                            id="column-select"
                            onChange={(e) => handleScrollToColumn(e.target.value)}
                            className="w-full p-3 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white appearance-none pr-8 cursor-pointer transition-all duration-200 ease-in-out hover:border-blue-400"
                        >
                            <option value="">Select a column</option>
                            {/* Map through columns to create dropdown options */}
                            {columns.map((colKey) => (
                                <option key={colKey} value={colKey}>
                                    {formatKey(colKey)}
                                </option>
                            ))}
                        </select>
                        {/* Custom dropdown arrow using SVG for better styling control */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Table Container - handles horizontal scrolling */}
                <div ref={containerRef} className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner w-[calc(100vw-328px)]">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                {/* Sticky 'Block' header column */}
                                <th className="sticky left-0 top-0 z-30 bg-blue-800 text-white px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">
                                    Block
                                </th>
                                {/* Other column headers */}
                                {columns?.map((colKey) => (
                                    <th
                                        key={colKey}
                                        // Assign ref to each column header for scrolling
                                        ref={(el) => (columnRefs.current[colKey] = el)}
                                        className="sticky top-0 z-20 bg-blue-600 text-white px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap"
                                    >
                                        {formatKey(colKey)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through sequenceMethod data to create table rows */}
                            {sequenceMethod?.map((el, rowIndex) => {
                                return (
                                    <tr
                                        key={rowIndex}
                                        className={`group ${rowIndex % 2 === 0 ? "bg-white" : "bg-blue-50"} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}
                                    >
                                        {/* Sticky 'Block' data cell */}
                                        <td
                                            className={`sticky left-0 z-10 px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap ${
                                                rowIndex % 2 === 0 ? "bg-white" : "bg-blue-50"
                                            } group-hover:bg-blue-100 transition-colors duration-200 ease-in-out`}
                                        >
                                            {el.block}
                                        </td>
                                        {/* Map through columns to display data for each row */}
                                        {columns?.map((colKey) => {
                                            const valueObj = [...el.method.first, ...el.method.nth, ...el.method.last, ...el.method.other].find((item) => item.key === colKey)

                                            return (
                                                <td key={colKey} className="border-t border-gray-200 px-4 py-2 text-sm text-gray-600 whitespace-nowrap">
                                                    {valueObj ? (
                                                        isObject(valueObj.value) ? (
                                                            valueObj?.value?.label
                                                        ) : isString(valueObj?.value) && valueObj?.value?.startsWith("#") ? (
                                                            <div className="w-9 h-6 rounded-lg" style={{ backgroundColor: valueObj.value }}></div>
                                                        ) : isString(valueObj.value) ? (
                                                            valueObj.value
                                                        ) : isBoolean(valueObj.value) ? (
                                                            !valueObj.value ? (
                                                                "Unchecked"
                                                            ) : (
                                                                "Checked"
                                                            )
                                                        ) : (
                                                            valueObj.value
                                                        )
                                                    ) : (
                                                        "-"
                                                    )}
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
        </>
    )
}
