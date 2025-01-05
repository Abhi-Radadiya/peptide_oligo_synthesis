import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import { wasteMenuItems } from "../../../../Helpers/Constant";
import RadioButton from "../../../../Components/FormController/RadioButton";
import SelectedSequence from "../SelectedSequence";
import OptionDetailsModel from "../../Model/OptionDetailsModel";

export default function OptionSelection() {
    const { control, watch } = useFormContext();

    const radio3 = [
        { label: "3'", value: "3" },
        { label: "5'", value: "5" },
    ];

    const resinOption = [
        { label: "Standard", value: "standard" },
        { label: "Universal", value: "universal" },
    ];

    const columnEditor = useSelector((state) => state.columnEditor.positions);

    const sequence = useSelector((state) => state.sequence.sequence);

    const containerMenuItem = columnEditor.map((el) => ({ value: el.id, label: el.name }));

    const sequenceMenuItem = sequence.map((el) => ({ value: el.id, label: el.name }));

    const [showOptionDetailsModel, setShowOptionDetailsModel] = useState(false);

    const selectedSequence = sequence.find((el) => el.id === watch("sequence")?.value);

    return (
        <>
            <div className="pr-4 mr-4 w-full">
                <div className="grid grid-cols-3 gap-6 mb-4 pb-4 border-b border-neutral-300">
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
                </div>

                {selectedSequence && <SelectedSequence selectedSequence={selectedSequence} />}
            </div>

            {!!showOptionDetailsModel.model && <OptionDetailsModel type={showOptionDetailsModel.model} onClose={() => setShowOptionDetailsModel({ model: null })} />}
        </>
    );
}
