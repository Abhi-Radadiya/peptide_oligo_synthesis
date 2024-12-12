import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SelectionController } from "../../../Components/Dropdown/Dropdown";
import { saveBottleMapping } from "../../../../redux/reducers/settings/bottleMapping";

export default function BottleMapping() {
    const dispatch = useDispatch();

    const amedites = useSelector((state) => state.amedite.amediteList)?.map((el) => ({
        label: el.full_name,
        value: el.full_name,
    }));

    const existingBottleMapping = useSelector((state) => state.bottleMapping.mappingData);

    const positions = Array.from({ length: 24 });
    const { control, handleSubmit, watch, setValue } = useForm({
        defaultValues: existingBottleMapping,
    });

    useEffect(() => {
        Object.entries(existingBottleMapping).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [existingBottleMapping, setValue]);

    const onSubmit = async (data) => {
        dispatch(saveBottleMapping(data));
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-neutral-300 px-6 w-full py-4 rounded-xl shadow-lg bg-neutral-50">
                <div className="flex flex-row justify-between items-center border-b border-neutral-300 pb-4 mb-4">
                    <h3 className="text-xl font-medium">Amedite</h3>
                    <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]">
                        Save
                    </button>
                </div>

                <div className="flex flex-row w-full justify-between">
                    {[...Array(4)].map((_, colIndex) => (
                        <div key={colIndex} className="w-full space-y-8">
                            {positions.slice(colIndex * 6, (colIndex + 1) * 6)?.map((_, index) => {
                                const indexA = index + 1 + colIndex * 6;
                                return (
                                    <div key={index} className="flex gap-3 items-center w-full ">
                                        <span className="block font-medium text-gray-700">{indexA < 10 ? "0" + indexA : indexA}.</span>
                                        <div className={`${watch(`amedite_${indexA}`) && "border"} rounded border-neutral-800`}>
                                            <SelectionController
                                                control={control}
                                                name={`amedite_${indexA}`}
                                                placeholder={`Select amedite for ${indexA}`}
                                                menuItem={amedites}
                                                className="max-w-[250px]"
                                                width={250}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </form>
        </>
    );
}
