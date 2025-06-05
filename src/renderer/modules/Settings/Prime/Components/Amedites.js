import { Controller, FormProvider, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { SimpleCheckBox } from "../../../../Components/FormController/CheckBox"
import PrimingProcedure from "./priming-procedure"

export default function PrimeAmedites() {
    const primeAmedites = useSelector((state) => state.priming.amedite || {})

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite)

    const method = useForm({ defaultValues: { priming: primeAmedites, primingProcedureName: null } })

    const { control, handleSubmit } = method

    const onSubmit = async (data) => {
        // const payload = data.priming.map((el, index) => ({ ...el, amedite: ameditePosition[index] }))
        // dispatch(savePriming({ data: payload, type: "amedite" }))
        // dispatch(openToast({ text: "Amedite saved successfully.", icon: SUCCESS }))
    }

    return (
        <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)} className="border border-neutral-300 px-6 w-full py-4 rounded-xl shadow-lg bg-neutral-50">
                <div className="flex flex-row justify-between items-center border-b border-neutral-300 pb-4 mb-4">
                    <h3 className="text-xl font-medium">Prime Amedite</h3>

                    <PrimingProcedure section="amedite" />
                </div>

                <div className="grid grid-cols-4 gap-5">
                    {primeAmedites.map((_, index) => {
                        const selectedAmedite = ameditePosition[index].label

                        return (
                            <div key={index} className="flex gap-3 items-center w-full">
                                <div key={index} className="flex gap-3 items-center w-full">
                                    <span className="block font-medium text-gray-700">{index < 9 ? "0" + (index + 1) : index + 1}.</span>

                                    <span className={`px-2 py-2 border bg-white border-neutral-300 flex-grow rounded-md ${!!selectedAmedite ? "" : "text-neutral-300"}`}>
                                        {selectedAmedite ?? "Amedite isn't selected"}
                                    </span>

                                    <Controller
                                        control={control}
                                        name={`amedite.${index}.check`}
                                        render={({ field: { onChange, value } }) => <SimpleCheckBox checked={value} onChange={() => onChange(!value)} />}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </form>
        </FormProvider>
    )
}
