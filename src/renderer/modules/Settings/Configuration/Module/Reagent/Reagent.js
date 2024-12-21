import React, { useEffect, useState } from "react";
import { ControllerDropdown } from "../../../../../Components/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import { getBottleMappingData, getBottleMappingDetails, saveBottleMappingData } from "../../../../../function/electronFunctionDeclaration";
import _ from "lodash";

export default function Reagent() {
    const positions = Array.from({ length: 10 });

    const { control, handleSubmit, setValue } = useForm();

    const [reagents, setReagents] = useState([]);

    const loadPosition = async () => {
        try {
            const response = await getBottleMappingData("reagent_positions");

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
            await saveBottleMappingData(filteredDataOnValue, "reagent_positions");

            console.log("Data saved successfully!");
        } catch (error) {
            console.error("Failed to save data:", error);
        }
    };

    const loadRetReagentsList = async () => {
        try {
            const response = await getBottleMappingDetails("reagent");

            setReagents(response.data.map((el) => ({ label: el.full_name, value: el.full_name })));
        } catch (error) {
            console.log(`error : `, error);
        }
    };

    useEffect(() => {
        loadRetReagentsList();
        loadPosition();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-neutral-300 px-6 w-full py-4 rounded-xl shadow-lg max-w-[300px] bg-neutral-50">
            <div className="flex flex-row justify-between items-center border-b border-neutral-300 pb-4 mb-4">
                <h3 className="text-xl font-medium">Reagent</h3>

                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]">
                    Save
                </button>
            </div>

            {positions.map((_, index) => (
                <div key={index} className="space-y-2 flex gap-3 justify-between items-center w-full">
                    <span className="pt-2.5 block font-medium text-gray-700">{index < 9 ? `0${index + 1}` : index + 1}</span>
                    <ControllerDropdown control={control} name={`reagent_${index + 1}`} menuItem={reagents} label={`Select Reagent`} className="max-w-[200px]" />
                </div>
            ))}
        </form>
    );
}
