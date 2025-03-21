import { X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAmediteContainerBottle, removeReagentContainerBottle } from "../../../../../redux/reducers/settings/hardwareSetup";
import ConfirmationPopup from "../../../../Components/Popup/ConfirmationPopup";

export const MAX_BOTTLES_PER_AMEDITE_CONTAINER = 18;
export const MAX_BOTTLE_PER_REAGENT_CONTAINER = 18;

export default function SingleAmediteContainer(props) {
    const { containerName, containerType } = props;

    const isReagent = containerType === "reagent";

    const containerBottles = useSelector((state) => state.hardwareSetup[containerType === "reagent" ? "reagentContainer" : "amediteContainer"]?.[containerName]);

    const dispatch = useDispatch();

    const handleRemoveBottle = () => {
        isReagent
            ? dispatch(removeReagentContainerBottle({ containerName, bottleId: showDeleteConfirmationId }))
            : dispatch(removeAmediteContainerBottle({ containerName, bottleId: showDeleteConfirmationId }));
        setShowDeleteConfirmationId(null);
    };

    const [showDeleteConfirmationId, setShowDeleteConfirmationId] = useState(null);

    const getTitle = useMemo(() => {
        switch (containerName) {
            case "container1":
                if (containerType === "reagent") return "Reagent Container 1";
                return "Amedite Container 1";

            case "container2":
                if (containerType === "reagent") return "Reagent Container 2";
                return "Amedite Container 2";

            case "container3":
                return "Amedite Container 3";

            default:
                break;
        }
    }, [containerName]);

    return (
        <>
            <div
                className={`${
                    !isReagent ? "bg-gradient-to-br from-purple-50 to-purple-100" : "bg-gradient-to-r from-amber-50 to-amber-100"
                } rounded-lg border-neutral-200 border shadow-md p-6 transition-all duration-300 hover:shadow-lg`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">{getTitle} </h2>

                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {containerBottles?.bottles?.length}/{isReagent ? MAX_BOTTLE_PER_REAGENT_CONTAINER : MAX_BOTTLES_PER_AMEDITE_CONTAINER}
                    </span>
                </div>

                {containerBottles?.bottles.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 italic">No bottles added yet</div>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {containerBottles?.bottles.map((bottle, index) => (
                            <div key={index} className="flex items-center border bg-neutral-100 border-neutral-300 rounded-lg justify-between p-3 text-neutral-700 mb-2">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium text-sm truncate">{bottle.bottleName}</span>
                                </div>

                                <button onClick={() => setShowDeleteConfirmationId(bottle.id)} className="ml-2 text-black opacity-80 hover:opacity-100">
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-2 bg-indigo-600 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${(containerBottles.bottles.length / (isReagent ? MAX_BOTTLE_PER_REAGENT_CONTAINER : MAX_BOTTLES_PER_AMEDITE_CONTAINER)) * 100}%` }}
                    ></div>
                </div>
                <div className="text-right mt-1 text-xs text-gray-500">
                    {(isReagent ? MAX_BOTTLE_PER_REAGENT_CONTAINER : MAX_BOTTLES_PER_AMEDITE_CONTAINER) - containerBottles.bottles.length} spaces remaining
                </div>
            </div>

            <ConfirmationPopup
                closePopup={() => setShowDeleteConfirmationId(null)}
                isOpen={!!showDeleteConfirmationId}
                header="Delete Bottle"
                desc="Are you sure to proceed?"
                handleConfirm={handleRemoveBottle}
            />
        </>
    );
}
