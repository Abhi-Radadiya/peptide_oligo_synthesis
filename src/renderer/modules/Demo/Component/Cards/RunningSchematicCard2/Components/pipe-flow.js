import React from "react";

export const PipeFlow = (props) => {
    const { className, is_flowing = false, isVertical = false } = props;

    return (
        <>
            <div className={`absolute flex items-center justify-center border overflow-hidden ${className}`}>
                {is_flowing && (
                    <div
                        className={`w-[200%] h-full absolute ${isVertical ? "animate-flow-vertical" : "animate-flow"}`}
                        style={{ background: "linear-gradient(90deg, transparent, currentColor, transparent)" }}
                    ></div>
                )}
            </div>
        </>
    );
};
