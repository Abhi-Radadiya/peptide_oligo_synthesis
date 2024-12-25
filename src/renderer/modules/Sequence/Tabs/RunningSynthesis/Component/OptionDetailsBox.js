import React from "react";

export default function OptionDetailsBox(props) {
    const { optionKey, value, className } = props;

    return (
        <>
            <div className={`flex flex-row px-4 py-2 bg-amber-50 justify-between shadow gap-4 border border-neutral-300 rounded-lg ${className}`}>
                {optionKey} <strong>{value}</strong>
            </div>
        </>
    );
}
