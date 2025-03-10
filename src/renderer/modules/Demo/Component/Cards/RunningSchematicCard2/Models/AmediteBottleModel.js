import React, { useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { useSelector } from "react-redux";
import SingleBottle from "../Components/SingleBottle";
import BottleOperationModel from "./BottleOperationModel";
import { useFormContext } from "react-hook-form";
import { Button } from "../../../../../../Components/Buttons/Buttons";
import { ChevronRight } from "lucide-react";

export default function AmediteBottleModel(props) {
    const { amedite, onClose } = props;

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    const [showBottleOperationModel, setShowBottleOperationModel] = useState(null);

    const { setValue, watch } = useFormContext();

    const containerBottles = {
        amedite1: ameditePosition.slice(0, 9).map((el, index) => {
            return { ...el, index: index + 1 };
        }),
        amedite2: ameditePosition.slice(9, 17).map((el, index) => {
            return { ...el, index: index + 10 };
        }),
        amedite3: ameditePosition.slice(17, 24).map((el, index) => {
            return { ...el, index: index + 18 };
        })
    };

    const header = { amedite1: "Amedite Container 1", amedite2: "Amedite Container 2", amedite3: "Amedite Container 3" };

    const handleOpenValve = (volume, volumeUnit) => {
        const newValve = { valveNumber: showBottleOperationModel.index, volume, volumeUnit, valveStatus: "close" };

        setValue(`manualModeRunFlow.${amedite}.valve`, [...watch(`manualModeRunFlow.${amedite}.valve`), newValve]);

        setShowBottleOperationModel(null);
    };

    const handleSave = () => {
        onClose();
    };

    return (
        <>
            <ModelWrapper header={header[amedite]} width="w-fit" onClose={onClose}>
                <div
                    className={`border border-slate-200 rounded-lg shadow-lg h-fit w-fit gap-y-8 gap-x-12 p-6 mt-2 grid grid-cols-4 relative bg-gradient-to-br from-slate-50 to-slate-100`}
                >
                    {containerBottles[amedite].map((el, index) => {
                        const isActive = index === 2; // Just for demo purposes

                        return <SingleBottle key={index} isActive={isActive} bottleDetails={el} handleClick={() => setShowBottleOperationModel(el)} />;
                    })}
                </div>

                {/* Glowing indicator lines for active flows */}
                <div className="absolute top-1/2 left-1/4 h-0.5 w-1/2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 animate-pulse-slow"></div>

                <div className="mt-8 flex justify-end">
                    <Button
                        rightIcon={<ChevronRight size={18} />}
                        label="Save"
                        onClick={handleSave}
                        bgClassName="bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500"
                    />
                </div>
            </ModelWrapper>

            {!!showBottleOperationModel && (
                <BottleOperationModel bottleOperationDetails={showBottleOperationModel} handleOpenValve={handleOpenValve} onClose={() => setShowBottleOperationModel(null)} />
            )}
        </>
    );
}
