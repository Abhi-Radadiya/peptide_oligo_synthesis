import React from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import TextArea from "./Component/TextArea"

export default function SequenceEditing() {
    const { height: windowHeight } = useWindowSize()

    return (
        <>
            <div className="w-1/2 pr-4 border-r border-neutral-300 overflow-auto no-scrollbar">
                <TextArea />
            </div>
        </>
    )
}
