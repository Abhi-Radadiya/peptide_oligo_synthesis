// // TODO add select all
// import React, { useMemo, useState, useCallback, useEffect } from "react";
// import { useFormContext } from "react-hook-form";
// import { useSelector } from "react-redux";

// export default function SelectedSequenceBlock(props) {
//     const { setShowBlockSelectionError } = props;

//     const sequence = useSelector((state) => state.sequence.sequence);
//     const methods = useSelector((state) => state.methodSetup.method);
//     const { watch, setValue } = useFormContext();

//     const selectedBlocks = watch("tempSelectBlock") ?? new Set();

//     const setSelectedBlocks = (block) => setValue("tempSelectBlock", block);

//     const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

//     const selectedSequenceBlock = useMemo(() => {
//         const selectedSequence = sequence?.find((el) => el.id === watch("tempSequence.value"))?.block;

//         return selectedSequence?.map((el) => {
//             const { id, method_name } = methods?.find((method) => method.id === el.method.value) ?? {};

//             return {
//                 ...el,
//                 method: { id, method_name },
//             };
//         });
//     }, [watch("tempSequence"), sequence, methods]);

//     useEffect(() => {
//         setSelectedBlocks(new Set(watch("selectedBlocks")?.map((el) => el.index)));
//     }, []);

//     const handleBlockClick = useCallback(
//         (index, event) => {
//             setShowBlockSelectionError(false);

//             const newSelectedBlocks = new Set(selectedBlocks);

//             if (event.shiftKey && lastSelectedIndex !== null) {
//                 const start = Math.min(lastSelectedIndex, index);
//                 const end = Math.max(lastSelectedIndex, index);
//                 for (let i = start; i <= end; i++) {
//                     newSelectedBlocks.add(i);
//                 }
//             } else {
//                 if (newSelectedBlocks.has(index)) {
//                     newSelectedBlocks.delete(index);
//                 } else {
//                     newSelectedBlocks.add(index);
//                 }
//             }

//             setSelectedBlocks(newSelectedBlocks);

//             const selectedBlockData = Array.from(newSelectedBlocks).map((idx) => ({ ...selectedSequenceBlock[idx], index: idx }));

//             setValue("tempSelectedBlocks", selectedBlockData);

//             setLastSelectedIndex(index);
//         },
//         [selectedBlocks, lastSelectedIndex]
//     );

//     // const selectAll = () => {
//     //     const selectedBlock = new Set(selectedSequenceBlock.map((_, index) => index));

//     //     console.log(`selectedBlock : `, selectedBlock);

//     //     setSelectedBlocks([...selectedBlock].map((el, index) => ({ ...el, index })));

//     //     setValue("tempSelectedBlocks", [...selectedSequenceBlock]);
//     // };

//     const clearSelection = () => {
//         setSelectedBlocks(new Set());
//         setValue("tempSelectedBlocks", []);
//     };

//     return (
//         <>
//             <div className="flex flex-row justify-between items-center">
//                 <span className="font-semibold text-base">Selected Sequence</span>

//                 <div className="flex flex-row items-center gap-3">
//                     {/* <button
//                         className="rounded-lg px-4 py-1 border border-neutral-300 text-xs bg-amber-200 disabled:bg-neutral-200"
//                         disabled={!selectedSequenceBlock?.length}
//                         onClick={() => selectAll()}
//                     >
//                         Select All
//                     </button> */}
//                     <button
//                         disabled={!selectedSequenceBlock?.length}
//                         className="rounded-lg px-4 py-1 border border-neutral-300 text-xs bg-red-200 disabled:bg-neutral-200"
//                         onClick={() => clearSelection()}
//                     >
//                         Clear Selection
//                     </button>
//                 </div>
//             </div>

