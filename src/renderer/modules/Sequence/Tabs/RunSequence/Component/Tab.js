import React from "react";
import { Button } from "../../../../../Components/Buttons/Buttons";
import { ReactComponent as ChevronIcon } from "../../../../../Assets/chevron-down.svg";
import { useFormContext } from "react-hook-form";

export default function Tab(props) {
    const { tab, activeTab, setActiveTab } = props;

    const { reset, handleSubmit } = useFormContext();

    const handleExit = () => {
        reset();
        setActiveTab("optionSelection");
    };

    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 items-center">
                    {tab.map((el, index) => {
                        return (
                            <div className="flex flex-row items-center gap-2" key={index}>
                                <Button label={el.label} active={el.value === activeTab} onClick={() => setActiveTab(el.value)} />

                                {index < tab.length - 1 && <ChevronIcon className="-rotate-90" />}
                            </div>
                        );
                    })}
                </div>

                {activeTab === "runSynthesis" ? (
                    <Button label="Exit" onClick={handleExit} />
                ) : (
                    <div className="flex flex-row gap-3">
                        <Button label="Reset" onClick={reset} />

                        <Button label="Save & Next" onClick={handleSubmit(() => setActiveTab("runSynthesis"))} />
                    </div>
                )}
            </div>
        </>
    );
}
