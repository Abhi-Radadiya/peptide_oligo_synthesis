import React, { useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { useSelector } from "react-redux";
import SingleBottle from "../Components/SingleBottle";
import { Button } from "../../../../../../Components/Buttons/Buttons";
import { ChevronRight } from "lucide-react";
import BottleOperationModel from "./BottleOperationModel";
import { useFormContext } from "react-hook-form";

export default function ReagentModel(props) {
    const { onClose, reagentContainer } = props;

    const selectedReagentContainer = reagentContainer === 1 ? "reagent1" : "reagent2";

    const reagents = useSelector((state) => state.bottleMapping.solvent);

    const indexedReagents = reagents.map((el, index) => {
        return { ...el, index: index + 1 };
    });

    const { setValue, watch } = useFormContext();

    const [showBottleOperationModel, setShowBottleOperationModel] = useState(false);

    const handleOpenValve = (volume, volumeUnit) => {
        const newValve = { valveNumber: showBottleOperationModel.index, volume, volumeUnit, valveStatus: "close" };

        setValue(`manualModeRunFlow.${selectedReagentContainer}.valve`, [...watch(`manualModeRunFlow.${selectedReagentContainer}.valve`), newValve]);

        setShowBottleOperationModel(null);
    };

    // TODO : add temp saving option instead direct saving
    const handleNext = () => {};

    return (
        <>
            <ModelWrapper header={`Reagent ${reagentContainer}`} width="w-fit" onClose={onClose}>
                <div className={`border border-neutral-300 rounded-lg shadow-lg h-fit gap-y-4 gap-x-12 w-fit p-3 mt-2 grid grid-cols-4 relative`}>
                    {indexedReagents.map((el, index) => {
                        const activeBottleData = false;

                        return <SingleBottle isActive={!!activeBottleData} key={index} bottleDetails={el} handleClick={() => setShowBottleOperationModel(el)} />;
                    })}
                </div>

                <div className="mt-4 flex justify-end">
                    <Button rightIcon={<ChevronRight />} label="Next" onClick={handleNext} bgClassName="bg-blue-300" />
                </div>
            </ModelWrapper>

            {showBottleOperationModel && (
                <BottleOperationModel bottleOperationDetails={showBottleOperationModel} handleOpenValve={handleOpenValve} onClose={() => setShowBottleOperationModel(null)} />
            )}
        </>
    );
}
