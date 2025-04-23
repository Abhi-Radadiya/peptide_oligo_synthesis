import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useRef, useCallback, useMemo, useEffect } from "react"
import { z } from "zod"
import { Button } from "../../../Components/Buttons/Buttons"
import { editCommand } from "../../../../redux/reducers/commands/commands"
import { useDispatch } from "react-redux"
import { UseActiveFileDetails } from "../context/active-file-details-context"

const von = z.string().regex(/^VON-((\d+,)*\d+);$/, "Invalid VON command")
const vof = z.string().regex(/^VOF-((\d+,)*\d+);$/, "Invalid VOF command")
const hold = z.string().regex(/^HOLD-\d+;$/, "Invalid HOLD command")
const repet = z.string().regex(/^REPET-\d+\/\d+;$/, "Invalid REPET command")
const sf = z.string().regex(/^SF-\d+\/\d+(\.\d+)?\/\d+;$/, "Invalid SF command")
const se = z.string().regex(/^SE-\d+\/\d+(\.\d+)?\/\d+;$/, "Invalid SE command")
const mt = z.string().regex(/^MT-\d+\/\d+\/\d+;$/, "Invalid MT command")
const ml = z.string().regex(/^ML-\d+\/\d+\/\d+;$/, "Invalid ML command")

const commandSchema = z.union([von, vof, hold, repet, sf, se, mt, ml])

export const parseCommand = (command) => {
    return commandSchema.safeParse(command)
}

const commandFileSchema = z.object({
    commands: z.string().nonempty("File cannot be empty")
})

export default function CommandEditor() {
    const { fileDetails, setFileDetails } = UseActiveFileDetails()


    const {
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
        watch,
        clearErrors,
        reset
    } = useForm({
        resolver: zodResolver(commandFileSchema),
        defaultValues: {
            commands: fileDetails?.commands.join("\n") || ""
        }
    })

    const commandsValue = watch("commands")

    useEffect(() => {
        if (fileDetails) {
            reset({
                commands: fileDetails.commands.join("\n") || ""
            })
        }
    }, [fileDetails, reset])

    console.log(`commandsValue : `, commandsValue)

    const lineNumbersRef = useRef(null)
    const textareaRef = useRef(null)
    const dispatch = useDispatch()

    const lineCount = useMemo(() => {
        return commandsValue?.split("\n")?.length || 1
    }, [commandsValue])

    const handleScroll = useCallback((event) => {
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = event.target.scrollTop
        }
    }, [])

    const handleSaveCommand = (commandsData) => {
        dispatch(editCommand(commandsData))
    }

    const renderLineNumbers = () => {
        let numbers = ""
        for (let i = 1; i <= lineCount; i++) {
            numbers += `${i}\n`
        }
        return numbers.trimEnd()
    }

    const onSubmit = (data) => {
        const lines = data.commands.split("\n")
        const invalidLines = []

        lines.forEach((line, index) => {
            const content = line.trim()
            if (content.length > 0) {
                const result = parseCommand(content)
                if (!result.success) {
                    invalidLines.push({ index, error: result.error || "Invalid syntax" })
                }
            }
        })

        if (invalidLines.length > 0) {
            // TODO : Generate a more detailed error message listing invalid lines
            const message = `Please fix the following errors:\n${invalidLines.map(({ index, error }) => `  - Line ${index + 1}`).join("\n")}`

            setError("commands", { type: "manual", message })
            return
        }

        if (!fileDetails.name) {
            const message = `Please fix the following errors:\n - Enter file name.`
            setError("name", { type: "manual", message })
            return
        }

        handleSaveCommand({ id: fileDetails.id, commands: lines, name: fileDetails.name })
    }
    // --- End Form Submission Logic ---

    const editorStyles = "font-mono text-sm leading-relaxed p-2"
    const editorLineHeightStyle = { lineHeight: "1.625rem" }

    return (
        <>
            <input
                value={fileDetails.name}
                className={`text-xl font-bold px-4 py-2 border bg-transparent border-white mx-4 mt-4 hover:bg-neutral-100 focus:bg-neutral-100 hover:border-neutral-400 focus:border-neutral-400 rounded-lg hover:cursor-text w-fit ${
                    errors.name ? "border-red-300" : "border-white hover:border-neutral-400 focus:border-neutral-400"
                }`}
                onChange={(e) => {
                    clearErrors("name")
                    setFileDetails({ ...fileDetails, name: e.target.value })
                }}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 w-full">
                <div
                    className={`flex border rounded-md overflow-hidden ${
                        errors.commands
                            ? "border-red-500 focus-within:border-red-600"
                            : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                    }`}
                >
                    {/* TODO : Scrolls independently then text area */}
                    <div
                        ref={lineNumbersRef}
                        className={`${editorStyles} bg-gray-100 text-right text-gray-400 select-none pr-2 h-[75vh] overflow-auto no-scrollbar`} // Hide scrollbar
                        style={editorLineHeightStyle}
                        aria-hidden="true"
                    >
                        <pre className="m-0 p-0">{renderLineNumbers()}</pre>
                    </div>

                    <Controller
                        name="commands"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                ref={(e) => {
                                    field.ref(e)
                                    textareaRef.current = e
                                }}
                                rows={15}
                                onScroll={handleScroll}
                                className={`flex-1 ${editorStyles} focus:outline-none resize-none w-full border-l border-gray-300 h-[75vh] overflow-auto scrollbar-style`}
                                style={editorLineHeightStyle}
                                placeholder={`Write your commands here...\nExample:\nVON-1;\nHOLD-1000;\nOFF-1;`}
                                wrap="off"
                                spellCheck="false"
                            />
                        )}
                    />
                </div>
                {errors.commands && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                        <pre className="whitespace-pre-wrap font-medium">{errors.commands.message}</pre>
                    </div>
                )}
                {errors.name && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                        <pre className="whitespace-pre-wrap font-medium">{errors.name.message}</pre>
                    </div>
                )}

                <div className="flex justify-end items-center space-x-3">
                    <span className="text-xs text-gray-500">Lines: {lineCount}</span>
                    <Button type="submit" disabled={isSubmitting} label={isSubmitting ? "Saving..." : "Save"} />
                </div>
            </form>
        </>
    )
}
