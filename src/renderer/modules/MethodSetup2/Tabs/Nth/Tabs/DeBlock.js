import React from "react"
import { useFormContext } from "react-hook-form"
import AmediteSection, { RadioSection, WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection"

export default function DeBlock(props) {
    const { disabled } = props

    const { control } = useFormContext()

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6 mb-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">De - Block Settings</h3>

                    <AmediteSection
                        disabled={disabled}
                        names={{ solvent: "n_deSolvent", volume: "n_deVolume", xFactor: "n_deXFactor", flowRate: "n_deFlowRate", synthesisProcedureName: "n_deBlockProcedure" }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />

                    <AmediteSection
                        disabled={disabled}
                        names={{
                            solvent: "n_deWashSolvent",
                            volume: "n_deWashVolume",
                            xFactor: "n_deWashXFactor",
                            flowRate: "n_deWashFlowRate",
                            synthesisProcedureName: "n_deBlockWashProcedure"
                        }}
                        title="Wash Setting"
                        className="mb-4 pb-4 border-b border-neutral-300"
                    />

                    <RadioSection disabled={disabled} title="UV Setting" radioName="n_deUVEnable" checkName="n_deCheck" />
                </div>

                <WasteColumnSelection disabled={disabled} name="n_deWaste" control={control} />
            </div>
        </>
    )
}
