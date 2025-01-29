import React, { useState } from "react";
import { Play, Pause, Square, RotateCcw } from "lucide-react";

export default function Header() {
    const [status, setStatus] = useState("idle"); // idle, running, paused

    const buttonClasses = {
        base: "flex items-center justify-center py-2 px-3 rounded-md transition-all duration-200",
        run: "bg-green-300 hover:bg-green-400 text-black",
        pause: "bg-amber-300 hover:bg-amber-400 text-black",
        stop: "bg-red-400 hover:bg-red-500 text-black",
        resume: "bg-blue-300 hover:bg-blue-400 text-black",
        reset: "bg-neutral-500 hover:bg-neutral-600 text-white",
    };

    const handleRun = () => {
        setStatus("running");
        // Add your run logic here
    };

    const handlePause = () => {
        setStatus("paused");
        // Add your pause logic here
    };

    const handleResume = () => {
        setStatus("running");
        // Add your resume logic here
    };

    const handleStop = () => {
        setStatus("idle");
        // Add your stop logic here
    };

    const handleReset = () => {
        setStatus("idle");
        // Add your reset logic here
    };

    return (
        <div className="bg-gradient-to-r from-neutral-100 to-neutral-200 p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-neutral-800">Control Panel</h2>
                <div className="flex space-x-2">
                    {status === "idle" && (
                        <button onClick={handleRun} className={`${buttonClasses.base} ${buttonClasses.run}`}>
                            <Play className="mr-2" size={20} /> Run
                        </button>
                    )}

                    {status === "running" && (
                        <button onClick={handlePause} className={`${buttonClasses.base} ${buttonClasses.pause}`}>
                            <Pause className="mr-2" /> Pause
                        </button>
                    )}

                    {status === "paused" && (
                        <button onClick={handleResume} className={`${buttonClasses.base} ${buttonClasses.resume}`}>
                            <Play className="mr-2" /> Resume
                        </button>
                    )}

                    {status !== "idle" && (
                        <button onClick={handleStop} className={`${buttonClasses.base} ${buttonClasses.stop}`}>
                            <Square className="mr-2" /> Stop
                        </button>
                    )}

                    <button onClick={handleReset} className={`${buttonClasses.base} ${buttonClasses.reset}`}>
                        <RotateCcw className="mr-2" /> Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
