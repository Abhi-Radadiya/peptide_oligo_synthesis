import React from "react"
import { useFieldArray, Controller, useFormContext, useWatch } from "react-hook-form"
import { containerList, procedureTypes, pumpBasisOptions, pumpList, sensorList, valveList, valveSections } from "./data/procedure-options"
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon } from "lucide-react"
import StyledDropdown from "./styled-dropdown"
import StyledInput from "./styled-input"
import StyledToggle from "./styled-toggle"

// Default structure for a new *action* within a step's 'procedure' array
const getDefaultActionValues = (stepType) => {
    switch (stepType) {
        case "valve":
            // Default the first valve section, null for dropdowns, 0 for time
            return { valveSection: valveSections[0]?.id || "", container: null, valve: null, afterCloseTime: 0 }
        case "pump":
            // Default running parameter to time, null/empty for others
            return { pump: null, rpm: "", runningParameter: "time", time: "", dischargeableVolume: "" }
        case "liquidSensor":
            return { sensor: null, threshold: "" }
        default:
            return {} // Should not happen
    }
}

// Component to render the fields for a single action/procedure item
function ActionFields({ stepType, control, stepIndex, actionIndex, removeAction, errors }) {
    const actionErrors = errors?.steps?.[stepIndex]?.procedure?.[actionIndex] || {}

    // Watch pump basis for conditional rendering *within this action*
    const watchedPumpBasis = useWatch({
        control,
        name: `steps.${stepIndex}.procedure.${actionIndex}.runningParameter`
    })

    const { setValue, watch } = useFormContext()

    return (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 relative space-y-4 mb-4">
            {/* Remove Action Button */}
            <button
                type="button"
                onClick={() => removeAction(actionIndex)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-400"
                aria-label="Remove Action"
            >
                <TrashIcon className="h-4 w-4" />
            </button>

            <h4 className="text-sm font-medium text-gray-600 border-b border-gray-200 pb-1 mb-3">
                {stepType === "valve" && `Valve Action #${actionIndex + 1}`}
                {stepType === "pump" && `Pump Action #${actionIndex + 1}`}
                {stepType === "liquidSensor" && `Sensor Check #${actionIndex + 1}`}
            </h4>

            {/* === VALVE ACTION FIELDS === */}
            {stepType === "valve" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                    <Controller
                        name={`steps.${stepIndex}.procedure.${actionIndex}.valveSection`}
                        control={control}
                        rules={{ required: "Section is required" }}
                        render={({ field }) => (
                            <StyledDropdown label="Valve Section" options={valveSections} {...field} placeholder="Select Section" error={actionErrors.valveSection} />
                        )}
                    />
                    <Controller
                        name={`steps.${stepIndex}.procedure.${actionIndex}.container`}
                        control={control}
                        // Add rules if container is required for certain sections
                        render={({ field }) => (
                            <StyledDropdown label="Container" options={containerList} {...field} placeholder="Select Container" error={actionErrors.container} />
                        )}
                    />
                    <Controller
                        name={`steps.${stepIndex}.procedure.${actionIndex}.valve`}
                        control={control}
                        rules={{ required: "Valve selection is required" }}
                        render={({ field }) => <StyledDropdown label="Valve" options={valveList} {...field} placeholder="Select Valve" error={actionErrors.valve} />}
                    />
                    {watch("inputType") === "time" && (
                        <Controller
                            name={`steps.${stepIndex}.procedure.${actionIndex}.time`}
                            control={control}
                            rules={{
                                required: "Time is required",
                                pattern: { value: /^[0-9]+$/, message: "Time must be a number" },
                                min: { value: 0, message: "Cannot be negative" }
                            }}
                            render={({ field }) => (
                                <StyledInput
                                    label="Time (ms)"
                                    id={`pump-time-${stepIndex}-${actionIndex}`}
                                    type="number"
                                    placeholder="e.g., 5000"
                                    {...field}
                                    error={actionErrors.time}
                                />
                            )}
                        />
                    )}
                    {watch("inputType") === "volume" && (
                        <Controller
                            name={`steps.${stepIndex}.procedure.${actionIndex}.dischargeableVolume`}
                            control={control}
                            rules={{
                                required: "Volume is required",
                                pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Volume must be a number" },
                                min: { value: 0, message: "Cannot be negative" }
                            }}
                            render={({ field }) => (
                                <StyledInput
                                    label="Volume (mL)"
                                    id={`pump-volume-${stepIndex}-${actionIndex}`}
                                    type="number"
                                    step="0.1"
                                    placeholder="e.g., 100.5"
                                    {...field}
                                    error={actionErrors.dischargeableVolume}
                                />
                            )}
                        />
                    )}

                    {/* <Controller
                        name={`steps.${stepIndex}.procedure.${actionIndex}.afterCloseTime`}
                        control={control}
                        rules={{ required: "Close time is required", min: { value: 0, message: "Cannot be negative" } }}
                        render={({ field }) => (
                            <StyledInput
                                label="Close After (ms)"
                                id={`valve-close-time-${stepIndex}-${actionIndex}`}
                                type="number"
                                placeholder="e.g., 1000"
                                {...field}
                                error={actionErrors.afterCloseTime}
                            />
                        )}
                    /> */}
                </div>
            )}

            {/* === PUMP ACTION FIELDS === */}
            {stepType === "pump" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                    <Controller
                        name={`steps.${stepIndex}.procedure.${actionIndex}.pump`}
                        control={control}
                        rules={{ required: "Pump selection is required" }}
                        render={({ field }) => <StyledDropdown label="Pump" options={pumpList} {...field} placeholder="Select Pump" error={actionErrors.pump} />}
                    />
                    <Controller
                        name={`steps.${stepIndex}.procedure.${actionIndex}.rpm`}
                        control={control}
                        rules={{ required: "RPM is required", pattern: { value: /^[0-9]+$/, message: "RPM must be a number" } }}
                        render={({ field }) => (
                            <StyledInput label="RPM" id={`pump-rpm-${stepIndex}-${actionIndex}`} type="number" placeholder="e.g., 1500" {...field} error={actionErrors.rpm} />
                        )}
                    />
                    {/* Toggle and Conditional Inputs */}
                    <div className="space-y-3 lg:col-span-1">
                        {" "}
                        {/* Group toggle and its inputs */}
                        {/* <Controller
                            name={`steps.${stepIndex}.procedure.${actionIndex}.runningParameter`}
                            control={control}
                            render={({ field }) => (
                                <StyledToggle
                                    label="Control Basis"
                                    enabled={field.value === "liquidVolume"} // 'liquidVolume' means true (switch is on)
                                    onChange={(isChecked) => field.onChange(isChecked ? "liquidVolume" : "time")}
                                    optionLabels={{ true: pumpBasisOptions.liquidVolume, false: pumpBasisOptions.time }}
                                />
                            )}
                        /> */}
                        {watch("inputType") === "time" && (
                            <Controller
                                name={`steps.${stepIndex}.procedure.${actionIndex}.time`}
                                control={control}
                                rules={{
                                    required: "Time is required",
                                    pattern: { value: /^[0-9]+$/, message: "Time must be a number" },
                                    min: { value: 0, message: "Cannot be negative" }
                                }}
                                render={({ field }) => (
                                    <StyledInput
                                        label="Time (ms)"
                                        id={`pump-time-${stepIndex}-${actionIndex}`}
                                        type="number"
                                        placeholder="e.g., 5000"
                                        {...field}
                                        error={actionErrors.time}
                                    />
                                )}
                            />
                        )}
                        {watch("inputType") === "volume" && (
                            <Controller
                                name={`steps.${stepIndex}.procedure.${actionIndex}.dischargeableVolume`}
                                control={control}
                                rules={{
                                    required: "Volume is required",
                                    pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Volume must be a number" },
                                    min: { value: 0, message: "Cannot be negative" }
                                }}
                                render={({ field }) => (
                                    <StyledInput
                                        label="Volume (mL)"
                                        id={`pump-volume-${stepIndex}-${actionIndex}`}
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 100.5"
                                        {...field}
                                        error={actionErrors.dischargeableVolume}
                                    />
                                )}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* === SENSOR CHECK FIELDS === */}
            {stepType === "liquidSensor" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <Controller
                        name={`steps.${stepIndex}.procedure.${actionIndex}.sensor`}
                        control={control}
                        rules={{ required: "Sensor selection is required" }}
                        render={({ field }) => <StyledDropdown label="Sensor" options={sensorList} {...field} placeholder="Select Sensor" error={actionErrors.sensor} />}
                    />
                    <Controller
                        name={`steps.${stepIndex}.procedure.${actionIndex}.threshold`}
                        control={control}
                        rules={{ required: "Threshold is required", pattern: { value: /^-?[0-9]+(\.[0-9]+)?$/, message: "Threshold must be a number" } }} // Allow negative thresholds?
                        render={({ field }) => (
                            <StyledInput
                                label="Threshold Value"
                                id={`sensor-threshold-${stepIndex}-${actionIndex}`}
                                type="number"
                                step="any"
                                placeholder="e.g., 50.0"
                                {...field}
                                error={actionErrors.threshold}
                            />
                        )}
                    />
                </div>
            )}
        </div>
    )
}

// Main Card component for a single Step
export default function ProcedureStepCard({ control, stepIndex, stepData, removeStep, errors }) {
    const stepType = stepData.type // Get the type ('valve', 'pump', 'liquidSensor')
    const [isCollapsed, setIsCollapsed] = React.useState(false) // State for collapsing

    // INNER field array for managing Actions/Procedures within this step
    const {
        fields: actionFields,
        append: appendAction,
        remove: removeAction
    } = useFieldArray({
        control,
        name: `steps.${stepIndex}.procedure` // Target the 'procedure' array of the current step
    })

    const handleAddAction = () => {
        appendAction(getDefaultActionValues(stepType)) // Append default values based on step type
    }

    const stepErrors = errors?.steps?.[stepIndex] || {}

    // Find the display name for the step type
    const stepTypeName = procedureTypes.find((p) => p.id === stepType)?.name || "Unknown Step"

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative transition-all duration-300 ease-in-out">
            {/* Header for the Step Card */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                <h3 className="text-xl font-semibold text-indigo-800">
                    Step #{stepIndex + 1}: {stepTypeName}
                </h3>
                <div className="flex items-center gap-2">
                    {/* Collapse/Expand Button */}
                    <button
                        type="button"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-gray-500 hover:text-indigo-600 p-1 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                        aria-label={isCollapsed ? "Expand Step" : "Collapse Step"}
                    >
                        {isCollapsed ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronUpIcon className="h-5 w-5" />}
                    </button>
                    {/* Remove Step Button */}
                    <button
                        type="button"
                        onClick={() => removeStep(stepIndex)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-400"
                        aria-label="Remove Step"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Collapsible Content */}
            {!isCollapsed && (
                <div className="space-y-5 mt-4">
                    {/* --- Actions/Procedures List --- */}
                    <div className="space-y-4">
                        {actionFields.length === 0 && <p className="text-sm text-gray-500 italic text-center py-3">No actions added to this step yet.</p>}
                        {actionFields.map((actionField, actionIndex) => (
                            <ActionFields
                                key={actionField.id}
                                stepType={stepType}
                                control={control}
                                stepIndex={stepIndex}
                                actionIndex={actionIndex}
                                removeAction={removeAction}
                                errors={errors} // Pass errors down
                            />
                        ))}
                    </div>

                    {/* --- Add Action Button --- */}
                    <div className="pt-4 border-t border-dashed border-gray-200">
                        <button
                            type="button"
                            onClick={handleAddAction}
                            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                        >
                            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                            {stepType === "valve" && "Add Valve Action"}
                            {stepType === "pump" && "Add Pump Action"}
                            {stepType === "liquidSensor" && "Add Sensor Check"}
                        </button>
                    </div>

                    {/* --- After Delay Input --- */}
                    <div className="pt-5 border-t border-gray-200">
                        <Controller
                            name={`steps.${stepIndex}.afterDelay`}
                            control={control}
                            defaultValue={0} // Ensure a default value
                            rules={{ min: { value: 0, message: "Delay cannot be negative" } }}
                            render={({ field }) => (
                                <StyledInput
                                    label={`Delay After This Step (ms)`}
                                    id={`step-after-delay-${stepIndex}`}
                                    type="number"
                                    placeholder="e.g., 2000"
                                    {...field}
                                    error={stepErrors.afterDelay} // Show errors for this specific field
                                />
                            )}
                        />
                        <p className="mt-1 text-xs text-gray-500">Time in milliseconds before the next step begins.</p>
                    </div>
                </div>
            )}
        </div>
    )
}
