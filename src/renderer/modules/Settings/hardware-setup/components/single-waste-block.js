import React, { useEffect, useRef, useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import InputField from "../../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { removeWasteContainerBottle, updateWasteContainerValve } from "../../../../../redux/reducers/settings/hardwareSetup";
import ConfirmationPopup from "../../../../Components/Popup/ConfirmationPopup";

export default function SingleWasteBlock(props) {
    const { bottle, index } = props;

    const [isModify, setIsModify] = useState(false);

    const inputRef = useRef(null);

    const { control, handleSubmit, setValue, watch } = useForm({});

    const [showDeleteConfirmationId, setShowDeleteConfirmationId] = useState(null);

    const containerBottles = useSelector((state) => state.hardwareSetup);

    const inputName = `bottleName.wasteContainer.${index}`;

    const validateUniqueBottleName = (value) => {
        // Flatten the bottles from all containers into a single array
        const allBottles = Object.values({ ...containerBottles.amediteContainer, ...containerBottles.reagentContainer }).flatMap((container) => container.bottles);

        // Check if the value already exists in any bottle
        const isUnique = !allBottles.some((bottle) => bottle.bottleName === value);

        // Return an error message if the name is not unique
        return isUnique || "Bottle name must be unique";
    };

    useEffect(() => {
        if (isModify && !!inputRef.current) {
            inputRef.current.focus();
        }
    }, [isModify]);

    const handleModify = () => {
        setValue(inputName, bottle.bottleName);
        setIsModify(true);
    };

    const dispatch = useDispatch();

    const handleSaveName = (data) => {
        dispatch(updateWasteContainerValve({ bottleName: watch(inputName), bottleId: bottle.id }));

        setIsModify(false);
    };

    const handleRemoveBottle = () => {
        dispatch(removeWasteContainerBottle({ bottleId: showDeleteConfirmationId }));
        setShowDeleteConfirmationId(null);
    };

    return (
        <>
            <div className="flex items-center border bg-neutral-100 border-neutral-300 rounded-lg justify-between p-3 text-neutral-700 mb-2">
                <div className="flex items-center flex-1 min-w-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    {isModify ? (
                        <InputField
                            name={inputName}
                            control={control}
                            placeholder="Enter unique bottle name"
                            rules={{ required: "Bottle name is required", validate: validateUniqueBottleName }}
                            inputRef={inputRef}
                            wrapperClassName="w-full"
                        />
                    ) : (
                        <span className="font-normal text-sm">
                            Name : <strong className="">{bottle?.bottleName}</strong>
                        </span>
                    )}

                    <strong className="mx-4">|</strong>

                    <span className="font-normal text-sm flex-shrink-0">
                        Valve : <strong>{bottle?.valve?.index}</strong>
                    </span>
                </div>

                {isModify ? (
                    <>
                        <button
                            onClick={handleSubmit(handleSaveName)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-green-300"
                        >
                            <Check className="h-5 w-5 text-green-500" />
                        </button>
                        <button
                            onClick={() => setIsModify(false)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-red-300"
                        >
                            <X className="h-5 w-5 text-red-500" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleModify}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-blue-300"
                        >
                            <Pencil className="h-5 w-5 text-blue-700" />
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirmationId(bottle.id)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-red-300"
                        >
                            <Trash2 className="h-5 w-5 text-red-500" />
                        </button>
                    </>
                )}
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
