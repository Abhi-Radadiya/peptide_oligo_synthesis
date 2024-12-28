import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ReactComponent as TrashIcon } from "../../../../../Assets/trash.svg";
import { getUniqueId } from "../../../../../Helpers/Constant";

export default function FileUploader() {
    const [sequences, setSequences] = useState([]);

    const [uploadError, setUploadError] = useState("");

    const [selectedFiles, setSelectedFiles] = useState([]);

    const { register, setValue, watch } = useFormContext();

    const blockOption = watch("blockOption");

    const formatSequenceString = (sequenceString) => {
        const cleanedSequenceString = sequenceString.replace(/\s+/g, "");

        let optionSeparatedSequenceString;

        if (blockOption === "3") {
            const blocks = cleanedSequenceString.match(/.{1,3}/g);
            optionSeparatedSequenceString = blocks.join(" ");
        } else {
            optionSeparatedSequenceString = cleanedSequenceString.split("").join(" ");
        }

        return optionSeparatedSequenceString;
    };

    const processFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                const lines = content.split("\n").filter((line) => line.trim() !== "");

                const processedSequences = lines.some((line) => line.startsWith("NEW ~"))
                    ? lines
                          .filter((line) => line.startsWith("NEW ~"))
                          .map((line, index) => ({
                              name: `${file.name.split(".txt")[0]} Sequence ${index + 1}`,
                              sequenceString: line.replace("NEW ~", "").trim(),
                          }))
                    : [{ name: file.name.split(".txt")[0], sequenceString: lines?.[0]?.trim() }];

                resolve(processedSequences);
            };

            reader.onerror = () => {
                reject(new Error("Error reading file"));
            };

            reader.readAsText(file);
        });
    };

    const generateBlock = async (files) => {
        if (files && files.length > 0) {
            try {
                setSequences([]);
                setUploadError("");

                const processedSequencesArray = await Promise.all(
                    Array.from(files)
                        .filter((file) => file.type === "text/plain" || file.name.endsWith(".txt"))
                        .map(processFile)
                );

                const allSequences = processedSequencesArray.flat();

                const processedSequence = allSequences.map((el) => {
                    return {
                        id: getUniqueId(),
                        name: el.name,
                        sequenceString: formatSequenceString(el.sequenceString),
                    };
                });

                setValue("sequenceTemp", processedSequence);

                if (processedSequence.length > 0) {
                    setSequences(processedSequence);
                } else {
                    setUploadError("No valid sequences found in the uploaded files");
                }
            } catch (error) {
                setUploadError("Error processing files");
                console.error(error);
            }
        } else {
            setSequences([]);
        }
    };

    useEffect(() => {
        if (!watch("sequenceTemp")?.length) {
            return;
        }

        const processedSequence = watch("sequenceTemp").map((el) => {
            return {
                id: getUniqueId(),
                name: el.name,
                sequenceString: formatSequenceString(el.sequenceString),
            };
        });

        setValue("sequenceTemp", processedSequence);
        setSequences(processedSequence);

        // formatSequenceString
    }, [blockOption]);

    const removeFile = (fileToRemove) => {
        const selectedFile = selectedFiles.filter((file) => file.name !== fileToRemove.name);
        setSelectedFiles(selectedFile);
        generateBlock(selectedFile);
    };

    return (
        <div className="w-full p-6 bg-white rounded-lg scrollbar-style overflow-auto">
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="fileUpload"
                    className="flex flex-col shadow-md items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                    <div className="text-center">
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500">.txt files only (multiple allowed)</p>
                    </div>

                    <input
                        id="fileUpload"
                        type="file"
                        multiple
                        accept=".txt"
                        className="hidden"
                        {...register("fileUpload", {
                            onChange: (e) => {
                                const files = Array.from(e.target.files);
                                const validFiles = files.filter((file) => file.type === "text/plain" || file.name.endsWith(".txt"));
                                setSelectedFiles((prevState) => [...prevState, ...validFiles]);
                                generateBlock([...selectedFiles, ...validFiles]);
                            },
                        })}
                    />
                </label>
            </div>

            {selectedFiles.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-md">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-800">{file.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(file)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 rounded"
                                    aria-label="Remove file"
                                >
                                    <TrashIcon size={16} stroke="red" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}

            {sequences.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">{sequences.length === 1 ? "Sequence" : "Sequences"}</h3>
                    {sequences.map((seq, index) => (
                        <div key={index} className="bg-gray-100 p-3 rounded-md mb-2 break-words">
                            <p className="font-medium">{seq.name} :</p>
                            <p className="text-sm text-gray-700">{seq.sequenceString}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
