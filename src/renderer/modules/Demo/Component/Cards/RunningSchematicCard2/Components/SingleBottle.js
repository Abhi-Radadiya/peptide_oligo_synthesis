import React from "react";

export default function SingleBottle(props) {
    const { bottleDetails, isActive, handleClick } = props;
    const { label, index } = bottleDetails;

    return (
        <div className="flex flex-col items-center">
            <div
                className={`border border-neutral-300 cursor-pointer rounded-full h-24 transition-colors duration-300 hover:shadow-md hover:scale-105 w-24 m-auto flex items-center justify-center text-center relative ${
                    isActive ? "bg-green-300" : "bg-neutral-50 hover:bg-neutral-100"
                }`}
                onClick={handleClick}
            >
                <span>{label}</span>

                {isActive && <div className="h-3 w-3 rounded-full bg-amber-500 absolute right-2 top-0 animate-ping" />}
            </div>

            <span>{index}</span>
        </div>
    );
}
