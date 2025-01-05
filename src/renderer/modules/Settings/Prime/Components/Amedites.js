import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { openToast } from "../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { SUCCESS } from "../../../../Helpers/Icons";
import { savePriming } from "../../../../../redux/reducers/settings/prime/primingReducer";

export default function PrimeAmedites() {
    const dispatch = useDispatch();

    const primeAmedites = useSelector((state) => state.priming.amedite || {});

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    const { control, handleSubmit } = useForm({ defaultValues: { priming: primeAmedites } });

    const onSubmit = async (data) => {
        const payload = data.priming.map((el, index) => ({ ...el, amedite: ameditePosition[index] }));

        dispatch(savePriming({ data: payload, type: "amedite" }));

        dispatch(openToast({ text: "Amedite saved successfully.", icon: SUCCESS }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-neutral-300 px-6 w-full py-4 rounded-xl shadow-lg bg-neutral-50">
            <div className="flex flex-row justify-between items-center border-b border-neutral-300 pb-4 mb-4">
                <h3 className="text-xl font-medium">Prime Amedite</h3>
                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]">
                    Save
                </button>
            </div>

            <div className="grid grid-cols-4 gap-10">
                {primeAmedites.map((_, index) => {
                    const selectedAmedite = ameditePosition[index].label;

                    return (
                        <div key={index} className="flex gap-3 items-center w-full ">
                            <div key={index} className="flex gap-3 items-center w-full">
                                <span className="block font-medium text-gray-700">{index < 9 ? "0" + (index + 1) : index + 1}.</span>

                                <span className={`px-2 py-2 border bg-white border-neutral-300 rounded-md w-full ${!!selectedAmedite ? "" : "text-neutral-300"}`}>
                                    {selectedAmedite ?? "Amedite isn't selected"}
                                </span>

                                <Controller
                                    control={control}
                                    name={`priming.${index}.check`}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <input
                                            type="checkbox"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            checked={value ?? false}
                                            className="h-5 w-5 focus:ring-1 ring-neutral-500 rounded-lg ring-offset-1"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </form>
    );
}
