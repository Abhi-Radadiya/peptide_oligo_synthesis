import React, { useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { closeToast, openToast } from "../../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ERROR } from "../../../../../Helpers/Icons";
import { findAmediteLabel } from "../../../../../Helpers/Constant";

export default function TextArea(props) {
    const { index, textAreaRef, handleSelection } = props;

    const {
        control,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const textAreaName = index !== undefined ? `sequence.${index}.sequenceString` : "sequenceString";

    const handleChange = (enterValue) => {
        dispatch(closeToast());

        setValue(textAreaName, enterValue);

        validateInput(enterValue); // Trigger debounced validation
    };

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    const amediteList = useSelector((state) => state.amedite.amediteList);

    const bottleMappingAmediteArray = useMemo(() => {
        return [...new Set([...ameditePosition.map((el) => findAmediteLabel(amediteList, el.value)).filter((el) => !!el)])]; // get all label => filter defined value => remove duplicate entries
    }, [ameditePosition, amediteList]);

    const dispatch = useDispatch();

    const validateBlock = (value) => {
        const blocks = value.split(" ");

        const invalidBlock = blocks.filter((block) => block && !bottleMappingAmediteArray.includes(block));

        return invalidBlock;
    };

    // Validation logic
    const validateInput = useCallback(
        debounce((value) => {
            const invalidBlock = validateBlock(value);

            if (invalidBlock.length > 0) {
                dispatch(openToast({ text: `Invalid ${invalidBlock.length} sequence blocks.`, icon: ERROR }));
                setError(textAreaName, { message: "Please enter valid sequence" });
                setError("invalidSequenceBlock", { invalidBlock });
            } else {
                clearErrors([textAreaName, "invalidSequenceBlock"]);
                dispatch(closeToast()); // Close any active toasts if the input is valid
            }
        }, 500), // Debounce delay of 0.5 second
        [dispatch]
    );

    console.log("errors as=:= ", errors);

    return (
        <>
            <Controller
                key={index}
                control={control}
                name={textAreaName}
                rules={{
                    required: "Sequence can't be empty, enter sequence",
                    validate: (value) => {
                        return !!errors?.invalidSequenceBlock ? "Please enter valid sequence" : null;
                    },
                }}
                render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                        <textarea
                            {...field}
                            onChange={(e) => handleChange(e.target.value)}
                            value={field.value ?? ""}
                            placeholder="Enter sequence here"
                            rows={index !== undefined ? 20 : 22}
                            className={`shadow appearance-none border border-neutral-400 scrollbar-style rounded-lg w-full py-2 px-3 text-neutral-700 focus:outline-none focus:shadow-outline ${
                                error ? "border-red-500 placeholder:text-red-500" : "border-gray-300"
                            }`}
                            ref={textAreaRef}
                            onSelect={handleSelection}
                        />

                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                    </div>
                )}
            />
        </>
    );
}
