import { useMemo } from "react"
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"

export default function ColumnSize() {
    const { control } = useFormContext()

    const columnEditor = useSelector((state) => state.columnEditor.positions)

    const columnEditorMenuItem = useMemo(() => {
        return columnEditor?.map((el) => ({
            label: el.name,
            value: { id: el.id, volume: el.liquidVolume, flowRate: el.maxFlowRate }
        }))
    }, [columnEditor])

    return (
        <>
            <div className="space-y-2">
                <label htmlFor="column-size">Column Size (ml)</label>

                <SelectionController
                    placeholder="Select Column Size"
                    height={41.6}
                    control={control}
                    name="columnSize"
                    menuItem={columnEditorMenuItem}
                    rules={{ required: "Please select column size" }}
                />
            </div>
        </>
    )
}
