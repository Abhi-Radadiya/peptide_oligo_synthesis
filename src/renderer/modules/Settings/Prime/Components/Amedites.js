import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import { savePrimeAmedite } from "../../../../../redux/reducers/settings/prime/primeAmedite";

export default function PrimeAmedites() {
    const dispatch = useDispatch();

    const amediteOptions = useSelector(
        (state) =>
            state.amedite?.amediteList?.map((el) => ({
                label: el.full_name,
                value: el.full_name,
            })) || []
    );

    const existingPrimeAmedites = useSelector((state) => state.primeAmedite?.primeAmedites || {});

    const positions = Array.from({ length: 24 });

    const { control, handleSubmit, setValue, watch } = useForm({ defaultValues: existingPrimeAmedites });

    useEffect(() => {
        Object.entries(existingPrimeAmedites).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [existingPrimeAmedites, setValue]);

    const onSubmit = async (data) => {
        const cleanedData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value.value || value.check));

        dispatch(savePrimeAmedite(cleanedData));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-neutral-300 px-6 w-full py-4 rounded-xl shadow-lg bg-neutral-50">
            <div className="flex flex-row justify-between items-center border-b border-neutral-300 pb-4 mb-4">
                <h3 className="text-xl font-medium">Prime Amedite</h3>
                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]">
                    Save
                </button>
            </div>

            <div className="flex flex-row w-full justify-between gap-5">
                {[...Array(4)].map((_, colIndex) => (
                    <div key={colIndex} className="w-full space-y-8">
                        {positions.slice(colIndex * 6, (colIndex + 1) * 6)?.map((_, index) => {
                            const indexP = index + 1 + colIndex * 6;

                            return (
                                <div key={index} className="flex gap-3 items-center w-full">
                                    <span className="block font-medium text-gray-700">{indexP < 10 ? "0" + indexP : indexP}.</span>

                                    <div className={`${watch(`prime_amedite_${indexP}.amedite.value`) && "border"} rounded border-neutral-800`}>
                                        <SelectionController
                                            control={control}
                                            placeholder={`Select amedite`}
                                            name={`prime_amedite_${indexP}.amedite`}
                                            menuItem={amediteOptions}
                                            className="max-w-[200px]"
                                            width={200}
                                        />
                                    </div>

                                    <Controller
                                        control={control}
                                        name={`prime_amedite_${indexP}.check`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <input type="checkbox" onBlur={onBlur} onChange={onChange} checked={value ?? false} className="h-4 w-4" />
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </form>
    );
}
