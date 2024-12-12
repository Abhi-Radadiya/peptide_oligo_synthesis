import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import { savePrimeSolvent } from "../../../../../redux/reducers/settings/prime/primeSolvent";

export default function PrimeSolvents() {
    const dispatch = useDispatch();

    const amediteOptions = useSelector(
        (state) =>
            state.amedite?.amediteList?.map((el) => ({
                label: el.full_name,
                value: el.full_name,
            })) || []
    );

    const existingPrimeSolvents = useSelector((state) => state.primeSolvent?.primeSolvents || {});

    const positions = Array.from({ length: 10 });

    const { control, handleSubmit, setValue, watch } = useForm({ defaultValues: existingPrimeSolvents });

    useEffect(() => {
        Object.entries(existingPrimeSolvents).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [existingPrimeSolvents, setValue]);

    const onSubmit = async (data) => {
        dispatch(savePrimeSolvent(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-neutral-300 px-6 w-full py-4 rounded-xl shadow-lg bg-neutral-50">
            <div className="flex flex-row justify-between items-center border-b border-neutral-300 pb-4 mb-4">
                <h3 className="text-xl font-medium">Prime solvent</h3>
                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]">
                    Save
                </button>
            </div>

            <div className="grid grid-cols-3 w-full justify-between gap-5">
                {positions?.map((_, index) => {
                    const indexP = index + 1;

                    return (
                        <div key={index} className="flex gap-3 items-center w-full">
                            <span className="block font-medium text-gray-700">{indexP < 10 ? "0" + indexP : indexP}.</span>

                            <div className={`${watch(`prime_solvent_${indexP}.solvent.value`) && "border"} rounded border-neutral-800`}>
                                <SelectionController
                                    control={control}
                                    placeholder={`Select solvent`}
                                    name={`prime_solvent_${indexP}.solvent`}
                                    menuItem={amediteOptions}
                                    className="max-w-[200px]"
                                    width={200}
                                />
                            </div>

                            <Controller
                                control={control}
                                name={`prime_solvent_${indexP}.check`}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <input type="checkbox" onBlur={onBlur} onChange={onChange} checked={value ?? false} className="h-4 w-4" />
                                )}
                            />
                        </div>
                    );
                })}
            </div>
        </form>
    );
}
