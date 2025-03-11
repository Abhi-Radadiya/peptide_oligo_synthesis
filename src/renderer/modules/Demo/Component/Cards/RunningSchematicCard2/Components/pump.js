import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openToast } from "../../../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { FILE_WARNING } from "../../../../../../Helpers/Icons";
import { Power } from "lucide-react";
import { PipeFlow } from "./pipe-flow";
import PumpModel from "../Models/pump-model";
import "./styles.css";

export default function Pump(props) {
    const { pipeState, positionClassName, pumpNumber, pipePositionClassName } = props;

    const pumpName = pumpNumber === 1 ? "pump1" : "pump2";

    const pipeFlowName = pumpNumber === 1 ? "pump1ls5" : "pump2ls4";

    const dispatch = useDispatch();

    const { watch } = useFormContext();

    const [showPumpModel, setShowPumpModel] = useState(false);

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
            {/* Pump 1 */}
            <div
                className={`rounded-full h-32 w-32 border-teal-400 absolute z-10 cursor-pointer shadow-lg border-2 bg-gradient-to-r from-teal-50 to-teal-100 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 ${positionClassName}`}
                onClick={() => handleClickPump(pumpName)}
            >
                <div className="absolute inset-3 rounded-full border-2 border-dashed border-teal-300 animate-spin-slow"></div>
                <Power className="mb-1 text-teal-600" size={28} />
                <span className="flex items-center text-center text-base font-medium text-slate-700">Pump {pumpNumber}</span>
                <div className="text-xs font-medium text-teal-600 mt-1">
                    {watch(`manualModeRunFlow.${pumpName}.flowRate`) ? watch(`manualModeRunFlow.${pumpName}.flowRate`) + " mL/min" : "Empty"}
                </div>
            </div>

            {/* pump2ls4 */}
            <PipeFlow className={`z-[1] h-2 border border-neutral-500 bg-neutral-50 ${pipePositionClassName}`} is_flowing={pipeState?.[pipeFlowName]} />

            {!!showPumpModel && <PumpModel pumpNumber={showPumpModel} onClose={() => setShowPumpModel(null)} />}
        </>
    );
}
