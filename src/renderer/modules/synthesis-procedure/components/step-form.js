// // import React from "react"

// // export default function StepForm() {
// //     return <></>
// // }

// import React, { useState } from "react"
// import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form"
// import { procedureTypes, valveSubTypes, valveMenuItems, sensorList, pumpBasisOptions } from "./data/procedure-options.js" // Adjust path as needed
// import StyledDropdown from "./styled-dropdown.js" // Adjust path
// import StyledRadioGroup from "./styled-radio-group.js" // Adjust path
// import StyledInput from "./styled-input.js" // Adjust path
// import StyledToggle from "./styled-toggle.js" // Adjust path
// import { PlusIcon, Trash2Icon } from "lucide-react"

// // Helper function to get default values for a new item type
// const getDefaultValuesForType = (type) => {
//     switch (type) {
//         case "valve":
//             return { type: "valve", valveSubType: null, valveMenuItem: null }
//         case "pump":
//             return { type: "pump", rpm: "", basis: "time", time: "", discharge: "" } // Default to time basis
//         case "sensor":
//             return { type: "sensor", sensorId: null, threshold: "" }
//         default:
//             return { type: null } // Should not happen if selectedType is valid
//     }
// }

// export default function ProcedureForm() {
//     const [selectedTypeToAdd, setSelectedTypeToAdd] = useState(procedureTypes[0]?.id || "") // Default to first type or empty

//     const {
//         control,
//         handleSubmit,
//         watch, // We'll use the hook version for dynamic rendering within array items
//         formState: { errors, isSubmitting },
//         reset
//     } = useForm({
//         defaultValues: {
//             procedures: [] // Our field array
//         }
//         // resolver: zodResolver(yourSchema) // Optional: Add validation schema (e.g., Zod)
//     })

//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: "procedures"
//     })

//     const handleAddProcedure = () => {
//         if (selectedTypeToAdd) {
//             append(getDefaultValuesForType(selectedTypeToAdd))
//         }
//     }

//     const onSubmit = (data) => {
//         console.log("Form Data:", JSON.stringify(data, null, 2))
//         // Simulate API call
//         return new Promise((resolve) =>
//             setTimeout(() => {
//                 alert("Form Submitted! Check console for data.")
//                 // reset(); // Optionally reset the form after submission
//                 resolve()
//             }, 1500)
//         )
//     }

//     // Component to render specific fields based on type
//     const ProcedureFields = ({ type, control, index, remove }) => {
//         // Use useWatch for dynamic fields *within* an item
//         const watchedValveSubType = useWatch({
//             control,
//             name: `procedures.${index}.valveSubType`
//         })
//         const watchedPumpBasis = useWatch({
//             control,
//             name: `procedures.${index}.basis`
//         })

//         const itemErrors = errors.procedures?.[index] || {}

//         return (
//             <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6 relative group">
//                 {/* Remove Button - Positioned top-right */}
//                 <button
//                     type="button"
//                     onClick={() => remove(index)}
//                     className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                     aria-label="Remove Procedure"
//                 >
//                     <Trash2Icon className="h-5 w-5" />
//                 </button>

//                 <h3 className="text-lg font-semibold mb-4 text-indigo-700 capitalize border-b pb-2 border-indigo-100">
//                     {type} Configuration #{index + 1}
//                 </h3>

//                 <div className="space-y-5 mt-4">
//                     {/* === VALVE FIELDS === */}
//                     {type === "valve" && (
//                         <>
//                             <Controller
//                                 name={`procedures.${index}.valveSubType`}
//                                 control={control}
//                                 rules={{ required: "Valve type selection is required" }}
//                                 render={({ field }) => (
//                                     <StyledRadioGroup label="Valve Type" options={valveSubTypes} value={field.value} onChange={field.onChange} error={itemErrors.valveSubType} />
//                                 )}
//                             />

