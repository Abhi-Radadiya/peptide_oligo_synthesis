import { useWindowSize } from "@uidotdev/usehooks";
import React from "react";

export default function Footer(props) {
    const { onSave, label = "Save & Next" } = props;

    const { width } = useWindowSize();

    return (
        <>
            <div className="absolute bottom-0 border-t pt-4 border-neutral-700 bg-white" style={{ width: width - 300 }}>
                <div className="w-full flex justify-end">
                    <button onClick={onSave} className="px-2 py-2 rounded-lg w-[150px] text-white bg-blue-500 border">
                        {label}
                    </button>
                </div>
            </div>
        </>
    );
}
