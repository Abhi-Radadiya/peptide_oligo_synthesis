import React, { useMemo } from "react";
import { isEmpty, uniqBy } from "lodash";
import { useSelector } from "react-redux";
import { findAmediteLabel } from "../../../../../../../Helpers/Constant";

export default function BlockSelection(props) {
    const { textContent, cursorPosition, setTextContent, setCursorPosition, textAreaRef } = props;

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    const amediteList = useSelector((state) => state.amedite.amediteList);

    const uniqueBottleMappingAmedite = useMemo(() => {
        const uniquePositions = uniqBy(
            ameditePosition.filter((item) => !isEmpty(item)),
            "value"
        );

        return uniquePositions.map((el) => ({ ...el, label: findAmediteLabel(amediteList, el.value) }));
    }, [ameditePosition]);

    const handleBlockClick = (block) => {
        const newText = textContent.substring(0, cursorPosition) + ` ${block.label} ` + textContent.substring(cursorPosition);

        const newCursorPosition = cursorPosition + block.label.length + 2;

        setTextContent(newText);
        setCursorPosition(newCursorPosition);

        setTimeout(() => {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };

    return (
        <>
            <div className="pr-4 w-[calc(100%-1rem)] -ml-2 h-[50vh] border-r border-neutral-300 mr-4">
                <div className="font-semibold mb-4">Select block</div>

                <div className="inline-block">
                    {uniqueBottleMappingAmedite.map((el, index) => {
                        return (
                            <button
                                className="rounded px-2 py-1 border border-neutral-300 cursor-pointer hover:scale-110 transition-all duration-300 inline-block w-fit m-2 hover:bg-neutral-200"
                                key={index}
                                onClick={() => handleBlockClick(el)}
                            >
                                {el.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
