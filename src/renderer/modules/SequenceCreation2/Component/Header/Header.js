import React, { useContext, useState } from "react"
import { Button } from "../../../../Components/Buttons/Buttons"
import { useFormContext } from "react-hook-form"
import { getUniqueId } from "../../../../Helpers/Constant"
import InputField from "../../../../Components/Input/Input"
import { useDispatch } from "react-redux"
import { addSequence, editSequence } from "../../../../../redux/reducers/sequenceReducer"
import { openToast } from "../../../../../redux/reducers/toastStateReducer/toastStateReducer"
import { SUCCESS } from "../../../../Helpers/Icons"
import { isEmpty } from "lodash"
import MethodAssignWarningModel from "../../Model/MethodAssignWarningModel"
import { TabContext } from "../../../../Components/Navigation/TabNavigation"

export default function Header() {
    const {
        watch,
        control,
        handleSubmit,
        reset,
        formState: { errors },
        setError
    } = useFormContext()

    const dispatch = useDispatch()

    const [displayEmptyBlockError, setDisplayEmptyBlockError] = useState(false)

    const { tabs, activeTabId, closeTab, setActiveTabId } = useContext(TabContext)

    const formatBlock = () => {
        // TODO add amedite id while saving not just block name
        return watch("sequence")?.map((el) => {
            return {
                block: el.block,
                method: { value: el?.method?.value },
                methodData: el.methodData
            }
        })
    }

    const saveSequence = () => {
        const payload = {
            id: getUniqueId(),
            name: watch("sequenceName"),
            block: formatBlock(),
            sequenceString: watch("textAreaSequenceString")
        }

        try {
            !!watch("editingId") ? dispatch(editSequence({ ...payload, id: watch("editingId") })) : dispatch(addSequence(payload))

            dispatch(openToast({ text: "Sequence saved successfully.", icon: SUCCESS }))

            const availableSequenceTabId = tabs.find((el) => el?.path?.includes("available-sequence"))?.id

            setActiveTabId(availableSequenceTabId)

            closeTab(activeTabId)

            reset()
        } catch (error) {
            setError("sequenceName", { message: error.message })

            dispatch(openToast({ text: error.message, icon: SUCCESS }))

            return
        }
    }

    const handleSave = () => {
        const isAllSequenceMethodAssigned = watch("sequence")?.every((el) => !!el.method)

        if (!isAllSequenceMethodAssigned) {
            setDisplayEmptyBlockError(true)
            return
        }

        saveSequence()
    }

    return (
        <>
            <div className="flex flex-row w-full items-end pb-4 border-b border-neutral-300 mb-4 justify-between">
                <InputField label="Sequence name" control={control} name="sequenceName" rules={{ required: "Please enter sequence name" }} placeholder="Enter sequence name" />

                <Button label="Save" bgClassName="bg-green-300" onClick={handleSubmit(handleSave)} disabled={!isEmpty(errors)} />
            </div>

            {displayEmptyBlockError && (
                <MethodAssignWarningModel
                    onClose={() => setDisplayEmptyBlockError(false)}
                    handleSave={() => {
                        saveSequence()
                        setDisplayEmptyBlockError(false)
                    }}
                />
            )}
        </>
    )
}
