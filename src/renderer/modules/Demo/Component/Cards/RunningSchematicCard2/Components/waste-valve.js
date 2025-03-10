import { ToggleRight } from "lucide-react";
import React from "react";
import { ControlledSwitch } from "../../../../../../Components/FormController/Switch";
import { useFormContext } from "react-hook-form";
import { PipeFlow } from "./pipe-flow";

export default function WasteValve(props) {
    const { pipeState } = props;

    const { control } = useFormContext();

    return (
        <>
            {/* Waste Valve 2 */}
            <div className="w-52 h-16 border border-blue-200 bg-gradient-to-r z-10 from-blue-100 to-neutral-50 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 absolute left-[1050px] top-[550px]">
                <div className="flex items-center gap-4">
                    <ToggleRight className="text-blue-600" size={22} />
                    <span className="text-center font-medium text-slate-700 text-sm">Waste Valve</span>
                    <ControlledSwitch control={control} name="manualModeRunFlow.wasteValve" checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                </div>
            </div>

            {/* flow between waste valve and RG valve*/}
            <PipeFlow className={`z-[1] h-[87px] border border-neutral-500 bg-neutral-50 top-[482px] left-[1160px] w-2`} isVertical is_flowing={pipeState.rgValveWasteValve} />
        </>
    );
}
