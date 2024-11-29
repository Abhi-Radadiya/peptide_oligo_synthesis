// import { Button } from "../../../Components/Buttons/Buttons";
// import React, { useState, useRef } from "react";
// import ModelWrapper from "../../../Components/Model/ModelWrapper";

// const DNASequenceHighlighter = (props) => {
//     const { initialText, onSave, onClose } = props;
//     const [dnaSequence, setDnaSequence] = useState("ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT");
//     const [highlightRange, setHighlightRange] = useState(null); // Single range for a combined unit
//     const textareaRef = useRef(null);
//     const [text, setText] = useState("");

//     const handleTextareaChange = (e) => {
//         setDnaSequence(e.target.value);
//         setText(e.target.value);
//         setHighlightRange(null); // Reset highlights on input change
//     };

//     const handleSelectionChange = (e) => {
//         const textarea = textareaRef.current;
//         if (!textarea) return;

//         const { selectionStart, selectionEnd } = textarea;
//         const selectedText = textarea.value.slice(selectionStart, selectionEnd).trim();

//         if (selectedText) {
//             const startIndex = textarea.value.slice(0, selectionStart).split(" ").length - 1; // Starting block index
//             const selectedBlockCount = selectedText.split(" ").length;

//             setHighlightRange({
//                 start: startIndex,
//                 length: selectedBlockCount,
//             });
//         } else {
//             setHighlightRange(null);
//         }
//     };

//     const blocks = dnaSequence.split(" ");
//     const highlightedBlocks = highlightRange
//         ? blocks.slice(highlightRange.start, highlightRange.start + highlightRange.length).join(" ") // Combine selected blocks
//         : null;

//     const [logFile, setLogFile] = useState("");

//     const handleSave = () => {
//         onSave(text, logFile);
//         downloadTextFile(text);
//     };

//     const downloadTextFile = (text) => {
//         const blob = new Blob([text], { type: "text/plain" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "sequence.txt";
//         a.click();
//         URL.revokeObjectURL(url);
//         onClose();
//     };
//     const fileInputRef = useRef(null);

//     const handleFileButtonClick = () => {
//         fileInputRef.current.click();
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];

//         if (file) {
//             !logFile && setLogFile(file?.name?.split(".")[0]);

//             const reader = new FileReader();

//             reader.onload = (event) => {
//                 setText(event.target.result);
//             };
//             reader.readAsText(file);
//         }
//     };

//     return (
//         <ModelWrapper header={initialText ? "Edit sequence" : "Create new sequence"} width="w-[100vh]" onClose={onClose}>
//             <div className="flex justify-between my-4">
//                 <input type="text" value={logFile} onChange={(e) => setLogFile(e.target.value)} className="p-2 border border-gray-300 rounded" placeholder="Log file" />
//             </div>
//             <div className="p-4 space-y-4">
//                 <textarea
//                     ref={textareaRef}
//                     value={dnaSequence}
//                     onChange={handleTextareaChange}
//                     onSelect={handleSelectionChange}
//                     className="w-full p-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
//                     rows="4"
//                 />
//                 <div className="flex flex-wrap gap-2">
//                     {blocks.map((block, index) => {
//                         const isPartOfHighlight = highlightRange && index >= highlightRange.start && index < highlightRange.start + highlightRange.length;

//                         if (isPartOfHighlight && index === highlightRange.start) {
//                             return (
//                                 <span key={index} className="px-2 py-1 rounded bg-blue-500 text-white">
//                                     {highlightedBlocks}
//                                 </span>
//                             );
//                         }

//                         if (isPartOfHighlight) {
//                             return null;
//                         }

//                         return (
//                             <span key={index} className="px-2 py-1 rounded bg-gray-200">
//                                 {block}
//                             </span>
//                         );
//                     })}
//                 </div>
//             </div>

//             <div className="flex gap-4 mt-4">
//                 <Button label="Save" onClick={handleSave} />

//                 <Button label="Select File" onClick={handleFileButtonClick} />

//                 <input type="file" accept=".txt" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
//             </div>
//         </ModelWrapper>
//     );
// };

// export default DNASequenceHighlighter;

// import React, { useState, useRef } from "react";
// import Select from "react-select";

// const DNASequenceHighlighter = () => {
//     const [dnaSequence, setDnaSequence] = useState("ACG ATG TGC GCA ACG ATG A T G C G CT A GTC AGC GCT GCA CT");

//     const [highlightRange, setHighlightRange] = useState(null);

//     const [selectedMethod, setSelectedMethod] = useState(null);

//     const textareaRef = useRef(null);

//     const [initialSeqArr, setInitialSeqArr] = useState(
//         dnaSequence
//             .split(" ")
//             .filter(Boolean)
//             .map((el) => ({ block: el, method: null }))
//     );

//     const [seqArray, setSeqArray] = useState(
//         dnaSequence
//             .split(" ")
//             .filter(Boolean)
//             .map((el) => ({ block: el, method: null }))
//     );

