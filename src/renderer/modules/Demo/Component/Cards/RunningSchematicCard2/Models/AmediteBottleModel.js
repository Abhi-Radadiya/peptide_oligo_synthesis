import React, { useRef, useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { useSelector } from "react-redux";
import SingleBottle from "../Components/SingleBottle";
import BottleOperationModel from "./BottleOperationModel";

class ValveManager {
    constructor(setStateCallback) {
        this.entries = [];
        this.setStateCallback = setStateCallback; // Store the callback
    }

    addEntry(bottleDetail, time) {
        const entry = { bottleDetail, time, timestamp: Date.now() };

        this.entries.push(entry);
        this.setStateCallback([...this.entries]); // Update React state

        if (time === "auto") {
            return;
        }

        setTimeout(() => {
            this.removeEntry(entry.bottleDetail.index);
        }, time);
    }

    removeEntry(index) {
        this.entries = this.entries.filter((e) => {
            return e.bottleDetail.index !== index;
        });
        this.setStateCallback([...this.entries]); // Update React state
    }

    getEntries() {
        return this.entries;
    }
}

export default function AmediteBottleModel(props) {
    const { amedite, onClose } = props;

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    const [showBottleOperationModel, setShowBottleOperationModel] = useState(null);

    const [openValveDetails, setOpenValveDetails] = useState([]);

    const valveManagerRef = useRef(new ValveManager(setOpenValveDetails));

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

    const handleOpenValve = (time) => {
        valveManagerRef.current.addEntry(showBottleOperationModel, time);

        setShowBottleOperationModel(null);
    };

    const handleCloseValve = (index) => {
        valveManagerRef.current.removeEntry(index);
    };

    const handleClickBottle = (isActive, bottle) => {
        isActive ? handleCloseValve(bottle.index) : setShowBottleOperationModel(bottle);
    };

    if (!amedite) return null;

    return (
        <>
            <ModelWrapper header={header[amedite]} width="w-fit" onClose={onClose}>
                <div className={`border border-neutral-300 rounded-lg shadow-lg h-96 w-96 p-3 mt-2 grid grid-cols-3 relative`}>
                    {containerBottles[amedite].map((el, index) => {
                        const activeBottleData = openValveDetails.find((openValveEl) => openValveEl.bottleDetail.index === el.index);

                        return (
                            <SingleBottle
                                isActive={!!activeBottleData}
                                key={index}
                                bottleDetails={el}
                                handleClick={() => handleClickBottle(!!activeBottleData, el)}
                                activeBottleData={activeBottleData}
                            />
                        );
                    })}
                </div>
            </ModelWrapper>

            {!!showBottleOperationModel && <BottleOperationModel handleOpenValve={handleOpenValve} onClose={() => setShowBottleOperationModel(null)} />}
        </>
    );
}
