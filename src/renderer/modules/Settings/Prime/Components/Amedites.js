import React, { useEffect, useState } from "react";
// import { ControllerDropdown } from "../../../../../Components/Dropdown/Dropdown";
import { Controller, useForm } from "react-hook-form";
// import { getBottleMappingDetails,savePrimeAmediteDetails } from "../../../../../function/electronFunctionDeclaration";
import _ from "lodash";
import { ControllerDropdown } from "../../../../Components/Dropdown/Dropdown";
import { getBottleMappingDetails, savePrimeAmediteDetails } from "../../../../function/electronFunctionDeclaration";

export default function Amedites() {
    const [amedites, setAmedites] = useState([]);

    const positions = Array.from({ length: 24 });

    const { control, handleSubmit, setValue } = useForm();

    const loadPosition = async () => {
        try {
            // const response = await getBottleMappingData("prime_amedite_positions");
            // response.data.forEach((item) => {
            //     setValue(item.position, item.value);
            // });
        } catch (error) {
            console.error("Failed to load data:", error);
        }
    };

    const onSubmit = async (data) => {
        const filteredData = _.pickBy(data, (item) => item.value !== undefined || item.check !== undefined);

        try {
            await savePrimeAmediteDetails(filteredData, "prime_amedites_position");

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-neutral-300 px-6 w-full py-4 rounded-xl shadow-lg max-w-[420px] bg-neutral-50">
            <div className="flex flex-row justify-between items-center border-b border-neutral-300 pb-4 mb-4">
                <h3 className="text-xl font-medium">Amedite</h3>

                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]">
                    Save
                </button>
            </div>

            <div className="flex flex-row w-full justify-between gap-6">
                <div className="w-full">
                    {positions.slice(0, 12)?.map((_, index) => (
                        <div key={index} className="space-y-2 flex gap-3 items-center w-full">
                            <span className="pt-2.5 block font-medium text-gray-700">{index < 9 ? `0${index + 1}` : index + 1}</span>
                            <ControllerDropdown
                                rules={{}}
                                control={control}
                                name={`prime_amedite_${index + 1}.value`}
                                menuItem={amedites}
                                label={`Select`}
                                className="max-w-[200px]"
                            />
                            <Controller
                                control={control}
                                name={`prime_amedite_${index + 1}.check`}
                                render={({ field: { onChange, onBlur, value } }) => <input type="checkbox" onBlur={onBlur} onChange={onChange} checked={value ?? false} />}
                            />
                        </div>
                    ))}
                </div>

                <div className="w-full">
                    {positions.slice(12, 24)?.map((_, index) => (
                        <div key={index} className="space-y-2 flex gap-3 items-center w-full">
                            <span className="pt-2.5 block font-medium text-gray-700">{index + 13}</span>
                            <ControllerDropdown
                                rules={{}}
                                control={control}
                                name={`prime_amedite_${index + 13}.value`}
                                menuItem={amedites}
                                label={`Select`}
                                className="max-w-[200px]"
                            />
                            <Controller
                                control={control}
                                name={`prime_amedite_${index + 13}.check`}
                                render={({ field: { onChange, onBlur, value } }) => <input type="checkbox" onBlur={onBlur} onChange={onChange} checked={value ?? false} />}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
}
