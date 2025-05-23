import React, { useEffect } from "react"
import SequenceEditing from "./Tabs/SequenceEditing/SequenceEditing.js"
import MethodAssign from "./Tabs/MethodAssign/MethodAssign.js"
import { FormProvider, useForm } from "react-hook-form"
import Header from "./Component/Header/Header.js"
import SequenceMethodTable from "./Component/sequence-method-table"
import { useSelector } from "react-redux"
import { useWindowSize } from "@uidotdev/usehooks"

export default function SequenceCreation2(props) {
    const { id } = props

    const method = useForm()

    const { setValue } = method

    const sequence = useSelector((state) => state.sequence.sequence)

    const getSequenceString = (block) => {
        return block?.map((el) => el.block).join(" ")
    }

    useEffect(() => {
        if (!id) return

        setValue("editingId", id)

        const selectedSequence = sequence.find((el) => el.id === id)

        if (!selectedSequence) return

        setValue("textAreaSequenceString", getSequenceString(selectedSequence.block))

        setValue("sequenceName", selectedSequence.name)

        setValue("sequence", selectedSequence.block)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const { height: windowHeight } = useWindowSize()

    return (
        <>
            <div className="p-6 overflow-auto scrollbar-style" style={{ height: windowHeight - 60 }}>
                <FormProvider {...method}>
                    <Header />
                    <div className="flex flex-row w-full relative mb-6">
                        <SequenceEditing />
                        <MethodAssign />
                    </div>
                    <SequenceMethodTable />
                </FormProvider>
            </div>
        </>
    )
}
