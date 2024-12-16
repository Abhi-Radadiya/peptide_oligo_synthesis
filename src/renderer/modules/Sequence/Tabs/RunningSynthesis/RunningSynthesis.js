import React, { useEffect, useState } from "react";
import { Button } from "../../../../Components/Buttons/Buttons";

export default function RunningSynthesis(props) {
    const { printingState, onPause, onResume, onStop, onStartOver, onRun } = props;

    const { blocks, currentIndex, isPrinting } = printingState;

    const [currentBlock, setCurrentBlock] = useState(null);

    useEffect(() => {
        let interval;
        if (isPrinting && blocks.length > currentIndex) {
            interval = setInterval(() => {
                setCurrentBlock(blocks[currentIndex]);
                printingState.currentIndex += 1;
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPrinting, currentIndex, blocks]);

    return (
        <div className="space-y-4">
            <div className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-800">Execution Window</h2>
            </div>

            <div className="flex space-x-4">
                <Button label="Run" onClick={onRun} />
                <Button label="Pause" onClick={onPause} />
                <Button label="Resume" onClick={onResume} />
                <Button label="Stop" onClick={onStop} />
                <Button label="Start Over" onClick={onStartOver} />
            </div>

            <div>
                {currentBlock ? (
                    <p>
                        <strong>Block:</strong> {currentBlock.block}
                        {/* <strong>Index:</strong> {currentBlock.index} */}
                    </p>
                ) : (
                    <p>No block being processed.</p>
                )}
            </div>
        </div>
    );
}
