import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import InputField from "../../../../Components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { addAmediteContainerBottle, addReagentContainerBottle, addWasteContainerBottle } from "../../../../../redux/reducers/settings/hardwareSetup";
import SingleAmediteContainer, { MAX_BOTTLE_PER_REAGENT_CONTAINER, MAX_BOTTLES_PER_AMEDITE_CONTAINER } from "./single-amedite-container";
import WasteContainer from "./waste-container.js";
import { MAX_WASTE_BOTTLES } from "./waste-container.js";

const BottleManagementSystem = () => {
    const { control, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            bottleName: "",
            selectedContainer: ""
        }
    });

    const containerBottles = useSelector((state) => state.hardwareSetup);

    // Calculate remaining space in a container
    const getRemainingSpace = (containerName, containerType) => {
        if (containerType === "wasteContainer") return MAX_WASTE_BOTTLES - containerBottles.wasteContainer.bottles.length;

        const container = containerBottles[containerType === "reagent" ? "reagentContainer" : "amediteContainer"]?.[containerName];

        return container ? (containerType === "reagent" ? MAX_BOTTLE_PER_REAGENT_CONTAINER : MAX_BOTTLES_PER_AMEDITE_CONTAINER) - container.bottles.length : 0;
    };

    const dispatch = useDispatch();

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
        ];
    }, [containerBottles]);

    // Handle adding a new bottle
    const handleAddAmediteContainerBottle = () => {
        switch (watch("selectedContainer.type")) {
            case "reagent":
                dispatch(
                    addReagentContainerBottle({
                        bottleName: watch("bottleName"),
                        containerName: watch("selectedContainer.value") === "reagentContainer1" ? "container1" : "container2"
                    })
                );
                break;

            case "wasteContainer":
                dispatch(
                    addWasteContainerBottle({
                        bottleName: watch("bottleName")
                    })
                );
                break;

            default:
                dispatch(addAmediteContainerBottle({ bottleName: watch("bottleName"), containerName: watch("selectedContainer.value") }));
                break;
        }

        reset();
    };

    const validateUniqueBottleName = (value) => {
        // Flatten the bottles from all containers into a single array
        const allBottles = Object.values({ ...containerBottles.amediteContainer, ...containerBottles.reagentContainer }).flatMap((container) => container.bottles);

        // Check if the value already exists in any bottle
        const isUnique = !allBottles.some((bottle) => bottle.bottleName === value);

        // Return an error message if the name is not unique
        return isUnique || "Bottle name must be unique";
    };

    return (
        <div className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-3xl border border-amber-400 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Add Bottle Form */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Bottle Setup</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Bottle</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <InputField
                                name="bottleName"
                                control={control}
                                label="Bottle Name"
                                placeholder="Enter unique bottle name"
                                rules={{ required: "Bottle name is required", validate: validateUniqueBottleName }}
                            />
                        </div>

                        <div>
                            <SelectionController
                                width={544}
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
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Add Bottle
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <SingleAmediteContainer containerName="container1" />
                    <SingleAmediteContainer containerName="container2" />
                    <SingleAmediteContainer containerName="container3" />
                    <SingleAmediteContainer containerName="container1" containerType="reagent" />
                    <SingleAmediteContainer containerName="container2" containerType="reagent" />
                    <WasteContainer />
                </div>
            </div>
        </div>
    );
};

export default BottleManagementSystem;
