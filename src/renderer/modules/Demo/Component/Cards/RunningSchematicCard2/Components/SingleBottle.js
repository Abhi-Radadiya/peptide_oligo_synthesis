import React, { useState, useEffect } from "react";

export default function SingleBottle(props) {
    const { bottleDetails, isActive, handleClick, activeBottleData } = props;
    const { label, index } = bottleDetails;

    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        if (isActive && activeBottleData) {
            const interval = setInterval(() => {
                const elapsedTime = Date.now() - activeBottleData.timestamp;
                const timeLeft = Math.max(activeBottleData.time - elapsedTime, 0);
                setRemainingTime(timeLeft);

                if (timeLeft <= 0) {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setRemainingTime(null);
        }
    }, [isActive, activeBottleData]);

    return (
        <div className="flex flex-col items-center">
            <div
                className={`border border-neutral-300 cursor-pointer rounded-full h-20 transition-colors duration-300 hover:shadow-md hover:scale-105 w-20 m-auto flex items-center justify-center text-center relative ${
                    isActive ? "bg-green-300" : "bg-neutral-50 hover:bg-neutral-100"
                }`}
                onClick={handleClick}
            >
                <span>{label}</span>

                {isActive && <div className="h-3 w-3 rounded-full bg-amber-500 absolute right-2 top-0 animate-ping" />}
            </div>

            <span>{index}</span>

            {/* Show remaining time when active */}
            {isActive && remainingTime !== null && (
                <p className="text-sm text-gray-600">
                    {!remainingTime && isActive ? (
                        <span>Continues</span>
                    ) : (
                        <span>
                            Closes in: <strong>{(remainingTime / 1000).toFixed(0)}s</strong>
                        </span>
                    )}
                </p>
            )}
        </div>
    );
}
