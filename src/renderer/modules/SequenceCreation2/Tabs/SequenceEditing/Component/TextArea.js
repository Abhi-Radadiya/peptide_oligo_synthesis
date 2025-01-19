// const availabelBlocks = ["fA", "fC", "fU", "A", "T", "mA", "C", "mT"];

// const yy = "fA fC ACmXAfUZ fC";

// const xsx = ["fA", "fC", "A", "C", "mA", "fU", "fC"];

import React, { useEffect, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { debounce } from "lodash";

export default function TextArea() {
    const { control, setValue, clearErrors, setError } = useFormContext();
    const availableBlocks = ["fA", "fC", "fU", "A", "T", "mA", "C", "mT"];

    const maxBlockLength = Math.max(...availableBlocks.map((block) => block.length));

    const validateAndFormatSequence = (inputString) => {
        const trimmedString = inputString.replaceAll(" ", "");
        const result = [];
        let currentPos = 0;
        let isValid = true;
        let invalidBlocks = [];

        while (currentPos < trimmedString.length) {
            let matchFound = false;

            for (let length = Math.min(maxBlockLength, trimmedString.length - currentPos); length > 0; length--) {
                const currentBlock = trimmedString.substr(currentPos, length);
                if (availableBlocks.includes(currentBlock)) {
                    result.push(currentBlock);
                    currentPos += length;
                    matchFound = true;
                    break;
                }
            }

            if (!matchFound) {
                let invalidBlock = "";
                for (let i = currentPos; i < trimmedString.length; i++) {
                    invalidBlock += trimmedString[i];
                    if (availableBlocks.some((block) => block.startsWith(invalidBlock))) {
                        break;
                    }
                }
                invalidBlocks.push(invalidBlock);
                isValid = false;
                break;
            }
        }

        return {
            isValid,
            result,
            errorMessage: isValid
                ? null
                : `Please add valid input string cause ${invalidBlocks.join(", ")} ${invalidBlocks.length > 1 ? "are" : "is"} invalid block${
                      invalidBlocks.length > 1 ? "s" : ""
                  }`,
        };
    };

    const handleChange = useCallback(
        (textAreaSequenceString) => {
            setValue("textAreaSequenceString", textAreaSequenceString);
            debouncedHandleChange(textAreaSequenceString);
        },
        [setValue]
    );

    const formateSetSequence = (entredSequence) => {
        const sequence = entredSequence.map((el) => ({ block: el, method: null }));

        setValue("sequence", sequence);
    };

    const formateSequenceString = (string) => {
        const { isValid, result, errorMessage } = validateAndFormatSequence(string);

        if (isValid) {
            setValue("formattedSequence", result);

            formateSetSequence(result);

            clearErrors("textAreaSequenceString");
        } else {
            setError("textAreaSequenceString", { message: errorMessage });
        }
    };

    const debouncedHandleChange = useCallback(debounce(formateSequenceString, 1000), [formateSequenceString]);

    useEffect(() => {
        return () => {
            debouncedHandleChange.cancel();
        };
    }, [debouncedHandleChange]);

    return (
        <>
            <Controller
                control={control}
                name="textAreaSequenceString"
                rules={{
                    required: "Sequence can't be empty, enter sequence",
                }}
                render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                        <textarea
                            {...field}
                            onChange={(e) => handleChange(e.target.value)}
                            value={field.value ?? ""}
                            placeholder="Enter sequence here"
                            rows={22}
                            className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-neutral-700 focus:outline-none focus:shadow-outline ${
                                error ? "border-red-500 placeholder:text-red-500" : "border-neutral-400"
                            }`}
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                    </div>
                )}
            />
        </>
    );
}
