import React, { useEffect, useState } from "react";
import { ReactComponent as TrashIcon } from "../../../../../Assets/trash.svg";
import { useSelector } from "react-redux";
import { Selection } from "../../../../../Components/Dropdown/Dropdown";
import { getUniqueId } from "../../../../../Helpers/Constant";
import { useFormContext } from "react-hook-form";

export default function SequenceImporter() {
    const sequence = useSelector((state) => state.sequence.sequence);

    const { setValue } = useFormContext();

    const [sequenceMenuItem, setSequenceMenuItem] = useState();

    useEffect(() => {
        setSequenceMenuItem(sequence?.map((el) => ({ label: el.name, value: el })));
    }, [sequence]);

    const [selectedSequence, setSelectedSequence] = useState([]);

    const removeSelection = (id) => {
        const sequence = selectedSequence.filter((el) => el?.value?.id !== id);

        setSelectedSequence(sequence);

        setValue(
            "sequenceTemp",
            sequence.map((el) => {
                return { id: getUniqueId(), name: el.value.name, block: el.value.block, sequenceString: el.value.sequenceString };
            })
        );
    };

    const handleSelection = (option) => {
        setSelectedSequence(option);

        setValue(
            "sequenceTemp",
            option.map((el) => {
                return { id: getUniqueId(), name: el.value.name, block: el.value.block, sequenceString: el.value.sequenceString };
            })
        );
    };

    return (
        <>
            <div className="mt-4 mr-1">
                <Selection
                    onChange={(option) => handleSelection(option)}
                    menuItem={sequenceMenuItem}
                    value={selectedSequence}
                    className="w-full px-0.5"
                    placeholder="Select predefined sequence"
                    isMulti={true}
                />

                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected sequence:</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {selectedSequence?.map((el, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-md">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-800">{el.value?.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeSelection(el.value?.id)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 rounded"
                                    aria-label="Remove file"
                                >
                                    <TrashIcon size={16} stroke="red" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedSequence.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">{selectedSequence.length === 1 ? "Sequence" : "Sequences"}</h3>
                        {selectedSequence.map((el, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-md mb-2 break-words">
                                <p className="font-medium">{el.label} :</p>
                                <p className="text-sm text-gray-700">{el?.value?.block?.map((el) => el.block)?.join(" ")}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
