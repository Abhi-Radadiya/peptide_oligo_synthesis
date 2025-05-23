import React from "react"
import { useFormContext } from "react-hook-form"
import AmediteSection, { WasteColumnSelection } from "../../../Components/AmediteSection/AmediteSection"

export default function Capping(props) {
    const { disabled } = props

    const { control } = useFormContext()

    return (
        <>
            <div className="flex flex-row w-full items-start justify-between border border-neutral-300 rounded-2xl shadow-md py-4 px-6">
                <div className="max-w-[615px] w-full">
                    <h3 className="font-bold text-xl mb-4">Capping Settings</h3>

                    <AmediteSection
                        disabled={disabled}
                        names={{
                            solvent: "n_cappingASolvent",
                            volume: "n_cappingAVolume",
                            xFactor: "n_cappingAXFactor",
                            flowRate: "n_cappingAFlowRate",
                            synthesisProcedureName: "n_cappingAProcedure"
                        }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                        title="Capping A"
                    />
                    <AmediteSection
                        disabled={disabled}
                        names={{
                            solvent: "n_cappingBSolvent",
                            volume: "n_cappingBVolume",
                            xFactor: "n_cappingBXFactor",
                            flowRate: "n_cappingBFlowRate",
                            synthesisProcedureName: "n_cappingBProcedure"
                        }}
                        className="mb-4 pb-4 border-b border-neutral-300"
                        title="Capping B"
                    />
                    <AmediteSection
                        disabled={disabled}
                        names={{
                            solvent: "n_cappingWashSolvent",
                            volume: "n_cappingWashVolume",
                            xFactor: "n_cappingWashXFactor",
                            flowRate: "n_cappingWashFlowRate",
                            synthesisProcedureName: "n_cappingWashProcedure"
                        }}
                        title="Wash setting"
                    />
                </div>

                <WasteColumnSelection disabled={disabled} control={control} name="n_cappingWaste" />
            </div>
        </>
    )
}
