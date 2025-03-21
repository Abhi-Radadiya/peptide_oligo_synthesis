import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWasteContainerBottle } from "../../../../../redux/reducers/settings/hardwareSetup";
import ConfirmationPopup from "../../../../Components/Popup/ConfirmationPopup";

export const MAX_WASTE_BOTTLES = 5;

export default function WasteContainer() {
    const containerBottles = useSelector((state) => state.hardwareSetup.wasteContainer);

    const dispatch = useDispatch();

    const handleRemoveBottle = () => {
        dispatch(removeWasteContainerBottle({ bottleId: showDeleteConfirmationId }));
        setShowDeleteConfirmationId(null);
    };

    const [showDeleteConfirmationId, setShowDeleteConfirmationId] = useState(null);

    return (
        <>
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg border-neutral-200 border shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Waste Container</h2>

                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {containerBottles?.bottles?.length}/{MAX_WASTE_BOTTLES}
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
                                    <span className="font-medium text-sm truncate w-[75px]">{bottle.bottleName}</span>
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
                        style={{ width: `${(containerBottles.bottles.length / MAX_WASTE_BOTTLES) * 100}%` }}
                    ></div>
                </div>
                <div className="text-right mt-1 text-xs text-gray-500">{MAX_WASTE_BOTTLES - containerBottles.bottles.length} spaces remaining</div>
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
