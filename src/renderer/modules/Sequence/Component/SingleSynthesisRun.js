import React, { useState } from "react";
import { SelectionController } from "../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import { methodOption, wasteMenuItems } from "../../MethodSetup2/Constant";
import RadioButton from "../../../Components/FormController/RadioButton";
import { useSelector } from "react-redux";
import { useWindowSize } from "@uidotdev/usehooks";
import SelectedSequence from "./SelectedSequence";
import OptionDetailsModel from "../Model/OptionDetailsModel";

export default function SingleSynthesisRun() {
    const { control, watch } = useFormContext();

    const radio3 = [
        { label: "3'", value: "3" },
        { label: "5'", value: "5" },
    ];

    const resinOption = [
        { label: "Standard", value: "standard" },
        { label: "Universal", value: "universal" },
    ];

    const modeRadioButton = [
        { label: "Auto", value: "auto" },
        { label: "Manual", value: "manual" },
    ];

    const columnEditor = useSelector((state) => state.columnEditor.positions);

    const sequence = useSelector((state) => state.sequence.sequence);

    const containerMenuItem = columnEditor.map((el) => ({ value: el.id, label: el.name }));

    const sequenceMenuItem = sequence.map((el) => ({ value: el.id, label: el.name }));

    const [showOptionDetailsModel, setShowOptionDetailsModel] = useState(false);

    const { height: windowHeight } = useWindowSize();

    const selectedSequence = sequence.find((el) => el.id === watch("sequence")?.value);

    return (
        <>
            <div className="pr-4 mr-4 border-r border-neutral-500 w-full max-w-[40vw]" style={{ height: windowHeight - 36 }}>
                <div className="flex flex-row justify-between border-b pb-4 mb-6 items-center">
                    <h2 className="text-xl font-bold text-gray-800">Synthesis Run</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 pb-4 border-b border-neutral-300">
                    <div>
                        <label htmlFor="columnNo" className="block text-sm font-semibold text-gray-700 mb-2">
                            Column Position
                        </label>

                        <SelectionController
                            control={control}
                            height={44}
                            name="columnPosition"
                            placeholder="Select column position"
                            isClearable={false}
                            menuItem={wasteMenuItems}
                            rules={{ required: "Please select column position" }}
                        />
                    </div>

                    <div>
                        <label htmlFor="column" className="block text-sm font-semibold text-gray-700 mb-2">
                            Column
                        </label>
                        <SelectionController
                            control={control}
                            height={44}
                            name="column"
                            placeholder="Select column"
                            isClearable={false}
                            menuItem={containerMenuItem}
                            rules={{ required: "Please select column" }}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="sequence" className="block text-sm font-semibold text-gray-700 mb-2">
                            Sequence
                        </label>

                        <SelectionController
                            control={control}
                            menuItem={sequenceMenuItem}
                            height={44}
                            name="sequence"
                            placeholder="Select sequence"
                            rules={{ required: "Please select sequence" }}
                        />
                    </div>

                    <RadioButton
                        indication="Details"
                        handleIndicationClick={() => setShowOptionDetailsModel({ model: "option" })}
                        buttons={radio3}
                        control={control}
                        name="option"
                        header="Option"
                    />

                    <RadioButton
                        indication="Details"
                        handleIndicationClick={() => setShowOptionDetailsModel({ model: "resin" })}
                        header="Resin"
                        buttons={resinOption}
                        control={control}
                        name="resinOption"
                    />
                    <RadioButton buttons={modeRadioButton} control={control} name="mode" header="Mode" />

                    {watch("mode") === "manual" && (
                        <div className="">
                            <label htmlFor="column" className="block text-sm font-semibold text-gray-700 mb-2">
                                Method Option
                            </label>

                            <SelectionController
                                control={control}
                                height={44}
                                name="manualMethodOption"
                                placeholder="Select method option"
                                menuItem={methodOption}
                                rules={{ required: "Please select option" }}
                            />
                        </div>
                    )}
                </div>

                {selectedSequence && <SelectedSequence selectedSequence={selectedSequence} />}
            </div>

            {!!showOptionDetailsModel.model && <OptionDetailsModel type={showOptionDetailsModel.model} onClose={() => setShowOptionDetailsModel({ model: null })} />}
        </>
    );
}
