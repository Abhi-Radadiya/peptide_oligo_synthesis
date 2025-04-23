import React from "react"
import ModelWrapper from "../../../../Components/Model/ModelWrapper"
import { UseSynthesisStateProvider } from "../../context/synthesis-state-provider"
import { useForm } from "react-hook-form"
import { SelectionController } from "../../../../Components/Dropdown/Dropdown"
import { ModelButton } from "../../../../Components/Buttons/Buttons"

export default function SequenceSelection(props) {
    const { onClose } = props

    const { setSelectedSynthesisCommand, selectedSynthesisCommand, commandProcedureMenuItem } = UseSynthesisStateProvider()

    console.log(`commandProcedureMenuItem : `, commandProcedureMenuItem)

    const handleRun = () => {}

    const { control } = useForm()

    return (
        <ModelWrapper width="w-[600px]" onClose={onClose} header="Sequence Selection" desc="Select sequence from below which want to execute">
            <SelectionController name="command" control={control} menuItem={commandProcedureMenuItem} placeholder="Select sequence" />

            <ModelButton onCancel={onClose} handleSave={handleRun} type="submit" label="Run" />
        </ModelWrapper>
    )
}
