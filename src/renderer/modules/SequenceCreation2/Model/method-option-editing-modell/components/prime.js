import { useFormContext } from "react-hook-form"
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown"
import InputField from "../../../../../Components/Input/Input"
import { isObject } from "lodash"
import { WasteColumnSelection } from "../../../../MethodSetup2/Components/AmediteSection/AmediteSection"
import { useSelector } from "react-redux"
import { useState } from "react"
import { selectSavedProcedures } from "../../../../../../redux/reducers/synthesis-procedure"

export default function Prime() {
    const { control, setValue } = useFormContext()

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite)

    const amediteList = useSelector((state) => state.amedite.amediteList)

    const [selectPrimingAmediteDetail, setSelectPrimingAmediteDetail] = useState({})

    const primingMenuItem = [...Array(24)].map((_, index) => ({ label: index < 9 ? `0${index + 1}` : index + 1, value: index + 1 }))

    const handleSelectPrimingPosition = (position) => {
        const selectedAmedite = ameditePosition?.[position?.value - 1]

        const selectPrimingAmediteDetail = amediteList?.find((el) => el?.id === selectedAmedite?.value)

        setValue("1_primingFlowRate", selectPrimingAmediteDetail?.flowRate)

        setSelectPrimingAmediteDetail(selectPrimingAmediteDetail)
    }

    const synthesisProcedure = useSelector(selectSavedProcedures)

    const synthesisProcedureList = synthesisProcedure?.map((el) => {
        return { label: el.name, value: el.id }
    })

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[650px] w-full">
                    <h3 className="font-bold text-xl mb-6">Priming Settings</h3>

                    <div className="flex flex-row items-start gap-6 w-full justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <span className="font-bold text-neutral-600">Position</span>
                            <SelectionController
                                rules={{ required: "Please select priming column" }}
                                width={220}
                                menuItem={primingMenuItem}
                                control={control}
                                name="1_primingPosition"
                                placeholder="Select position"
                                handleChange={handleSelectPrimingPosition}
                            />
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <span className="font-bold text-neutral-600">Flow Rate</span>
                            <InputField
                                rightFixItem="ml/min"
                                name="1_primingFlowRate"
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
                                name="1_primingVolume"
                                width="w-[220px]"
                                wrapperClassName="max-w-[220px]"
                                control={control}
                                type="number"
                                placeholder="Enter volume"
                            />
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <span className="font-bold text-neutral-600">Loop</span>
                            <InputField name="1_primingXFactor" width="w-[220px]" wrapperClassName="max-w-[220px]" control={control} type="number" placeholder="Enter X factor" />
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-2 pb-4 border-b mb-4 border-neutral-300">
                        <span className="font-bold text-neutral-600">Procedure</span>
                        <SelectionController
                            rules={{ required: "Please select procedure" }}
                            width={220}
                            menuItem={synthesisProcedureList}
                            control={control}
                            name="1_primingProcedure"
                            placeholder="Select procedure"
                        />
                    </div>

                    <div className="">
                        <div className="font-medium text-lg w-fit">Priming details</div>
                        <p className="italic text-neutral-700 pb-2">Detilas of priming amedite at selected position </p>

                        <div>
                            <span className="font-medium">Amedite name : </span>
                            {selectPrimingAmediteDetail?.full_name
                                ? selectPrimingAmediteDetail?.full_name
                                : isObject(selectPrimingAmediteDetail)
                                ? "No priming position selected"
                                : "No amedite assign to select position"}
                        </div>

                        <div>
                            <span className="font-medium">Amedite flow rate : </span>
                            {selectPrimingAmediteDetail?.flowRate
                                ? selectPrimingAmediteDetail?.flowRate
                                : isObject(selectPrimingAmediteDetail)
                                ? "No priming position selected"
                                : "No amedite assign to select position"}
                        </div>

                        <div>
                            <span className="font-medium">Amedite concentration : </span>
                            {selectPrimingAmediteDetail?.concentration
                                ? selectPrimingAmediteDetail?.concentration
                                : isObject(selectPrimingAmediteDetail)
                                ? "No priming position selected"
                                : "No amedite assign to select position"}
                        </div>

                        <div>
                            <span className="font-medium">Amedite MW : </span>
                            {selectPrimingAmediteDetail?.mw
                                ? selectPrimingAmediteDetail?.mw
                                : isObject(selectPrimingAmediteDetail)
                                ? "No priming position selected"
                                : "No amedite assign to select position"}
                        </div>
                    </div>
                </div>

                <WasteColumnSelection name="1_primingWaste" control={control} />
            </div>
        </>
    )
}
