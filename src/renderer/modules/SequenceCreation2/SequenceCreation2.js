import { useEffect, useState } from "react"
import SequenceEditing from "./Tabs/SequenceEditing/SequenceEditing.js"
import MethodAssign from "./Tabs/MethodAssign/MethodAssign.js"
import { FormProvider, useForm } from "react-hook-form"
import Header from "./Component/Header/Header.js"
import SequenceMethodTable from "./Component/sequence-method-table"
import { useSelector } from "react-redux"
import { useWindowSize } from "@uidotdev/usehooks"
import { motion } from "framer-motion"

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

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <>
            <div className="p-6 overflow-auto scrollbar-style" style={{ height: windowHeight - 60 }}>
                <FormProvider {...method}>
                    <Header />
                    {!isExpanded && (
                        <motion.div layoutId="method-panel">
                            <div className="flex flex-row w-full relative mb-6">
                                <SequenceEditing handleScale={() => setIsExpanded((prevState) => !prevState)} isExpanded={isExpanded}/>
                                <MethodAssign isExpanded={isExpanded} />
                            </div>
                        </motion.div>
                    )}

                    {isExpanded && (
                        <motion.div layoutId="method-panel" className="bg-white z-[31] border border-neutral-500 rounded-lg p-2 m-auto fixed inset-0">
                            <div className="flex flex-row w-full relative mb-6">
                                <SequenceEditing handleScale={() => setIsExpanded((prevState) => !prevState)} isExpanded={isExpanded}/>
                                <MethodAssign isExpanded={isExpanded} />
                            </div>
                        </motion.div>
                    )}
                    {/* <SequenceEditing />
                        <MethodAssign /> */}
                    <SequenceMethodTable />
                </FormProvider>
            </div>
        </>
    )
}
