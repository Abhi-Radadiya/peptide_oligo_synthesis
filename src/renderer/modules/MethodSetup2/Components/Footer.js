import { useWindowSize } from "@uidotdev/usehooks";
import React from "react";

export default function Footer(props) {
    const { onClick, label = "Save & Next" } = props;

    const { width } = useWindowSize();

    return (
        <>
            <div className="absolute bottom-0 right-0 border-t pt-4 border-neutral-700 bg-white" style={{ width: width }}>
                <div className="w-full flex justify-end">
                    <button onClick={onClick} className="px-2 py-2 rounded-lg w-[150px] text-black bg-amber-200 border ring-amber-300 ring-offset-2 focus:ring-2">
                        {label}
                    </button>
                </div>
            </div>
        </>
    );
}
