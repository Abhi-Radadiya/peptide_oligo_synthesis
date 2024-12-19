import React from "react";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";
import { useFormContext } from "react-hook-form";
import RadioButton from "../../../../Components/FormController/RadioButton";

export default function ConfirmGenerateBlock(props) {
    const { onClose, setSequenceString } = props;

    const { control } = useFormContext();

    const radioButtons = [
        { label: "1 per block", value: "1" },
        { label: "3 per block", value: "3" },
    ];

    const generateBlock = () => {
        setSequenceString();
        onClose();
    };

    return (
        <>
            <ModelWrapper
                width="w-[40%] relative"
                header="Generate block"
                desc={`Are you sure want to generate new blocks? You will loose previously assign method !`}
                onClose={() => onClose()}
            >
                <span className="font-medium text-neutral-700">Type of sequence </span>

                <RadioButton className="mt-1 max-w-[50%]" buttons={radioButtons} control={control} name="blockOption" />

                <div className="flex justify-end space-x-3 mt-12">
                    <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none">
                        Cancel
                    </button>

                    <button
                        onClick={generateBlock}
                        className="bg-amber-200 text-neutral-700 px-4 py-2 rounded-lg hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    >
                        Generate block
                    </button>
                </div>
            </ModelWrapper>
        </>
    );
}