//             {selectedSequenceBlock?.length ? (
//                 <div className="inline-block overflow-y-auto scrollbar-style px-3 py-2 h-[380px] border border-neutral-400 mt-4 rounded-xl">
//                     {selectedSequenceBlock?.map((el, index) => {
//                         const isSelected = selectedBlocks.has(index);
//                         return (
//                             <div
//                                 className={`border inline-block rounded-lg px-2 py-1 m-2 cursor-pointer transition-colors duration-200 ${
//                                     isSelected ? "bg-blue-200 border-blue-400" : "bg-white border-neutral-300"
//                                 }`}
//                                 key={index}
//                                 onClick={(event) => handleBlockClick(index, event)}
//                             >
//                                 <span className="font-medium mr-1">{el.block}</span>
//                                 {el?.method?.method_name && <span className="text-sm italic text-neutral-700">({el.method.method_name})</span>}
//                             </div>
//                         );
//                     })}
//                 </div>
//             ) : (
//                 <>
//                     <div className="h-[380px] border border-neutral-400 mt-4 rounded-xl flex justify-center items-center text-center text-sm font-medium">
//                         Select Sequence to Watch Block
//                     </div>
//                 </>
//             )}
//         </>
//     );
// }

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export default function SelectedSequenceBlock(props) {
    const { setShowBlockSelectionError } = props;

    const sequence = useSelector((state) => state.sequence.sequence);
    const methods = useSelector((state) => state.methodSetup.method);
    const { watch, setValue } = useFormContext();

    const selectedBlocks = watch("tempSelectBlock") ?? new Set();

    const setSelectedBlocks = (block) => setValue("tempSelectBlock", block);

    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

    const selectedSequenceBlock = useMemo(() => {
        const selectedSequence = sequence?.find((el) => el.id === watch("tempSequence.value"))?.block;

        if (selectedSequence === undefined) return [];

        // Reverse the sequence if watch("tempOption") == 3
        const processedSequence = watch("tempOption") == 3 ? [...selectedSequence].reverse() : selectedSequence;

        return processedSequence?.map((el) => {
            const { id, method_name } = methods?.find((method) => method.id === el.method.value) ?? {};

            return {
                ...el,
                method: { id, method_name },
            };
        });
    }, [watch("tempSequence"), watch("tempOption"), sequence, methods]);

    useEffect(() => {
        if (watch("tempOption") == 3) {
            // Reverse the selected block indices when tempOption is 3
            const reversedIndices = new Set(Array.from(selectedBlocks).map((index) => selectedSequenceBlock.length - 1 - index));

            console.log(`reversedIndices: `, reversedIndices);

            setSelectedBlocks(reversedIndices);
        } else {
            // Restore the original order when tempOption is not 3
            const originalIndices = new Set(Array.from(selectedBlocks).map((index) => selectedSequenceBlock.length - 1 - index));

            console.log(`originalIndices: `, originalIndices);

            setSelectedBlocks(originalIndices);
        }
    }, [watch("tempOption"), selectedSequenceBlock]);

    // useEffect(() => {
    // setSelectedBlocks(new Set(watch("selectedBlocks")?.map((el) => el.index)));
    // }, []);

    const handleBlockClick = useCallback(
        (index, event) => {
            setShowBlockSelectionError(false);

            const newSelectedBlocks = new Set(selectedBlocks);

            if (event.shiftKey && lastSelectedIndex !== null) {
                const start = Math.min(lastSelectedIndex, index);
                const end = Math.max(lastSelectedIndex, index);
                for (let i = start; i <= end; i++) {
                    newSelectedBlocks.add(i);
                }
            } else {
                if (newSelectedBlocks.has(index)) {
                    newSelectedBlocks.delete(index);
                } else {
                    newSelectedBlocks.add(index);
                }
            }

            setSelectedBlocks(newSelectedBlocks);

            const selectedBlockData = Array.from(newSelectedBlocks).map((idx) => ({
                ...selectedSequenceBlock[idx],
                index: idx,
            }));

            setValue("tempSelectedBlocks", selectedBlockData);

            setLastSelectedIndex(index);
        },
        [selectedBlocks, lastSelectedIndex, selectedSequenceBlock]
    );

    const selectAll = () => {
        if (!selectedSequenceBlock?.length) return;

        // Select all block indices
        const allIndices = new Set(selectedSequenceBlock.map((_, index) => index));
        setSelectedBlocks(allIndices);

        // Update tempSelectedBlocks with all selected blocks
        const selectedBlockData = Array.from(allIndices).map((idx) => ({
            ...selectedSequenceBlock[idx],
            index: idx,
        }));
        setValue("tempSelectedBlocks", selectedBlockData);
    };

    const clearSelection = () => {
        setSelectedBlocks(new Set());
        setValue("tempSelectedBlocks", []);
    };

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <span className="font-semibold text-base">Selected Sequence</span>

                <div className="flex flex-row items-center gap-3">
                    <button
                        className="rounded-lg px-4 py-1 border border-neutral-300 text-xs bg-amber-200 disabled:bg-neutral-200"
                        disabled={!selectedSequenceBlock?.length}
                        onClick={selectAll}
                    >
                        Select All
                    </button>
                    <button
                        disabled={!selectedSequenceBlock?.length}
                        className="rounded-lg px-4 py-1 border border-neutral-300 text-xs bg-red-200 disabled:bg-neutral-200"
                        onClick={clearSelection}
                    >
                        Clear Selection
                    </button>
                </div>
            </div>

            {selectedSequenceBlock?.length ? (
                <div className="inline-block overflow-y-auto scrollbar-style px-3 py-2 h-[380px] border border-neutral-400 mt-4 rounded-xl">
                    {selectedSequenceBlock?.map((el, index) => {
                        const isSelected = selectedBlocks.has(index);
                        return (
                            <div
                                className={`border inline-block rounded-lg px-2 py-1 m-2 cursor-pointer transition-colors duration-200 ${
                                    isSelected ? "bg-blue-200 border-blue-400" : "bg-white border-neutral-300"
                                }`}
                                key={index}
                                onClick={(event) => handleBlockClick(index, event)}
                            >
                                <span className="font-medium mr-1">{el.block}</span>
                                {el?.method?.method_name && <span className="text-sm italic text-neutral-700">({el.method.method_name})</span>}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <>
                    <div className="h-[380px] border border-neutral-400 mt-4 rounded-xl flex justify-center items-center text-center text-sm font-medium">
                        Select Sequence to Watch Block
                    </div>
                </>
            )}
        </>
    );
}