//                             {/* Dependent Dropdown for Valve Menu Item */}
//                             {watchedValveSubType && valveMenuItems[watchedValveSubType] && (
//                                 <Controller
//                                     name={`procedures.${index}.valveMenuItem`}
//                                     control={control}
//                                     rules={{ required: "Menu item selection is required" }}
//                                     render={({ field }) => (
//                                         <StyledDropdown
//                                             label={`${valveSubTypes.find((v) => v.id === watchedValveSubType)?.name} Menu Item`}
//                                             options={valveMenuItems[watchedValveSubType] || []}
//                                             value={field.value}
//                                             onChange={field.onChange}
//                                             placeholder={`Select a ${watchedValveSubType} item`}
//                                             error={itemErrors.valveMenuItem}
//                                         />
//                                     )}
//                                 />
//                             )}
//                         </>
//                     )}

//                     {/* === PUMP FIELDS === */}
//                     {type === "pump" && (
//                         <>
//                             <Controller
//                                 name={`procedures.${index}.rpm`}
//                                 control={control}
//                                 rules={{
//                                     required: "RPM is required",
//                                     pattern: { value: /^[0-9]+$/, message: "RPM must be a number" }
//                                 }}
//                                 render={({ field }) => (
//                                     <StyledInput
//                                         label="RPM (Revolutions Per Minute)"
//                                         id={`pump-rpm-${index}`}
//                                         type="number"
//                                         placeholder="e.g., 1500"
//                                         {...field}
//                                         error={itemErrors.rpm}
//                                     />
//                                 )}
//                             />

//                             <Controller
//                                 name={`procedures.${index}.basis`}
//                                 control={control}
//                                 render={({ field }) => (
//                                     <StyledToggle
//                                         label="Control Basis"
//                                         enabled={field.value === "discharge"} // 'discharge' means true (switch is on)
//                                         onChange={(isChecked) => field.onChange(isChecked ? "discharge" : "time")}
//                                         optionLabels={{ true: pumpBasisOptions.discharge, false: pumpBasisOptions.time }}
//                                     />
//                                 )}
//                             />

//                             {/* Conditional Input: Time */}
//                             {watchedPumpBasis === "time" && (
//                                 <Controller
//                                     name={`procedures.${index}.time`}
//                                     control={control}
//                                     rules={{ required: "Time is required when basis is Time", pattern: { value: /^[0-9]+$/, message: "Time must be a number" } }}
//                                     render={({ field }) => (
//                                         <StyledInput label="Time (seconds)" id={`pump-time-${index}`} type="number" placeholder="e.g., 60" {...field} error={itemErrors.time} />
//                                     )}
//                                 />
//                             )}

//                             {/* Conditional Input: Discharge Volume */}
//                             {watchedPumpBasis === "discharge" && (
//                                 <Controller
//                                     name={`procedures.${index}.discharge`}
//                                     control={control}
//                                     rules={{
//                                         required: "Volume is required when basis is Discharge",
//                                         pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Volume must be a number" }
//                                     }}
//                                     render={({ field }) => (
//                                         <StyledInput
//                                             label="Discharge Volume (mL)"
//                                             id={`pump-discharge-${index}`}
//                                             type="number"
//                                             step="0.1" // Allow decimals
//                                             placeholder="e.g., 50.5"
//                                             {...field}
//                                             error={itemErrors.discharge}
//                                         />
//                                     )}
//                                 />
//                             )}
//                         </>
//                     )}

