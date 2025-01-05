import React from "react";
import ModeSelection from "./ModeSelection";
import { Button } from "../../../../../Components/Buttons/Buttons";
import { useFormContext } from "react-hook-form";

export default function Header(props) {
    const { printingState, handlePressRun, handlePause, handleResume, handleStop } = props;

    const { handleSubmit } = useFormContext();

    return (
        <>
            <div className="w-full flex flex-row justify-between items-center">
                <ModeSelection />

                <div className="flex space-x-4">
                    <Button
                        label="Run"
                        onClick={handleSubmit(handlePressRun)}
                        disabled={printingState.activeButton === "pause" || printingState.activeButton === "resume" || printingState.activeButton === "run"}
                        bgClassName="disabled:bg-neutral-400 bg-neutral-200 hover:bg-neutral-300"
                    />
                    <Button
                        bgClassName="disabled:bg-neutral-400 bg-neutral-200 hover:bg-neutral-300"
                        label="Pause"
                        onClick={handlePause}
                        disabled={printingState.activeButton === "stop" || printingState.activeButton === null || printingState.activeButton === "pause"}
                    />
                    <Button
                        bgClassName="disabled:bg-neutral-400 bg-neutral-200 hover:bg-neutral-300"
                        label="Resume"
                        onClick={handleResume}
                        disabled={printingState.activeButton !== "pause"}
                    />
                    <Button
                        bgClassName="disabled:bg-neutral-400 bg-neutral-200 hover:bg-neutral-300"
                        label="Stop"
                        onClick={handleStop}
                        disabled={printingState.activeButton === "stop" || printingState.activeButton === null}
                    />
                </div>
            </div>
        </>
    );
}
