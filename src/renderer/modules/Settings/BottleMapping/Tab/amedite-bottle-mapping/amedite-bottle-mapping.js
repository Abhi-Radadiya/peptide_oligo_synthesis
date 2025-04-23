import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { saveBottleMapping } from "../../../../../../redux/reducers/settings/bottleMapping"
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown"
import { openToast } from "../../../../../../redux/reducers/toastStateReducer/toastStateReducer"
import { SUCCESS } from "../../../../../Helpers/Icons"

export default function Amedite() {
    const dispatch = useDispatch()

    const amedites = useSelector((state) => state.amedite.amediteList)?.map((el) => ({
        label: el.full_name,
        value: el.id
    }))

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite)

    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            amedite: ameditePosition?.map((el) => {
                return el.value ? el : undefined
            })
        }
    })

    const onSubmit = async (data) => {
        const payload = data.amedite.map((el) => ({ value: el?.value, label: el?.label }))

        dispatch(saveBottleMapping({ data: payload, type: "amedite" }))

        dispatch(openToast({ text: "Amedite saved successfully.", icon: SUCCESS }))
    }

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
                                <div className={`${!watch(`amedite.${index}`) && "border"} rounded-lg border-neutral-800`}>
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
                        )
                    })}
                </div>
            </form>
        </>
    )
}

// import React, { useState, useEffect } from "react"
// import { useSelector } from "react-redux"
// import { useForm } from "react-hook-form"
// import { SelectionController } from "../../../../../Components/Dropdown/Dropdown"
// import { Button } from "../../../../../Components/Buttons/Buttons"

// export default function AmediteBottleMapping(props) {
//     const { selectedBlock } = props
//     const { container1, container2, container3 } = useSelector((state) => state.hardwareSetup.amediteContainer)
//     const [selectedAmedites, setSelectedAmedites] = useState([])

//     const amedites = useSelector((state) => state.amedite.amediteList)?.map((el) => ({
//         label: el.full_name,
//         value: el.id
//     }))

//     const { control, handleSubmit, watch } = useForm({
//         defaultValues: {
//             container1Bottles: {},
//             container2Bottles: {},
//             container3Bottles: {}
//         }
//     })

//     // Watch all form values to track selected amedites
//     const formValues = watch()

//     // Update selected amedites list when form values change
//     useEffect(() => {
//         const allSelectedAmedites = []

//         // Extract amedite values from all containers
//         const extractAmedites = (container) => {
//             if (!container) return []
//             return Object.values(container).filter((val) => val)
//         }

//         allSelectedAmedites.push(
//             ...extractAmedites(formValues.container1Bottles),
//             ...extractAmedites(formValues.container2Bottles),
//             ...extractAmedites(formValues.container3Bottles)
//         )

//         setSelectedAmedites(allSelectedAmedites)
//     }, [formValues])

//     // Check if an amedite is already selected elsewhere
//     const isAmediteSelected = (amediteValue) => {
//         return selectedAmedites.includes(amediteValue)
//     }

//     // Filter available amedites, excluding already selected ones (except current selection)
//     const getAvailableAmedites = (currentValue) => {
//         return amedites.filter((amedite) => !isAmediteSelected(amedite.value) || amedite.value === currentValue)
//     }

//     const onSubmit = (data) => {
//         console.log("Submitted data:", data)
//         // Here you would dispatch to your Redux store or handle the data as needed
//         // toast({
//         //     title: "Amedite mapping saved",
//         //     description: "Your bottle to amedite mappings have been saved successfully."
//         // })
//     }

//     // Render bottles for a specific container
//     const renderBottles = (container, containerName) => {
//         if (!container || !container.bottles || container.bottles.length === 0) {
//             return <p className="text-gray-500">No bottles found in this container.</p>
//         }

//         return (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {container.bottles.map((bottle) => (
//                     <div key={bottle.id} className="shadow-sm">
//                         <div className="pb-2">
//                             <h1 className="text-sm font-medium">{bottle.bottleName}</h1>
//                             <p className="text-xs text-gray-500">Valve: {bottle.valve.index}</p>
//                         </div>
//                         <div>
//                             <SelectionController name={`${containerName}Bottles.${bottle.id}`} control={control} menuItem={amedites} />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )
//     }

//     return (
//         <div className="p-4 space-y-6">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 {selectedBlock === 0 ? (
//                     <div>{renderBottles(container1, "container1")}</div>
//                 ) : selectedBlock === 1 ? (
//                     <div>{renderBottles(container2, "container2")}</div>
//                 ) : (
//                     <div>{renderBottles(container3, "container3")}</div>
//                 )}

//                 <div className="flex justify-end gap-4 mt-8">
//                     <Button type="submit" bgClassName="bg-green-400" label="Save Mappings" />
//                 </div>
//             </form>
//         </div>
//     )
// }
