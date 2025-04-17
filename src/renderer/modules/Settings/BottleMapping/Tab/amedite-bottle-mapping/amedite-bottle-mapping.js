// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { saveBottleMapping } from "../../../../../../redux/reducers/settings/bottleMapping";
// import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
// import { openToast } from "../../../../../../redux/reducers/toastStateReducer/toastStateReducer";
// import { SUCCESS } from "../../../../../Helpers/Icons";

// export default function Amedite() {
//     const dispatch = useDispatch();

//     const amedites = useSelector((state) => state.amedite.amediteList)?.map((el) => ({
//         label: el.full_name,
//         value: el.id
//     }));

//     const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

//     const { control, handleSubmit, watch } = useForm({
//         defaultValues: {
//             amedite: ameditePosition?.map((el) => {
//                 return el.value ? el : undefined;
//             })
//         }
//     });

//     const onSubmit = async (data) => {
//         const payload = data.amedite.map((el) => ({ value: el?.value, label: el?.label }));

//         dispatch(saveBottleMapping({ data: payload, type: "amedite" }));

//         dispatch(openToast({ text: "Amedite saved successfully.", icon: SUCCESS }));
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-neutral-300 px-6 w-full py-4 rounded-xl shadow-lg bg-neutral-50">
//                 <div className="flex flex-row justify-between items-center border-b border-neutral-300 pb-4 mb-4">
//                     <h3 className="text-xl font-medium">Amedite</h3>
//                     <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-lg w-full max-w-[90px]">
//                         Save
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-4 gap-10">
//                     {ameditePosition?.map((_, index) => {
//                         return (
//                             <div key={index} className="flex gap-3 items-center w-full ">
//                                 <span className="block font-medium text-gray-700">{index < 9 ? "0" + (index + 1) : index + 1}.</span>
//                                 <div className={`${!watch(`amedite.${index}`) && "border"} rounded-lg border-neutral-800`}>
//                                     <SelectionController
//                                         control={control}
//                                         name={`amedite.${index}`}
//                                         placeholder={`Select amedite for ${index + 1}`}
//                                         menuItem={amedites}
//                                         className="max-w-[230px]"
//                                         width={230}
//                                     />
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </form>
//         </>
//     );
// }

import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown"

export default function AmediteBottleMapping() {
    const { container1, container2, container3 } = useSelector((state) => state.hardwareSetup.amediteContainer)
    const [selectedAmedites, setSelectedAmedites] = useState([])

    const amedites = [
        { label: "amedite1", value: "some uuid" },
        { label: "amedite2", value: "some uuid2" }
        // Add more amedites as needed
    ]

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isDirty }
    } = useForm({
        defaultValues: {
            container1Bottles: {},
            container2Bottles: {},
            container3Bottles: {}
        }
    })

    // Watch all form values to track selected amedites
    const formValues = watch()

    // Update selected amedites list when form values change
    useEffect(() => {
        const allSelectedAmedites = []

        // Extract amedite values from all containers
        const extractAmedites = (container) => {
            if (!container) return []
            return Object.values(container).filter((val) => val)
        }

        allSelectedAmedites.push(
            ...extractAmedites(formValues.container1Bottles),
            ...extractAmedites(formValues.container2Bottles),
            ...extractAmedites(formValues.container3Bottles)
        )

        setSelectedAmedites(allSelectedAmedites)
    }, [formValues])

    // Check if an amedite is already selected elsewhere
    const isAmediteSelected = (amediteValue) => {
        return selectedAmedites.includes(amediteValue)
    }

    // Filter available amedites, excluding already selected ones (except current selection)
    const getAvailableAmedites = (currentValue) => {
        return amedites.filter((amedite) => !isAmediteSelected(amedite.value) || amedite.value === currentValue)
    }

    const onSubmit = (data) => {
        console.log("Submitted data:", data)
        // Here you would dispatch to your Redux store or handle the data as needed
        // toast({
        //     title: "Amedite mapping saved",
        //     description: "Your bottle to amedite mappings have been saved successfully."
        // })
    }

    // Render bottles for a specific container
    const renderBottles = (container, containerName) => {
        if (!container || !container.bottles || container.bottles.length === 0) {
            return <p className="text-gray-500">No bottles found in this container.</p>
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {container.bottles.map((bottle) => (
                    <div key={bottle.id} className="shadow-sm">
                        <div className="pb-2">
                            <h1 className="text-sm font-medium">{bottle.bottleName}</h1>
                            <p className="text-xs text-gray-500">Valve: {bottle.valve.index}</p>
                        </div>
                        <div>
                            <SelectionController name={`${containerName}Bottles.${bottle.id}`} control={control} menuItem={amedites} />

                            {/* <Controller
                                name={`${containerName}Bottles.${bottle.id}`}
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an amedite" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">-- None --</SelectItem>
                                            {getAvailableAmedites(field.value).map((amedite) => (
                                                <SelectItem key={amedite.value} value={amedite.value}>
                                                    {amedite.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            /> */}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold">Amedite Bottle Mapping</h2>
            <p className="text-gray-500">Assign specific amedites to each bottle. Each amedite can only be used once.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TabGroup className="mb-6">
                    <TabList className="mb-4">
                        <Tab>Container 1</Tab>
                        <Tab>Container 2</Tab>
                        <Tab>Container 3</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel className="mt-2">
                            <div>
                                <h1>Container 1 Bottles</h1>
                                <p>{renderBottles(container1, "container1")}</p>
                            </div>
                        </TabPanel>
                        <TabPanel className="mt-2">
                            <div>
                                <h1>Container 2 Bottles</h1>
                                <p>{renderBottles(container2, "container2")}</p>
                            </div>
                        </TabPanel>
                        <TabPanel className="mt-2">
                            <div>
                                <h1>Container 3 Bottles</h1>
                                <p>{renderBottles(container3, "container3")}</p>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => reset()} disabled={!isDirty}>
                        Reset
                    </Button>
                    <Button type="submit">Save Mappings</Button>
                </div>
            </form>
        </div>
    )
}
