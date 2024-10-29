import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBottleMappingData, getBottleMappingDetails, saveBottleMappingData } from "../../../function/electronFunctionDeclaration";
import _ from "lodash";
import { ControllerDropdown } from "../../../Components/Dropdown/Dropdown";

export default function BottleMapping() {
    const [amedites, setAmedites] = useState([]);

    const positions = Array.from({ length: 24 });

    const { control, handleSubmit, setValue } = useForm();

    const loadPosition = async () => {
        try {
            const response = await getBottleMappingData("amedite_positions");

            response.data.forEach((item) => {
                setValue(item.position, item.value);
            });
        } catch (error) {
            console.error("Failed to load data:", error);
        }
    };

    const onSubmit = async (data) => {
        const filteredDataOnValue = _.omitBy(data, _.isUndefined);

        try {
            await saveBottleMappingData(filteredDataOnValue, "amedite_positions");

            console.log("Data saved successfully!");
        } catch (error) {
            console.error("Failed to save data:", error);
        }
    };

    const loadAmediteList = async () => {
        try {
            const response = await getBottleMappingDetails("amedites");

            setAmedites(response.data.map((el) => ({ label: el.full_name, value: el.full_name })));
        } catch (error) {
            console.log(`error : `, error);
        }
    };

    useEffect(() => {
        loadAmediteList();
        loadPosition();
    }, []);

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
                                    <div key={index} className="flex gap-3 items-center w-full">
                                        <span className="block font-medium text-gray-700">{indexA < 10 ? "0" + indexA : indexA}.</span>
                                        <ControllerDropdown control={control} name={`amedite_${indexA}`} menuItem={amedites} label={`Select`} className="max-w-[200px]" />
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
