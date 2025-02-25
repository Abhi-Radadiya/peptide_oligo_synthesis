import React, { useState } from "react";
import AmediteBottleModel from "./Models/AmediteBottleModel";
import ReagentModel from "./Models/ReagentModel";
import ColumnSelectionModel from "./Models/column-selection-model";
import WasteBlockSelectionModel from "./Models/waste-block-selection-model.js";

import PumpModel from "./Models/pump-model";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openToast } from "../../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { FILE_WARNING } from "../../../../../Helpers/Icons";
import ToggleSwitch from "../../../../../Components/FormController/Switch";

export default function RunningSchematicCard2() {
    const { watch } = useFormContext();

    const dispatch = useDispatch();

    const [showAmediteBottleModel, setShowAmediteBottleModel] = useState(null);

    const [showReagentModel, setShowReagentModel] = useState(false);

    const [showColumnSelectionModel, setShowColumnSelectionModel] = useState(false);

    const [showPumpModel, setShowPumpModel] = useState(false);

    const [showWasteBlockSelectionModel, setShowWasteBlockSelectionModel] = useState(false);

    const handleClickPump = (pumpNumber) => {
        const selectedColumnId = watch("manualModeRunFlow.column.columnDetails.id");

        if (!selectedColumnId) {
            dispatch(openToast({ text: `Please select column first to select pump flow rate`, icon: FILE_WARNING }));

            return;
        }

        setShowPumpModel(pumpNumber);
    };

    return (
        <>
            <div className="w-fit border border-neutral-300 rounded-lg p-6 flex mx-auto flex-col">
                <div className="flex flex-row w-full mx-auto justify-between">
                    <div
                        className="border border-neutral-400 rounded-lg shadow-md h-32 w-32 mt-8 flex justify-center cursor-pointer"
                        onClick={() => setShowAmediteBottleModel("amedite1")}
                    >
                        <span className="flex items-center text-center text-base text-neutral-700">Amedite 1</span>
                    </div>

                    <div
                        className="border border-neutral-400 rounded-lg shadow-md h-32 w-32 flex justify-center cursor-pointer"
                        onClick={() => setShowAmediteBottleModel("amedite2")}
                    >
                        <span className="flex items-center text-center text-base text-neutral-700">Amedite 2</span>
                    </div>

                    <div
                        className="border border-neutral-400 rounded-lg shadow-md h-32 w-32 mt-8 flex justify-center cursor-pointer"
                        onClick={() => setShowAmediteBottleModel("amedite3")}
                    >
                        <span className="flex items-center text-center text-base text-neutral-700">Amedite 3</span>
                    </div>
                </div>

                <div className="flex flex-row items-start mt-4 justify-between mx-auto w-full">
                    <div
                        className="border border-amber-200 rounded-lg h-28 w-32 shadow-md flex justify-center bg-yellow-100 cursor-pointer -skew-x-[15deg]"
                        onClick={() => setShowReagentModel(1)}
                    >
                        <span className="flex items-center text-center text-base text-neutral-700 skew-x-[15deg]">Reagent 1</span>
                    </div>

                    <div
                        className="rounded-full h-28 w-28 border-green-400 cursor-pointer shadow-md border bg-green-200 flex justify-center mt-6"
                        onClick={() => handleClickPump(1)}
                    >
                        <span className="flex items-center text-center text-base text-neutral-700">Pump 1</span>
                    </div>

                    <div className="w-32" />
                </div>

                <div
                    className="h-36 w-28 border bg-purple-100 border-purple-300 shadow-md rounded-lg cursor-pointer mx-auto mt-8 flex justify-center"
                    onClick={() => setShowColumnSelectionModel(true)}
                >
                    <span className="flex items-center text-center text-base text-neutral-700">Column</span>
                </div>

                <div
                    className="rounded-full h-28 w-28 border-green-400 cursor-pointer mx-auto mt-8 shadow-md border bg-green-200 flex justify-center"
                    onClick={() => handleClickPump(2)}
                >
                    <span className="flex items-center text-center text-base text-neutral-700">Pump 2</span>
                </div>

                <div className="flex flex-row items-center justify-between mt-8">
                    <div
                        className="border border-amber-200 rounded-lg h-28 w-32 shadow-md flex justify-center bg-yellow-100 cursor-pointer -skew-x-[15deg]"
                        onClick={() => setShowReagentModel(2)}
                    >
                        <span className="flex items-center text-center text-base text-neutral-700 skew-x-[15deg]">Reagent 2</span>
                    </div>

                    <div className="w-48 h-16 border border-[#b5baff] bg-[#c6ddf5] rounded-lg shadow-lg flex justify-center">
                        <div className="flex items-center gap-4">
                            <span className="text-center text-base text-neutral-700">RG Valve</span>
                            <ToggleSwitch checkedBgColor="checked:bg-blue-500" offBgColor="bg-white" />
                        </div>
                    </div>

                    <div className="w-32" />
                </div>

                <div className="flex flex-row items-center justify-between gap-16 mt-8">
                    <div
                        className="border border-[#95f5f0] rounded-l-full rounded-r-full h-20 w-32 shadow-md flex justify-center bg-[#95f5f0] cursor-pointer"
                        onClick={() => setShowWasteBlockSelectionModel(true)}
                    >
                        <span className="flex items-center text-center text-base text-neutral-700">Waste Column</span>
                    </div>

                    <div className="w-48 h-16 border border-[#b5baff] bg-[#c6ddf5] rounded-lg shadow-lg flex justify-center">
                        <div className="flex items-center gap-4">
                            <span className="text-center text-base text-neutral-700">Waste Valve</span>
                            <ToggleSwitch checkedBgColor="checked:bg-blue-500" offBgColor="bg-white" />
                        </div>
                    </div>

                    <div className="w-32" />
                </div>
            </div>

            {!!showAmediteBottleModel && <AmediteBottleModel amedite={showAmediteBottleModel} onClose={() => setShowAmediteBottleModel(null)} />}

            {!!showReagentModel && <ReagentModel reagentContainer={showReagentModel} onClose={() => setShowReagentModel(null)} />}

            {!!showPumpModel && <PumpModel pumpNumber={showPumpModel} onClose={() => setShowPumpModel(null)} />}

            {showColumnSelectionModel && <ColumnSelectionModel onClose={() => setShowColumnSelectionModel(false)} />}

            {showWasteBlockSelectionModel && <WasteBlockSelectionModel onClose={() => setShowWasteBlockSelectionModel(false)} />}
        </>
    );
}
