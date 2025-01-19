import React from "react";
import { useFormContext } from "react-hook-form";
import { useWindowSize } from "@uidotdev/usehooks";
import TextArea from "./Component/TextArea";

export default function SequenceEditing() {
    const {} = useFormContext();

    const { height: windowHeight } = useWindowSize();

    return (
        <>
            <div className="w-1/2 pr-4 border-r border-neutral-300 overflow-auto no-scrollbar" style={{ height: windowHeight - 100 }}>
                <TextArea />
            </div>
        </>
    );
}