//                     {/* === SENSOR FIELDS === */}
//                     {type === "sensor" && (
//                         <>
//                             <Controller
//                                 name={`procedures.${index}.sensorId`}
//                                 control={control}
//                                 rules={{ required: "Sensor selection is required" }}
//                                 render={({ field }) => (
//                                     <StyledDropdown
//                                         label="Sensor Type"
//                                         options={sensorList}
//                                         value={field.value}
//                                         onChange={field.onChange}
//                                         placeholder="Select Sensor"
//                                         error={itemErrors.sensorId}
//                                     />
//                                 )}
//                             />
//                             <Controller
//                                 name={`procedures.${index}.threshold`}
//                                 control={control}
//                                 rules={{ required: "Threshold value is required", pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Threshold must be a number" } }}
//                                 render={({ field }) => (
//                                     <StyledInput
//                                         label="Threshold Value"
//                                         id={`sensor-threshold-${index}`}
//                                         type="number"
//                                         step="any" // Allow any number (int/float)
//                                         placeholder="e.g., 25.5"
//                                         {...field}
//                                         error={itemErrors.threshold}
//                                     />
//                                 )}
//                             />
//                         </>
//                     )}
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4 sm:p-8">
//             <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
//                 <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
//                     <h1 className="text-2xl font-bold text-white tracking-tight">Advanced Procedure Configuration</h1>
//                     <p className="text-indigo-100 mt-1">Define and manage your process steps with precision.</p>
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
//                     {/* --- Section for Adding New Procedures --- */}
//                     <div className="bg-gray-50 p-5 rounded-lg border border-dashed border-gray-300">
//                         <h2 className="text-lg font-medium text-gray-800 mb-4">Add New Procedure Step</h2>
//                         <div className="flex flex-col sm:flex-row sm:items-end gap-4">
//                             <div className="flex-grow">
//                                 <StyledDropdown
//                                     label="Select Procedure Type to Add"
//                                     options={procedureTypes}
//                                     value={selectedTypeToAdd}
//                                     onChange={setSelectedTypeToAdd}
//                                     placeholder="Choose type..."
//                                 />
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={handleAddProcedure}
//                                 disabled={!selectedTypeToAdd}
//                                 className="inline-flex items-center justify-center gap-x-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
//                                 Add Step
//                             </button>
//                         </div>
//                     </div>

//                     {/* --- Dynamically Added Procedure Sections --- */}
//                     <div className="space-y-6">
//                         {fields.length === 0 && (
//                             <div className="text-center py-10 px-6 bg-gray-50 rounded-lg border border-gray-200">
//                                 <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
//                                     />
//                                 </svg>
//                                 <h3 className="mt-2 text-sm font-semibold text-gray-900">No procedures added yet</h3>
//                                 <p className="mt-1 text-sm text-gray-500">Select a type above and click "Add Step" to begin.</p>
//                             </div>
//                         )}

//                         {fields.map((field, index) => (
//                             <ProcedureFields
//                                 key={field.id} // RHF requires key={field.id}
//                                 type={field.type} // Access the type stored in the field data
//                                 control={control}
//                                 index={index}
//                                 remove={remove}
//                             />
//                         ))}
//                     </div>

//                     {/* --- Form Submission Area --- */}
//                     {fields.length > 0 && (
//                         <div className="pt-8 border-t border-gray-200 flex justify-end">
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="inline-flex justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-60 disabled:cursor-wait"
//                             >
//                                 {isSubmitting ? "Submitting..." : "Submit Configuration"}
//                             </button>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     )
// }

import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { procedureTypes } from "./data/procedure-options" // Adjust path
import StyledDropdown from "./styled-dropdown.js" // Adjust path
import ProcedureStepCard from "./ProcedureStepCard.js" // We'll create this next
import { PlusIcon } from "lucide-react"

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

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            steps: [] // Renamed from 'procedures' for clarity
        }
        // resolver: zodResolver(yourSchema) // Optional: Add validation schema
    })

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

    const onSubmit = (data) => {
        console.log("Form Data:", JSON.stringify(data, null, 2))
        // Simulate API call
        return new Promise((resolve) =>
            setTimeout(() => {
                alert("Form Submitted! Check console for data.")
                // reset({ steps: [] }); // Reset the form completely
                resolve()
            }, 1500)
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Advanced Procedure Configuration V2</h1>
                    <p className="text-indigo-100 mt-1">Define multi-action steps for your process flow.</p>
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
                        {" "}
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
    )
}
