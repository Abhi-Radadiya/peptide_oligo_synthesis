import React, { useEffect, useState } from "react";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";
import { useFormContext } from "react-hook-form";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import { wasteMenuItems } from "../../../../Helpers/Constant";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import SelectedSequenceBlock from "./Components/SelectedSequenceBlock";
import { ModelButton } from "../../../../Components/Buttons/Buttons";

export default function ConfigurationModel(props) {
    const { onClose } = props;

    const { control, setValue, watch, reset, handleSubmit } = useFormContext();

    const [showBlockSelectionError, setShowBlockSelectionError] = useState(false);

    const columnMenuItem = useSelector((state) => state.columnEditor.positions)?.map((el) => ({
        label: el.name,
        value: { id: el.id, volume: el.liquidVolume, flowRate: el.maxFlowRate },
    }));

    const sequence = useSelector((state) => state.sequence.sequence);

    const sequenceMenuItem = useMemo(() => {
        return sequence.map((el) => {
            return { label: `${el.name} (${el?.block?.length} block)`, value: el.id };
        });
    }, [sequence]);

    const handleSave = () => {
        if (!watch("tempSelectedBlocks") || watch("tempSelectedBlocks")?.length === 0) {
            setShowBlockSelectionError(true);
            return;
        }

        setValue("isSavedOne", true);

        // TODO need to optimize this operation cause every time it will reset the value
        setValue("columnPosition", watch("tempColumnPosition"));
        setValue("column", watch("tempColumn"));
        setValue("sequence", watch("tempSequence"));
        setValue("option", watch("tempOption"));
        setValue("resin", watch("tempResin"));
        setValue("selectedBlocks", watch("tempSelectedBlocks"));

        setValue("tempSelectBlock", new Set());

        onClose();
    };

    useEffect(() => {
        setValue("tempColumnPosition", watch("columnPosition"));
        setValue("tempColumn", watch("column"));
        setValue("tempSequence", watch("sequence"));
        setValue("tempOption", watch("option"));
        setValue("tempResin", watch("resin"));
        setValue("tempSelectedBlocks", watch("selectedBlocks"));
    }, []);

    return (
        <>
            <ModelWrapper hasOutsideClick={false} width="w-[80vw]" onClose={onClose} header="Configure synthesis">
                <div className="w-full flex flex-row items-start gap-6">
                    <div className="pt-4 space-y-6 w-1/3">
                        <SelectionController
                            menuItem={wasteMenuItems}
                            control={control}
                            name="tempColumnPosition"
                            rules={{ required: "Select column position" }}
                            label="Column Position"
                            placeholder="Select Column Position"
                        />

                        <SelectionController
                            menuItem={columnMenuItem}
                            control={control}
                            name="tempColumn"
                            rules={{ required: "Select column" }}
                            label="Column"
                            placeholder="Select Column"
                        />

                        <SelectionController
                            menuItem={sequenceMenuItem}
                            control={control}
                            name="tempSequence"
                            rules={{ required: "Select sequence" }}
                            label="Sequence"
                            placeholder="Select Sequence"
                            handleChange={() => {
                                setValue("tempSelectBlock", new Set());
                            }}
                        />

                        <div className="flex flex-col">
                            <span className="text-gray-700 leading-[17px] font-normal">Option </span>

                            <div className="flex flex-row items-center mt-2 gap-2">
                                <button
                                    className={`border px-4 py-1 transition-colors duration-300 rounded-lg ${watch("tempOption") == 3 && "bg-blue-200 border-blue-400"}`}
                                    onClick={() => setValue("tempOption", 3)}
                                >
                                    3'
                                </button>
                                <button
                                    className={`border px-4 py-1 transition-colors duration-300 rounded-lg ${watch("tempOption") == 5 && "bg-blue-200 border-blue-400"}`}
                                    onClick={() => setValue("tempOption", 5)}
                                >
                                    5'
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-700 leading-[17px] font-normal">Resin</span>

                            <div className="flex flex-row items-center mt-2 gap-2">
                                <button
                                    className={`border px-4 py-1 transition-colors duration-300 rounded-lg ${watch("tempResin") === "universal" && "bg-blue-200 border-blue-400"}`}
                                    onClick={() => setValue("tempResin", "universal")}
                                >
                                    Universal
                                </button>
                                <button
                                    className={`border px-4 py-1 transition-colors duration-300 rounded-lg ${watch("tempResin") === "standard" && "bg-blue-200 border-blue-400"}`}
                                    onClick={() => setValue("tempResin", "standard")}
                                >
                                    Standard
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-2/3 border-l pl-6 border-neutral-500">
                        <SelectedSequenceBlock setShowBlockSelectionError={setShowBlockSelectionError} />
                    </div>
                </div>

                {showBlockSelectionError && (
                    <span className="text-sm font-medium text-red-400 justify-end flex mt-2">* No block is selected please select any block to proceed! </span>
                )}
                <ModelButton
                    onCancel={() => {
                        if (!watch("isSavedOne")) {
                            setValue("tempSelectedBlocks", new Set());
                            reset();
                        }
                        onClose();
                    }}
                    handleSave={handleSubmit(handleSave)}
                />
            </ModelWrapper>
        </>
    );
}
