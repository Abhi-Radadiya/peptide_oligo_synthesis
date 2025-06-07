import { useEffect } from "react"
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown"
import InputField from "../../../../../Components/Input/Input"
import { Pencil, Trash2 } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"
import { WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection"

const PrimingItem = ({ item, index, remove, handleEditPrimingProcedure, synthesisProcedureList, primingMenuItem }) => {
    const { control, watch, setValue } = useFormContext()
    const ameditePosition = useSelector((state) => state.bottleMapping.amedite)
    const amediteList = useSelector((state) => state.amedite.amediteList)

    const prefix = `primings.${index}`
    const amediteDetail = watch(`${prefix}.amediteDetail`) || {}

    const handleSelectPrimingPosition = (position) => {
        const selectedAmedite = ameditePosition?.[position?.value - 1]
        const amediteDetail = amediteList?.find((el) => el?.id === selectedAmedite?.value)
        setValue(`${prefix}.primingFlowRate`, amediteDetail?.flowRate)
        setValue(`${prefix}.amediteDetail`, amediteDetail || {})
    }

    useEffect(() => {
        const position = watch(`${prefix}.primingPosition`)
        if (position) handleSelectPrimingPosition(position)
    }, [watch(`${prefix}.primingPosition`)])

    return (
        <div key={item.id} className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
            <div className="max-w-[650px] w-full">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="font-semibold">Priming #{index + 1}</div>
                    <button onClick={() => remove(index)} className="text-red-600 hover:underline flex items-center gap-1">
                        <Trash2 size={16} /> Remove
                    </button>
                </div>

                <div className="flex flex-row items-start gap-6 justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <span className="font-bold text-neutral-600">Position</span>
                        <SelectionController
                            rules={{ required: "Please select priming column" }}
                            width={220}
                            menuItem={primingMenuItem}
                            control={control}
                            name={`${prefix}.primingPosition`}
                            placeholder="Select position"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <span className="font-bold text-neutral-600">Flow Rate</span>
                        <InputField
                            rightFixItem="ml/min"
                            name={`${prefix}.primingFlowRate`}
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px]"
                            control={control}
                            type="number"
                            placeholder="Enter flow rate"
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center my-4">
                    <div className="flex flex-row items-center gap-2">
                        <span className="font-bold text-neutral-600">Volume</span>
                        <InputField
                            rightFixItem="ml"
                            name={`${prefix}.primingVolume`}
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px]"
                            control={control}
                            type="number"
                            placeholder="Enter volume"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <span className="font-bold text-neutral-600">Loop</span>
                        <InputField
                            name={`${prefix}.primingXFactor`}
                            width="w-[220px]"
                            wrapperClassName="max-w-[220px]"
                            control={control}
                            type="number"
                            placeholder="Enter X factor"
                        />
                    </div>
                </div>

                <div className="flex flex-row items-center gap-2 pb-4 border-b mb-4 border-neutral-300">
                    <span className="font-bold text-neutral-600">Procedure</span>
                    <SelectionController
                        rules={{ required: "Please select procedure" }}
                        width={220}
                        menuItem={synthesisProcedureList}
                        control={control}
                        name={`${prefix}.primingProcedure`}
                        placeholder="Select procedure"
                    />
                    {!!watch(`${prefix}.primingProcedure`) && (
                        <div
                            className="border border-gray-700 rounded-lg p-1.5 cursor-pointer hover:bg-gray-200 bg-gray-100"
                            onClick={() => handleEditPrimingProcedure(`${prefix}.primingProcedure`)}
                        >
                            <Pencil size={18} />
                        </div>
                    )}
                </div>

                <div className="">
                    <div className="font-medium text-lg w-fit">Priming details</div>
                    <p className="italic text-neutral-700 pb-2">Details of priming amedite at selected position</p>

                    <div>
                        <span className="font-medium">Amedite name: </span>
                        {amediteDetail?.full_name || "No data"}
                    </div>
                    <div>
                        <span className="font-medium">Flow rate: </span>
                        {amediteDetail?.flowRate || "No data"}
                    </div>
                    <div>
                        <span className="font-medium">Concentration: </span>
                        {amediteDetail?.concentration || "No data"}
                    </div>
                    <div>
                        <span className="font-medium">MW: </span>
                        {amediteDetail?.mw || "No data"}
                    </div>
                </div>
            </div>

            <WasteColumnSelection name={`${prefix}.primingWaste`} control={control} />
        </div>
    )
}

export default PrimingItem