//     const methods = [
//         { value: "method1", label: "Method 1" },
//         { value: "method2", label: "Method 2" },
//         { value: "method3", label: "Method 3" },
//     ];

//     const handleTextareaChange = (e) => {
//         setDnaSequence(e.target.value);

//         const spaceSeparatedSeq = e.target.value.split(" ").filter(Boolean);

//         setSeqArray(spaceSeparatedSeq.map((el) => ({ block: el, method: null })));
//         setInitialSeqArr(spaceSeparatedSeq.map((el) => ({ block: el, method: null })));

//         setHighlightRange(null);
//         setSelectedMethod(null);
//     };

//     function mergeBlocks(seqArray, startIndex, endIndex) {
//         if (startIndex < 0 || endIndex >= seqArray.length || startIndex > endIndex) {
//             throw new Error("Invalid start or end index");
//         }

//         const resultArray = [];

//         let mergedBlock = "";
//         for (let i = startIndex; i <= endIndex; i++) {
//             mergedBlock += seqArray[i].block + " ";
//         }
//         mergedBlock = mergedBlock.trim();

//         for (let i = 0; i < startIndex; i++) {
//             resultArray.push({ ...seqArray[i], isSelected: false });
//         }

//         resultArray.push({ block: mergedBlock, method: null, isSelected: true });

//         for (let i = endIndex + 1; i < seqArray.length; i++) {
//             resultArray.push({ ...seqArray[i], isSelected: false });
//         }

//         setSeqArray(resultArray);

//         return resultArray;
//     }

//     const handleSelectionChange = () => {
//         const textarea = textareaRef.current;

//         if (!textarea) return;

//         const { selectionStart, selectionEnd } = textarea;

//         const selectedText = textarea.value.slice(selectionStart, selectionEnd).trim();

//         if (selectedText) {
//             const startIndex = textarea.value.slice(0, selectionStart).split(" ").length - 1;

//             const endIndex = textarea.value.slice(0, selectionEnd).split(" ").length - 1;

//             mergeBlocks(initialSeqArr, startIndex, endIndex);

//             const selectedBlockCount = selectedText.split(" ").length;

//             setHighlightRange({
//                 start: startIndex,
//                 length: selectedBlockCount,
//             });
//             setSelectedMethod(null);
//         } else {
//             setHighlightRange(null);
//             setSelectedMethod(null);
//         }
//     };

//     const handleMethodChange = (selectedOption) => {
//         setSelectedMethod(selectedOption);
//     };

//     const blocks = dnaSequence.split(" ");
//     const highlightedBlocks = highlightRange ? blocks.slice(highlightRange.start, highlightRange.start + highlightRange.length).join(" ") : null;

//     return (
//         <div className="p-4 space-y-4">
//             <textarea
//                 ref={textareaRef}
//                 value={dnaSequence}
//                 onChange={handleTextareaChange}
//                 onSelect={handleSelectionChange}
//                 className="w-full p-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
//                 rows="4"
//             />
//             <div className="flex flex-wrap gap-2">
//                 {blocks.map((block, index) => {
//                     const isPartOfHighlight = highlightRange && index >= highlightRange.start && index < highlightRange.start + highlightRange.length;

//                     if (isPartOfHighlight && index === highlightRange.start) {
//                         return (
//                             <span key={index} className="px-2 py-1 rounded bg-blue-500 text-white">
//                                 {highlightedBlocks}
//                             </span>
//                         );
//                     }

//                     if (isPartOfHighlight) {
//                         return null;
//                     }

//                     return (
//                         <span key={index} className="px-2 py-1 rounded bg-gray-200">
//                             {block}
//                         </span>
//                     );
//                 })}
//             </div>

//             <div className="flex flex-wrap gap-2">
//                 {seqArray.map((el, index) => {
//                     return (
//                         <div className="" key={index}>
//                             <div className={`px-2 py-1 rounded ${el.isSelected ? "bg-blue-500  text-white" : "bg-neutral-300 text-black"}`}>
//                                 <span>{el.block}</span>
//                             </div>
//                             {el.method?.label}
//                             {el.isSelected && (
//                                 <Select
//                                     options={methods}
//                                     value={selectedMethod}
//                                     onChange={(e) =>
//                                         setSeqArray((prevState) => {
//                                             return prevState.map((prevEl, prevIndex) => {
//                                                 if (prevIndex === index) {
//                                                     return { ...prevEl, method: e };
//                                                 }
//                                                 return prevEl;
//                                             });
//                                         })
//                                     }
//                                     className="w-full max-w-sm"
//                                 />
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>

//             {highlightRange && (
//                 <div className="mt-4">
//                     <label className="block mb-2 text-sm font-medium">Select a Method:</label>

//                     <Select options={methods} value={selectedMethod} onChange={handleMethodChange} className="w-full max-w-sm" />

