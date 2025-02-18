import React from "react";

export default function SingleBottle(props) {
    const { details, isActive } = props;

    return (
        <div
            className={`border border-neutral-300 rounded-full h-20 w-20 m-auto flex items-center justify-center text-center relative ${
                isActive ? "bg-green-300" : "bg-neutral-50"
            }`}
        >
            <span className="">{details.label}</span>
            {isActive && <div className="h-3 w-3 rounded-full bg-amber-500 absolute right-2 top-0 animate-ping" />}
        </div>
    );
}
