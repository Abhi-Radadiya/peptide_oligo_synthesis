import SingleSynthesisRun from "../../Component/SingleSynthesisRun";
import RunningSynthesis from "../RunningSynthesis/RunningSynthesis";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export default function Settings() {
    const { handleSubmit, watch } = useFormContext();

    const [printingState, setPrintingState] = useState({
        blocks: [],
        currentIndex: 0,
        isPrinting: false,
    });

    const allSequence = useSelector((state) => state.sequence.sequence);

    const onSubmit = () => {
        const selectedSequence = allSequence?.find((el) => el.id === watch("sequence")?.value);

        if (selectedSequence && selectedSequence.block) {
            setPrintingState({
                blocks: selectedSequence.block,
                currentIndex: 0,
                isPrinting: true,
            });
        }
    };

    const handlePause = () => setPrintingState((prev) => ({ ...prev, isPrinting: false }));

    const handleResume = () => setPrintingState((prev) => ({ ...prev, isPrinting: true }));

    const handleStop = () =>
        setPrintingState({
            blocks: [],
            currentIndex: 0,
            isPrinting: false,
        });

    const handleStartOver = () =>
        setPrintingState((prev) => ({
            ...prev,
            currentIndex: 0,
            isPrinting: true,
        }));

    return (
        <>
            <div className="flex flex-row items-start">
                <SingleSynthesisRun />
                <RunningSynthesis
                    printingState={printingState}
                    onRun={handleSubmit(onSubmit)}
                    onPause={handlePause}
                    onResume={handleResume}
                    onStop={handleStop}
                    onStartOver={handleStartOver}
                />
            </div>
        </>
    );
}
