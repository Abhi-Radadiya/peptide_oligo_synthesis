import React from "react";

export default function TextArea(props) {
    const { textAreaRef, textContent, handleTextAreaChange, setCursorPosition } = props;

    return (
        <>
            <div className="w-full pr-2 -mr-2 scrollbar-style max-h-[50vh] overflow-auto">
                <div className="font-semibold mb-4">Sequence</div>

                <textarea
                    ref={textAreaRef}
                    value={textContent}
                    onChange={handleTextAreaChange}
                    onClick={() => setCursorPosition(textAreaRef.current.selectionStart)}
                    onKeyUp={() => setCursorPosition(textAreaRef.current.selectionStart)}
                    className="border border-neutral-300 px-2 py-1 rounded-lg w-full h-[calc(50vh-48px)]"
                    placeholder="Type or click blocks to insert..."
                />
            </div>
        </>
    );
}
