import { Droplets, ToggleRight } from "lucide-react";
import React, { useState } from "react";
import { ControlledSwitch } from "../../../../../../Components/FormController/Switch";
import { PipeFlow } from "./pipe-flow";
import { useFormContext } from "react-hook-form";
import ColumnSelectionModel from "../Models/column-selection-model";
import ColumnBypassValveInformationModel from "../Models/column-bypass-valve-information-model";

export default function ColumnWithValve(props) {
    const { pipeState } = props;

    const { control } = useFormContext();

    const [showColumnSelectionModel, setShowColumnSelectionModel] = useState(false);

    const [showColumnBypassValveInformationModel, setShowColumnBypassValveInformationModel] = useState(false);

    const handleToggleTopValve = (isToggle) => {
        if (isToggle) {
            setTimeout(() => {
                setShowColumnBypassValveInformationModel(true);
            }, 1000);
        }
    };

    return (
        <>
            <div className="w-52 h-16 z-[10] border border-blue-200 bg-gradient-to-r from-blue-100 to-neutral-50 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 absolute left-[730px] top-[330px]">
                <div className="flex items-center gap-4">
                    <ToggleRight className="text-blue-600" size={22} />
                    <span className="text-center font-medium text-slate-700 text-sm">Top Valve</span>
                    <ControlledSwitch
                        handleToggle={handleToggleTopValve}
                        control={control}
                        name="manualModeRunFlow.columnTopValveEnable"
                        checkedBgColor="checked:bg-blue-500"
                        offBgColor="bg-slate-200"
                    />
                </div>
            </div>
            {/* Column */}
            <PipeFlow className="w-[24px] z-[1] h-2 top-[401px] left-[816px] border rotate-90 border-neutral-500 bg-neutral-50" is_flowing={pipeState?.topValveColumn} />
            {/* top to bottom bypass valve */}
            <div
                className="absolute left-[770px] top-[415px] h-40 w-32 z-[10] border-2 bg-gradient-to-b from-purple-50 to-purple-100 border-purple-200 shadow-lg rounded-lg cursor-pointer flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105"
                onClick={() => setShowColumnSelectionModel(true)}
            >
                <Droplets className="mb-2 text-purple-600" size={28} />
                <span className="flex items-center text-center text-base font-medium text-slate-700">Column</span>
                <div className="absolute h-3/4 w-2/3 bottom-4 bg-gradient-to-b from-purple-200 to-purple-300 rounded opacity-30"></div>
            </div>
            <PipeFlow className="w-[24px] z-[1] h-2 top-[581px] left-[826px] border rotate-90 border-neutral-500 bg-neutral-50" is_flowing={pipeState?.columnLS1} />
            {/* Bottom Valve */}
            <div className="w-52 h-16 border border-blue-200 z-10 bg-gradient-to-r from-blue-100 to-neutral-50 rounded-lg shadow-lg flex justify-center items-center transition-all duration-300 hover:shadow-xl hover:scale-105 absolute left-[740px] top-[710px]">
                <div className="flex items-center gap-4">
                    <ToggleRight className="text-blue-600" size={22} />
                    <span className="text-center font-medium text-slate-700 text-sm">Bot. Valve</span>
                    <ControlledSwitch control={control} name="manualModeRunFlow.columnBottomValveEnable" checkedBgColor="checked:bg-blue-500" offBgColor="bg-slate-200" />
                </div>
            </div>
            {/* bottom valve waste valve */}
            <BypassFlowPipe isFlowing={pipeState?.columnBypass} />

            {showColumnSelectionModel && <ColumnSelectionModel onClose={() => setShowColumnSelectionModel(false)} />}

            {showColumnBypassValveInformationModel && <ColumnBypassValveInformationModel onClose={() => setShowColumnBypassValveInformationModel(false)} />}
        </>
    );
}

const BypassFlowPipe = (props) => {
    const { isFlowing } = props;

    return (
        <>
            <PipeFlow className="w-[64px] z-[1] h-2 top-[359px] left-[667px] rotate-180 border border-neutral-500 bg-neutral-50" is_flowing={isFlowing} />
            <PipeFlow className="h-[375px] z-[1] w-2 top-[366px] left-[667px] border-x border-y-0 border-neutral-500 bg-neutral-50" is_flowing={isFlowing} isVertical />
            <PipeFlow className="w-[75px] h-2 top-[740px] left-[667px] border border-neutral-500 bg-neutral-50" is_flowing={isFlowing} />
        </>
    );
};
