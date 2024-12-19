import React, { useEffect, useState } from "react";
import { Button } from "../../../../Components/Buttons/Buttons";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import RunSpecificBlocksModel from "../RunSequence/Model/RunSpecificBlocksModel";

export default function RunningSynthesis() {
    const { handleSubmit, watch } = useFormContext();

    const [printingState, setPrintingState] = useState({
        blocks: [],
        currentIndex: 0,
        isPrinting: false,
        startIndex: 0,
        endIndex: 0,
    });

    const [showRunSpecificBlockModel, setShowRunSpecificBlockModel] = useState(false);

    const allSequence = useSelector((state) => state.sequence.sequence);

    const handleRun = () => {
        setShowRunSpecificBlockModel(false);

        const selectedSequence = allSequence?.find((el) => el.id === watch("sequence")?.value);

        if (selectedSequence && selectedSequence.block) {
            setPrintingState((prevState) => ({
                ...prevState,
                blocks: selectedSequence.block,
                currentIndex: prevState.startIndex,
                isPrinting: true,
            }));
        }
    };

    const handlePause = () => setPrintingState((prev) => ({ ...prev, isPrinting: false }));

    const handleResume = () => setPrintingState((prev) => ({ ...prev, isPrinting: true }));

    const handleStop = () => setPrintingState((prevState) => ({ ...prevState, blocks: [], currentIndex: 0, isPrinting: false }));

    const { setValue } = useFormContext();

    const [currentBlock, setCurrentBlock] = useState(null);

    const { blocks, currentIndex, isPrinting, startIndex, endIndex } = printingState;

    useEffect(() => {
        let interval;

        if (isPrinting && blocks.length > currentIndex && currentIndex >= startIndex && currentIndex <= endIndex) {
            interval = setInterval(() => {
                const currentBlock = blocks[currentIndex];

                setCurrentBlock(currentBlock);

                setValue("currentExecutedBlock", currentBlock);

                setPrintingState((prevState) => ({
                    ...prevState,
                    currentIndex: prevState.currentIndex + 1,
                }));
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isPrinting, currentIndex, blocks, startIndex, endIndex]);

    return (
        <>
            <div className="space-y-4 w-full">
                <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-800">Execution Window</h2>
                </div>

                <div className="flex space-x-4">
                    <Button label="Run" onClick={handleSubmit(() => setShowRunSpecificBlockModel(true))} />
                    <Button label="Pause" onClick={handlePause} />
                    {/* <Button label="Start Over" onClick={handleStartOver} /> */}
                    <Button label="Resume" onClick={handleResume} />
                    <Button label="Stop" onClick={handleStop} />
                </div>

                <div>
                    {currentBlock ? (
                        <p>
                            <strong>Block:</strong> {currentBlock.block}
                            <strong className="ml-8">Method:</strong> {currentBlock?.method?.label}
                        </p>
                    ) : (
                        <p>No block being processed.</p>
                    )}
                </div>
            </div>

            {showRunSpecificBlockModel && <RunSpecificBlocksModel handleRun={handleRun} setPrintingState={setPrintingState} onClose={() => setShowRunSpecificBlockModel(false)} />}
        </>
    );
}
