// const availabelBlocks = ["fA", "fC", "fU", "A", "T", "mA", "C", "mT"];

// const yy = "fA fC ACmAfU fC";

// const xsx = ["fA", "fC", "A", "C", "mA", "fU", "fC"];

import React, { useEffect, useCallback, useMemo, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { debounce } from "lodash"
import { useSelector } from "react-redux"
import { findAmediteLabel } from "../../../../../Helpers/Constant"
import { InfoIcon, Scaling } from "lucide-react"
import BlockDetailsModel from "../../../Model/BlockDetailsModel"

export default function TextArea(props) {
    const { handleScale, isExpanded } = props

    const { control, setValue, clearErrors, setError } = useFormContext()

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite)

    const amediteList = useSelector((state) => state.amedite.amediteList)

    const [showBlockModel, setShowBlockModel] = useState(false)

    // show only blocks used in priming
    const availableBlocks = useMemo(() => {
        return [...new Set([...ameditePosition.map((el) => findAmediteLabel(amediteList, el.value)).filter((el) => !!el)])] // get all label => filter defined value => remove duplicate entries
    }, [ameditePosition, amediteList])

    const maxBlockLength = Math.max(...availableBlocks.map((block) => block.length))

    const validateAndFormatSequence = (inputString) => {
        const trimmedString = inputString.replaceAll(" ", "")
        const result = []
        let currentPos = 0
        let isValid = true
        let invalidBlocks = []

        while (currentPos < trimmedString.length) {
            let matchFound = false

            for (let length = Math.min(maxBlockLength, trimmedString.length - currentPos); length > 0; length--) {
                const currentBlock = trimmedString.substr(currentPos, length)

                if (availableBlocks.includes(currentBlock)) {
                    result.push(currentBlock)

                    currentPos += length

                    matchFound = true

                    break
                }
            }

            if (!matchFound) {
                let invalidBlock = ""

                for (let i = currentPos; i < trimmedString.length; i++) {
                    invalidBlock += trimmedString[i]
                    if (availableBlocks.some((block) => block.startsWith(invalidBlock))) {
                        break
                    }
                }

                invalidBlocks.push(invalidBlock)

                isValid = false

                break
            }
        }

        return {
            isValid,
            result,
            errorMessage: isValid
                ? null
                : `Please add valid input block${invalidBlocks.length > 1 ? "s" : ""}, Invalid block${invalidBlocks.length > 1 ? "s" : ""} : ${invalidBlocks.join(", ")}`
        }
    }

    const handleChange = useCallback(
        (textAreaSequenceString) => {
            setValue("textAreaSequenceString", textAreaSequenceString)
            debouncedHandleChange(textAreaSequenceString)
        },
        [setValue, availableBlocks]
    )

    // TODO while typing remove existing method assingment
    const formateSetSequence = (entredSequence) => {
        const sequence = entredSequence.map((el) => ({ block: el, method: null }))

        setValue("sequence", sequence)
    }

    const formateSequenceString = (string) => {
        const { isValid, result, errorMessage } = validateAndFormatSequence(string)

        if (isValid) {
            setValue("formattedSequence", result)

            formateSetSequence(result)

            clearErrors("textAreaSequenceString")
        } else {
            setError("textAreaSequenceString", { message: errorMessage })
        }
    }

    const debouncedHandleChange = useCallback(debounce(formateSequenceString, 500), [formateSequenceString])

    useEffect(() => {
        return () => {
            debouncedHandleChange.cancel()
        }
    }, [debouncedHandleChange])

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                    <span className="font-medium">Sequence</span>

                    <InfoIcon size={20} className="cursor-pointer" onClick={() => setShowBlockModel(true)} />
                </div>

                <Scaling className="cursor-pointer" onClick={handleScale} />
            </div>

            <Controller
                control={control}
                name="textAreaSequenceString"
                rules={{
                    required: "Sequence can't be empty, enter sequence"
                }}
                render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                        <textarea
                            {...field}
                            onChange={(e) => handleChange(e.target.value)}
                            value={field.value ?? ""}
                            placeholder="Enter sequence here"
                            className={`shadow scrollbar-style mt-3 appearance-none border rounded-lg w-full py-2 px-3 text-neutral-700 focus:outline-none focus:shadow-outline ${
                                error ? "border-red-500 placeholder:text-red-500" : "border-neutral-400"
                            } ${isExpanded ?'h-[100vh]':'h-[120px]' }`}
                        />
                        {error && <p className="text-red-500 text-sm mt-1 w-[calc(100%-20px)] truncate">{error.message}</p>}
                    </div>
                )}
            />

            {showBlockModel && <BlockDetailsModel onClose={() => setShowBlockModel(false)} availableBlocks={availableBlocks} />}
        </>
    )
}
