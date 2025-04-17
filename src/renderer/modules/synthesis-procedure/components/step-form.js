import React, { useState } from "react"
import { useForm, useFieldArray, FormProvider } from "react-hook-form"
import { procedureTypes } from "./data/procedure-options" // Adjust path
import StyledDropdown from "./styled-dropdown.js" // Adjust path
import ProcedureStepCard from "./ProcedureStepCard.js" // We'll create this next
import { PlusIcon } from "lucide-react"
import ToggleProcedureDeliveryType from "./toggle-procedure-delivery-type.js"
import { useDispatch } from "react-redux"
import { addSynthesisProcedure } from "../../../../redux/reducers/synthesis-procedure/index.js"

// Default structure for a new *step*
const getDefaultValuesForStepType = (type) => {
    return {
        type: type,
        afterDelay: 0, // Default delay for the whole step
        procedure: [] // Start with empty actions/procedures within the step
    }
}

export default function ProcedureForm() {
    const [selectedTypeToAdd, setSelectedTypeToAdd] = useState(procedureTypes[0]?.id || "")

    const method = useForm({
        defaultValues: {
            steps: [],
            inputType: "time"
        }
    })

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = method

    // This is the OUTER field array for managing Steps
    const {
        fields: stepFields,
        append: appendStep,
        remove: removeStep
    } = useFieldArray({
        control,
        name: "steps"
    })

    const handleAddStep = () => {
        if (selectedTypeToAdd) {
            appendStep(getDefaultValuesForStepType(selectedTypeToAdd))
        }
    }

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        console.log(`data.steps : `, data.steps)

        dispatch(addSynthesisProcedure(data))
    }

    return (
        <FormProvider {...method}>
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4 sm:p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
                        <div className="flex flex-row items-start justify-between">
                            <div className="">
                                <h1 className="text-2xl font-bold text-white tracking-tight">Procedure Configuration</h1>
                                <p className="text-indigo-100 mt-1">Define multi-action steps for your process flow.</p>
                            </div>
                            <div className="">
                                <ToggleProcedureDeliveryType />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
                        {/* --- Section for Adding New Steps --- */}
                        <div className="bg-gray-50 p-5 rounded-lg border border-dashed border-gray-300">
                            <h2 className="text-lg font-medium text-gray-800 mb-4">Add New Process Step</h2>
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                                <div className="flex-grow">
                                    {/* Dropdown to select the TYPE of the main step */}
                                    <StyledDropdown
                                        label="Select Step Type to Add"
                                        options={procedureTypes}
                                        value={selectedTypeToAdd}
                                        onChange={setSelectedTypeToAdd}
                                        placeholder="Choose step type..."
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddStep}
                                    disabled={!selectedTypeToAdd}
                                    className="inline-flex items-center justify-center gap-x-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                    Add Step
                                </button>
                            </div>
                        </div>

                        {/* --- Dynamically Added Procedure Step Cards --- */}
                        <div className="space-y-8">
                            {/* Increased spacing between cards */}
                            {stepFields.length === 0 && (
                                <div className="text-center py-10 px-6 bg-gray-50 rounded-lg border border-gray-200">
                                    {/* Empty state SVG and text */}
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No process steps added yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">Select a type above and click "Add Step" to begin configuring.</p>
                                </div>
                            )}
                            {/* Render a card for each step in the outer array */}
                            {stepFields.map((stepField, index) => (
                                <ProcedureStepCard
                                    key={stepField.id} // RHF requires key={stepField.id}
                                    control={control} // Pass control down
                                    stepIndex={index} // Index of this step in the outer array
                                    stepData={stepField} // Pass the data for this step (includes type)
                                    removeStep={removeStep} // Function to remove this entire step
                                    errors={errors} // Pass down form errors
                                />
                            ))}
                        </div>

                        {/* --- Form Submission Area --- */}
                        {stepFields.length > 0 && (
                            <div className="pt-8 border-t border-gray-200 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-60 disabled:cursor-wait"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Full Configuration"}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </FormProvider>
    )
}
