import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { ERROR } from "../../Helpers/Icons";
import { closeToast, openToast } from "../../../redux/reducers/toastStateReducer/toastStateReducer";

const classStr = "border border-neutral-300 rounded-lg px-4 py-2 mx-4 w-[75vw] my-6";

const availableString = ["fC", "fU", "fUu", "fWu", "G", "T", "C", "cc", "Tt", "cG", "mA", "A", "mC"];

function App() {
    const [areaValue, setAreaValue] = useState("");
    const [tempValue, setTempValue] = useState("");
    const dispatch = useDispatch();

    // Validation logic
    const validateInput = useCallback(
        debounce((value) => {
            const blocks = value.split(" ");
            const invalidBlocks = blocks.filter((block) => block && !availableString.includes(block));

            if (invalidBlocks.length > 0) {
                dispatch(openToast({ text: `Invalid ${invalidBlocks.length} blocks: ${invalidBlocks.join(", ")}`, icon: ERROR }));
            } else {
                setAreaValue(value); // Update areaValue only if validation passes
                dispatch(closeToast()); // Close any active toasts if the input is valid
            }
        }, 1000), // Debounce delay of 1 second
        [dispatch]
    );

    const handleChange = (value) => {
        setTempValue(value); // Temporarily update the input while user types
        validateInput(value); // Trigger debounced validation
    };

    return (
        <div>
            {availableString.map((el, index) => (
                <span key={index} className="px-6">
                    {el}
                </span>
            ))}

            <hr />

            <textarea value={tempValue} onChange={(e) => handleChange(e.target.value)} className={classStr} rows={20} />
        </div>
    );
}

export default App;
