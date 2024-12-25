import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveBottleMapping } from "../../../../../../redux/reducers/settings/bottleMapping";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";

export default function Amedite() {
    const dispatch = useDispatch();

    const amedites = useSelector((state) => state.amedite.amediteList)?.map((el) => ({
        label: el.full_name,
        value: el.id,
    }));

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            amedite: ameditePosition?.map((el) => {
                return el.value ? el : undefined;
            }),
        },
    });

    const onSubmit = async (data) => {
        const payload = data.amedite.map((el) => ({ value: el?.value, label: el?.label }));

        dispatch(saveBottleMapping({ data: payload, type: "amedite" }));
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

                <div className="grid grid-cols-4 gap-10">
                    {ameditePosition?.map((_, index) => {
                        return (
                            <div key={index} className="flex gap-3 items-center w-full ">
                                <span className="block font-medium text-gray-700">{index < 9 ? "0" + (index + 1) : index + 1}.</span>
                                <div className={`${watch(`amedite.${index}`) && "border"} rounded border-neutral-800`}>
                                    <SelectionController
                                        control={control}
                                        name={`amedite.${index}`}
                                        placeholder={`Select amedite for ${index + 1}`}
                                        menuItem={amedites}
                                        className="max-w-[230px]"
                                        width={230}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </form>
        </>
    );
}
