import React, { useState } from "react"
import { Plus } from "lucide-react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { useSelector } from "react-redux"
import { selectSavedProcedures } from "../../../../../../redux/reducers/synthesis-procedure"
import MethodSectionFlowEditingModel from "../../../../../Components/flow-charts/models/method-section-flow-editing-model"
import PrimingItem from "./priming-item"

export default function MultiplePrimings() {
    const { control, setValue, watch } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "primings"
    })

    const synthesisProcedure = useSelector(selectSavedProcedures)
    const synthesisProcedureList = synthesisProcedure?.map((el) => ({
        label: el.name,
        value: el.id
    }))

    const primingMenuItem = [...Array(24)].map((_, index) => ({
        label: index < 9 ? `0${index + 1}` : index + 1,
        value: index + 1
    }))

    const [editingFlow, setEditingFlow] = useState({ id: "", name: "" })

    const handleEditPrimingProcedure = (fieldName) => {
        const value = watch(fieldName)
        if (value?.value) {
            setEditingFlow({ id: value.value, name: fieldName })
        }
    }

    const handleSaveSynthesisFlow = (procedure) => {
        setValue(editingFlow.name, { ...watch(editingFlow.name), procedure })
        setEditingFlow({ id: "", name: "" })
    }

    return (
        <>
            <div className="bg-transparent rounded-xl shadow-sm border border-gray-300 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-2xl text-gray-800">Priming Settings</h3>
                    <button
                        type="button"
                        onClick={() => append({})}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Plus size={18} /> Add Priming
                    </button>
                </div>

                <div className="space-y-5">
                    {fields.map((item, index) => (
                        <PrimingItem
                            key={item.id}
                            item={item}
                            index={index}
                            remove={remove}
                            handleEditPrimingProcedure={handleEditPrimingProcedure}
                            synthesisProcedureList={synthesisProcedureList}
                            primingMenuItem={primingMenuItem}
                        />
                    ))}
                </div>
            </div>

            {!!editingFlow.id && <MethodSectionFlowEditingModel onSave={handleSaveSynthesisFlow} onClose={() => setEditingFlow({ id: "", name: "" })} editingFlow={editingFlow} />}
        </>
    )
}
