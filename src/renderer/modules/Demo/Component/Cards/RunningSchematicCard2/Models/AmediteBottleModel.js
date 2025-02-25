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
        }),
    };

    const header = { amedite1: "Amedite Container 1", amedite2: "Amedite Container 2", amedite3: "Amedite Container 3" };

    const handleOpenValve = (volume, volumeUnit) => {
        const newValve = { valveNumber: showBottleOperationModel.index, volume, volumeUnit, valveStatus: "close" };

        setValue(`manualModeRunFlow.${amedite}.valve`, [...watch(`manualModeRunFlow.${amedite}.valve`), newValve]);

        setShowBottleOperationModel(null);
    };

    const handleNext = () => {};

    return (
        <>
            <ModelWrapper header={header[amedite]} width="w-fit" onClose={onClose}>
                <div className={`border border-neutral-300 rounded-lg shadow-lg h-fit w-fit gap-y-4 gap-x-12 p-3 mt-2 grid grid-cols-4 relative`}>
                    {containerBottles[amedite].map((el, index) => {
                        const activeBottleData = false;

                        return <SingleBottle isActive={!!activeBottleData} key={index} bottleDetails={el} handleClick={() => setShowBottleOperationModel(el)} />;
                    })}
                </div>

                <div className="mt-6 flex justify-end">
                    <Button rightIcon={<ChevronRight />} label="Next" onClick={handleNext} bgClassName="bg-blue-300" />
                </div>
            </ModelWrapper>

            {!!showBottleOperationModel && (
                <BottleOperationModel bottleOperationDetails={showBottleOperationModel} handleOpenValve={handleOpenValve} onClose={() => setShowBottleOperationModel(null)} />
            )}
        </>
    );
}
