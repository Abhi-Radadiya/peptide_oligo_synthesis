import React, { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { SelectionController } from "../../../../Components/Dropdown/Dropdown"
import InputField from "../../../../Components/Input/Input"
import { useDispatch, useSelector } from "react-redux"
import { addAmediteContainerBottle, addReagentContainerBottle, addWasteContainerBottle } from "../../../../../redux/reducers/settings/hardwareSetup"
import SingleAmediteContainer, { MAX_BOTTLE_PER_REAGENT_CONTAINER, MAX_BOTTLES_PER_AMEDITE_CONTAINER } from "../components/single-amedite-container"
import WasteContainer from "../components/waste-container"
import SensingValve from "../components/sensing-valve"
import { MAX_WASTE_BOTTLES } from "../components/waste-container"

export default function ValveSetup() {
    const { control, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            bottleName: "",
            selectedContainer: "",
            selectedValve: ""
        }
    })

    const containerBottles = useSelector((state) => state.hardwareSetup)

    const { valveBoard } = useSelector((state) => state.hardwareSetup)

    const getRemainingSpace = (containerName, containerType) => {
        if (containerType === "wasteContainer") return MAX_WASTE_BOTTLES - containerBottles.wasteContainer.bottles.length

        const container = containerBottles[containerType === "reagent" ? "reagentContainer" : "amediteContainer"]?.[containerName]

        return container ? (containerType === "reagent" ? MAX_BOTTLE_PER_REAGENT_CONTAINER : MAX_BOTTLES_PER_AMEDITE_CONTAINER) - container.bottles.length : 0
    }

    const dispatch = useDispatch()

    const containerMenuItem = useMemo(() => {
        return [
            { value: "container1", type: "amedite", label: `Amedite Container 1 - ${getRemainingSpace("container1")}`, isDisabled: !getRemainingSpace("container1") },
            { value: "container2", type: "amedite", label: `Amedite Container 2 - ${getRemainingSpace("container2")}`, isDisabled: !getRemainingSpace("container2") },
            { value: "container3", type: "amedite", label: `Amedite Container 3 - ${getRemainingSpace("container3")}`, isDisabled: !getRemainingSpace("container3") },
            {
                value: "reagentContainer1",
                type: "reagent",
                label: `Reagent Container 1 - ${getRemainingSpace("container1", "reagent")}`,
                isDisabled: !getRemainingSpace("container1", "reagent")
            },
            {
                value: "reagentContainer2",
                type: "reagent",
                label: `Reagent Container 2 - ${getRemainingSpace("container2", "reagent")}`,
                isDisabled: !getRemainingSpace("container2", "reagent")
            },
            {
                value: "wasteContainer",
                type: "wasteContainer",
                label: `Waste Block - ${getRemainingSpace(null, "wasteContainer")}`,
                isDisabled: !getRemainingSpace(null, "wasteContainer")
            }
        ]
    }, [containerBottles])

    // Handle adding a new bottle
    const handleAddAmediteContainerBottle = () => {
        switch (watch("selectedContainer.type")) {
            case "reagent":
                dispatch(
                    addReagentContainerBottle({
                        bottleName: watch("bottleName"),
                        containerName: watch("selectedContainer.value") === "reagentContainer1" ? "container1" : "container2",
                        valve: watch("selectedValve.value")
                    })
                )
                break

            case "wasteContainer":
                dispatch(
                    addWasteContainerBottle({
                        bottleName: watch("bottleName"),
                        valve: watch("selectedValve.value")
                    })
                )
                break

            default:
                dispatch(
                    addAmediteContainerBottle({
                        bottleName: watch("bottleName"),
                        containerName: watch("selectedContainer.value"),
                        valve: watch("selectedValve.value")
                    })
                )
                break
        }

        reset()
    }

    const [usedValveIds, setUsedValveIds] = useState([])

    const getValveIds = () => {
        const amediteValveId_1 = containerBottles.amediteContainer.container1.bottles.map((el) => {
            return el.valve.id
        })

        const amediteValveId_2 = containerBottles.amediteContainer.container2.bottles.map((el) => {
            return el.valve.id
        })

        const amediteValveId_3 = containerBottles.amediteContainer.container3.bottles.map((el) => {
            return el.valve.id
        })

        const reagentValveId_1 = containerBottles.reagentContainer.container1.bottles.map((el) => {
            return el.valve.id
        })

        const reagentValveId_2 = containerBottles.reagentContainer.container2.bottles.map((el) => {
            return el.valve.id
        })

        const wasteValveId = containerBottles.wasteContainer.bottles.map((el) => {
            return el.valve.id
        })

        const otherValveIds = [
            ...(!!containerBottles.otherValve.topValve?.valve?.id ? [containerBottles.otherValve.topValve?.valve?.id] : []),
            ...(!!containerBottles.otherValve.bottomValve?.valve?.id ? [containerBottles.otherValve.bottomValve?.valve?.id] : []),
            ...(!!containerBottles.otherValve.rgValve?.valve?.id ? [containerBottles.otherValve.rgValve?.valve?.id] : []),
            ...(!!containerBottles.otherValve.wasteValve?.valve?.id ? [containerBottles.otherValve.wasteValve?.valve?.id] : [])
        ]

        setUsedValveIds([...amediteValveId_1, ...amediteValveId_2, ...amediteValveId_3, ...reagentValveId_1, ...reagentValveId_2, ...wasteValveId, ...otherValveIds])
    }

    useEffect(() => {
        !!containerBottles.amediteContainer.container1 && getValveIds()
    }, [containerBottles])

    const validateUniqueBottleName = (value) => {
        // Flatten the bottles from all containers into a single array
        const allBottles = Object.values({ ...containerBottles.amediteContainer, ...containerBottles.reagentContainer }).flatMap((container) => container.bottles)

        // Check if the value already exists in any bottle
        const isUnique = !allBottles.some((bottle) => bottle.bottleName === value)

        // Return an error message if the name is not unique
        return isUnique || "Bottle name must be unique"
    }

    // TODO : Need to add valve index while assign valve and while deleting board change index as well
    const valveMenuItem = useMemo(() => {
        return valveBoard.flatMap((board, index) => {
            return board.valve.map((valve, valveIndex) => {
                return { label: `Valve ${index * 16 + 1 + valveIndex}`, value: { id: valve.id, index: index * 16 + 1 + valveIndex }, isDisabled: usedValveIds.includes(valve.id) }
            })
        })
    }, [valveBoard, usedValveIds])

    return (
        <div className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-3xl border border-amber-400 p-8">
            <div className="mx-auto space-y-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Bottle</h2>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <InputField
                                name="bottleName"
                                control={control}
                                label="Bottle Name"
                                placeholder="Enter unique bottle name"
                                rules={{ required: "Bottle name is required", validate: validateUniqueBottleName }}
                            />
                        </div>

                        <div className="col-span-1">
                            <SelectionController
                                height={41.6}
                                placeholder="Select Valve"
                                label="Select Valve"
                                menuItem={valveMenuItem}
                                name="selectedValve"
                                rules={{ required: "Valve is required" }}
                                control={control}
                            />
                        </div>

                        <div className="col-span-1">
                            <SelectionController
                                height={41.6}
                                placeholder="Select Container"
                                label="Select Container"
                                menuItem={containerMenuItem}
                                name="selectedContainer"
                                rules={{ required: "Container is required" }}
                                control={control}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit(handleAddAmediteContainerBottle)}
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:ring-2 ring-indigo-300 outline-1 ring-offset-2"
                    >
                        Add Bottle
                    </button>
                </div>

                <div className="border rounded-lg border-purple-200 bg-white px-8 py-6 shadow-md">
                    <h1 className="text-xl font-medium pb-4">Amedite Container</h1>

                    <div className="grid grid-cols-2 gap-6">
                        <SingleAmediteContainer containerType="amedite" containerName="container1" />
                        <SingleAmediteContainer containerType="amedite" containerName="container2" />
                        <SingleAmediteContainer containerType="amedite" containerName="container3" />
                    </div>
                </div>

                <div className="border rounded-lg border-purple-200 bg-white px-8 py-6 shadow-md">
                    <h1 className="text-xl font-medium pb-4">Reagent Container</h1>

                    <div className="grid grid-cols-2 gap-6">
                        <SingleAmediteContainer containerName="container1" containerType="reagent" />
                        <SingleAmediteContainer containerName="container2" containerType="reagent" />
                    </div>
                </div>

                <div className="border rounded-lg border-purple-200 bg-white px-8 py-6 shadow-md">
                    <h1 className="text-xl font-medium pb-4">Other Valve</h1>

                    <div className="grid grid-cols-2 gap-6">
                        <WasteContainer />

                        <SensingValve valveMenuItem={valveMenuItem} />
                    </div>
                </div>
            </div>
        </div>
    )
}
