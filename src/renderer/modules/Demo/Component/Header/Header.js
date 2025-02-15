import React, { useRef, useState } from "react";
import { Play, Pause, Square, RotateCcw, Settings } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { processWiseFlag } from "../../../../Helpers/Constant";
import { SmallButton } from "../../../../Components/Buttons/Buttons";

export default function Header() {
    const [status, setStatus] = useState("idle");

    const { watch, setValue } = useFormContext();

    const intervalRef = useRef(null); // Store the interval ID

    const buttonClasses = {
        base: "flex items-center justify-center py-2 px-3 rounded-md transition-all duration-200",
        run: "bg-green-300 hover:bg-green-400 text-black",
        pause: "bg-amber-300 hover:bg-amber-400 text-black",
        stop: "bg-red-400 hover:bg-red-500 text-black",
        resume: "bg-blue-300 hover:bg-blue-400 text-black",
        reset: "bg-neutral-500 hover:bg-neutral-600 text-white",
    };

    const methods = useSelector((state) => state.methodSetup.method);

    const getMethodDetailsById = (id) => {
        return methods.find((el) => el.id === id);
    };

    const operation = [
        { label: "Column wash", value: "columnWash", index: 0 },
        { label: "Priming", value: "priming", index: 1 },
        { label: "De block", value: "deBlock", index: 2 },
        { label: "Coupling", value: "coupling", index: 3 },
        { label: "Oxidization", value: "oxidization", index: 4 },
        { label: "Sulfurization", value: "sulfurization", index: 5 },
        { label: "Capping", value: "capping", index: 6 },
        { label: "Extra", value: "extra", index: 7 },
        { label: "De block", value: "lastDeBlock", index: 8 },
        { label: "DEA", value: "dea", index: 9 },
    ];

    function formatMethodData(method, block, blockIndex) {
        let formattedMethod = {};

        for (const [key, values] of Object.entries(processWiseFlag)) {
            formattedMethod[key] = {};
            values.forEach((value) => {
                if (method.hasOwnProperty(value)) {
                    formattedMethod[key][value] = method[value];
                }
            });

            if (Object.keys(formattedMethod[key]).length === 0) {
                delete formattedMethod[key];
            }
        }

        const operationWiseFormation = operation.map((el) => {
            return { ...el, block, operationData: formattedMethod[el.value], blockIndex };
        });

        return operationWiseFormation;
    }

    function filterOperations(operations) {
        let seenColumnWash = false;
        let seenPriming = false;
        let lastDeBlockIndex = -1;
        let lastDeaIndex = -1;

        // Find the last occurrence of lastDeBlock and dea
        operations.forEach((op, index) => {
            if (op.value === "lastDeBlock") lastDeBlockIndex = index;
            if (op.value === "dea") lastDeaIndex = index;
        });

        return operations.filter((op, index) => {
            if (op.value === "columnWash") {
                if (!seenColumnWash) {
                    seenColumnWash = true;
                    return true;
                }
                return false;
            }

            if (op.value === "priming") {
                if (!seenPriming) {
                    seenPriming = true;
                    return true;
                }
                return false;
            }
            if (op.value === "lastDeBlock" && index === lastDeBlockIndex) {
                return true;
            }

            if (op.value === "dea" && index === lastDeaIndex) {
                return true;
            }

            return !["columnWash", "priming", "lastDeBlock", "dea"].includes(op.value);
        });
    }

    const indexRef = useRef(0);

    const operationsRef = useRef([]);

    const formatSequenceOperation = async (sequence) => {
        const formattedSequenceMethod = sequence.map((el, index) => formatMethodData(el.method, el.block, index)).flat();

        const formattedOperations = filterOperations(formattedSequenceMethod);
        operationsRef.current = formattedOperations;
        indexRef.current = 0;

        startExecution();
    };

    const startExecution = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setValue("executingCurrentBlock", operationsRef.current[indexRef.current]);

            setValue("activeBlockIndex", operationsRef.current[indexRef.current].blockIndex);

            indexRef.current++;

            if (indexRef.current >= operationsRef.current.length) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setStatus("idle");
            }
        }, 1000);

        setStatus("running");
    };

    const handleRun = () => {
        const selectedBlock = watch("selectedBlocks");

        const blocksWithMethodDetails = selectedBlock.map((el) => ({
            ...el,
            method: { ...el.method, ...getMethodDetailsById(el.method.id) },
        }));

        setValue("showConfigurationCard", false);

        formatSequenceOperation(blocksWithMethodDetails);
    };

    const handlePause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setStatus("paused");
        }
        setValue("showConfigurationCard", false);
    };

    const handleResume = () => {
        if (status === "paused") {
            startExecution();
        }
        setValue("showConfigurationCard", false);
    };

    const handleStop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        indexRef.current = 0;
        setValue("executingCurrentBlock", null);
        setStatus("idle");
        setValue("showConfigurationCard", true);
    };

    const handleReset = () => {
        handleStop();
    };

    return (
        <div className="bg-gradient-to-r from-neutral-100 to-neutral-200 p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-neutral-800">Control Panel</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setValue("showConfigurationCard", !watch("showConfigurationCard"))}
                        className={`${buttonClasses.base} bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <Settings className="mr-2" size={20} /> Configuration
                    </button>

                    {status === "idle" && (
                        <button
                            disabled={!watch("selectedBlocks") || watch("selectedBlocks")?.length === 0}
                            onClick={handleRun}
                            className={`${buttonClasses.base} ${buttonClasses.run} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            <Play className="mr-2" size={20} /> Run
                        </button>
                    )}
                    {status === "running" && (
                        <button onClick={handlePause} className={`${buttonClasses.base} ${buttonClasses.pause}`}>
                            <Pause className="mr-2" /> Pause
                        </button>
                    )}
                    {status === "paused" && (
                        <button onClick={handleResume} className={`${buttonClasses.base} ${buttonClasses.resume}`}>
                            <Play className="mr-2" /> Resume
                        </button>
                    )}
                    {status !== "idle" && (
                        <button onClick={handleStop} className={`${buttonClasses.base} ${buttonClasses.stop}`}>
                            <Square className="mr-2" /> Stop
                        </button>
                    )}
                    <button onClick={handleReset} className={`${buttonClasses.base} ${buttonClasses.reset}`}>
                        <RotateCcw className="mr-2" /> Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