//                     {selectedMethod && (
//                         <p className="mt-2 text-sm">
//                             Selected Method: <strong>{selectedMethod.label}</strong>
//                         </p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DNASequenceHighlighter;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const DNAInput = () => {
    const { register, handleSubmit } = useForm();
    const [blocks, setBlocks] = useState([]);
    const [selectedBlocks, setSelectedBlocks] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [hoveredBlock, setHoveredBlock] = useState(null);

    const colorCode = { A: "#65b330", T: "#cf5140", G: "#cfbe69", C: "#6078d6" };

    const methods = [
        { value: "method1", label: "Method 1" },
        { value: "method2", label: "Method 2" },
        { value: "method3", label: "Method 3" },
    ];

    const onSubmit = (data) => {
        const blocksArray = data.sequence
            .trim()
            .split(/\s+/)
            .map((block) => ({ block, method: null }));

        setBlocks(blocksArray);
        setSelectedBlocks([]);
    };

    const handleBlockSelect = (index) => {
        setSelectedBlocks((prevSelected) => (prevSelected.includes(index) ? prevSelected.filter((i) => i !== index) : [...prevSelected, index]));
    };

    const combineSequenceBlocks = (blocks) => {
        if (!blocks || blocks.length === 0) return [];

        return blocks.reduce((combined, current) => {
            if (combined.length === 0) {
                return [current];
            }

            const lastItem = combined[combined.length - 1];

            const methodsMatch = lastItem.method && current.method && lastItem.method.value === current.method.value;

            if (methodsMatch) {
                lastItem.block += ` ${current.block}`;
                return combined;
            } else {
                return [...combined, current];
            }
        }, []);
    };

    const handleMethodSelect = (selectedOption) => {
        setSelectedMethod(selectedOption);
        const updatedBlocks = blocks.map((block, index) => (selectedBlocks.includes(index) ? { ...block, method: selectedOption } : block));
        setBlocks(combineSequenceBlocks(updatedBlocks));
        setSelectedBlocks([]);
        setSelectedMethod(null);
    };

    const handleSeparate = (index) => {
        const blockToSeparate = blocks[index];
        const separatedBlocks = blockToSeparate.block.split(/\s+/).map((block) => ({
            block,
            method: blockToSeparate.method,
        }));
        const updatedBlocks = [...blocks.slice(0, index), ...separatedBlocks, ...blocks.slice(index + 1)];
        setBlocks(updatedBlocks);
        setHoveredBlock(null);
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <div className="flex flex-row justify-between items-center mb-2">
                        <label className="block text-gray-700 text-sm font-bold">DNA Sequence</label>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save
                        </button>
                    </div>

                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("sequence")}
                        rows="10"
                    ></textarea>
                </div>
            </form>

            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold">Method Selection</label>
                <p className="italic text-neutral-500 text-sm mb-2">(Apply method to selected blocks)</p>
                <Select isDisabled={selectedBlocks.length === 0} options={methods} placeholder="Select method" value={selectedMethod} onChange={handleMethodSelect} />
            </div>

            <div className="mt-4">
                {blocks.map((blockData, index) => {
                    const isHovered = index === hoveredBlock;
                    const isSelected = selectedBlocks.includes(index);
                    const hasMethod = Boolean(blockData.method);
                    const hasSpace = blockData.block.includes(" ");
                    const blockClasses = ["inline-block border p-2 m-1 cursor-pointer relative group", hasMethod ? "bg-green-200" : "bg-white", isSelected ? "bg-yellow-200" : ""]
                        .filter(Boolean)
                        .join(" ");

                    const tooltipClasses = [
                        "absolute z-10 flex flex-row items-center justify-center gap-4 transition-all",
                        isHovered ? "-top-10 opacity-100 group-hover:opacity-100" : "top-0 opacity-0",
                        "bg-neutral-200 border rounded-xl p-2 border-neutral-300",
                    ]
                        .filter(Boolean)
                        .join(" ");

                    return (
                        <div
                            key={index}
                            className={blockClasses}
                            onClick={() => handleBlockSelect(index)}
                            onMouseEnter={() => setHoveredBlock(index)}
                            onMouseLeave={() => setHoveredBlock(null)}
                        >
                            {blockData.block.split("").map((char, charIndex) => (
                                <span key={charIndex} style={{ color: colorCode[char] }}>
                                    {char}
                                </span>
                            ))}

                            {(hasMethod || hasSpace) && (
                                <div className={`${tooltipClasses} left-1/2 transform -translate-x-1/2`}>
                                    {hasMethod && <div className="text-sm text-neutral-700 whitespace-nowrap">{blockData.method.label}</div>}
                                    {hasSpace && (
                                        <button
                                            className="bg-orange-400 text-white px-0.5 pb-0.5 -my-1 h-fit text-sm font-bold rounded whitespace-nowrap"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSeparate(index);
                                            }}
                                        >
                                            Separate
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DNAInput;
