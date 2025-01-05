import React, { useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import RunSpecificBlocksModel from "../RunSequence/Model/RunSpecificBlocksModel";
import DisplayMethodDetails from "./Component/DisplayMethodDetails";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import Header from "./Component/Header";

export default function RunningSynthesis() {
    const { watch } = useFormContext();

    const [printingState, setPrintingState] = useState({
        blocks: [],
        currentIndex: 0,
        isPrinting: false,
        startIndex: 0,
        endIndex: 0,
        activeButton: null,
    });

    const [showRunSpecificBlockModel, setShowRunSpecificBlockModel] = useState(false);

    const allSequence = useSelector((state) => state.sequence.sequence);

    const handleRun = () => {
        setShowRunSpecificBlockModel(false);

        const selectedSequence = allSequence?.find((el) => el.id === watch("sequence")?.value);

        if (selectedSequence && selectedSequence.block) {
            setPrintingState((prevState) => ({
                ...prevState,
                blocks: selectedSequence.block,
                currentIndex: prevState.startIndex,
                isPrinting: true,
                activeButton: "run",
            }));
        }
    };

    const handlePause = () => setPrintingState((prev) => ({ ...prev, isPrinting: false, activeButton: "pause" }));

    const handleResume = () => setPrintingState((prev) => ({ ...prev, isPrinting: true, activeButton: "resume" }));

    const handleStop = () => setPrintingState((prevState) => ({ ...prevState, blocks: [], currentIndex: 0, isPrinting: false, activeButton: "stop" }));

    // const handlePressRun = () => {
    //     setShowRunSpecificBlockModel(true);
    // };

    const { setValue, control } = useFormContext();

    const [currentBlock, setCurrentBlock] = useState(null);

    const { blocks, currentIndex, isPrinting, startIndex, endIndex } = printingState;

    useEffect(() => {
        let interval;

        if (isPrinting && blocks.length > currentIndex && currentIndex >= startIndex && currentIndex <= endIndex) {
            interval = setInterval(() => {
                const currentBlock = blocks[currentIndex];

                setCurrentBlock(currentBlock);

                setValue("currentExecutedBlock", currentBlock);

                setPrintingState((prevState) => ({
                    ...prevState,
                    currentIndex: prevState.currentIndex + 1,
                }));
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isPrinting, currentIndex, blocks, startIndex, endIndex]);

    const methods = useSelector((state) => state.methodSetup.method);

    const selectedMethodData = methods?.find((el) => el.id === currentBlock?.method?.value);

    const optionMenuItem = useMemo(
        () => [
            {
                label: "Details",
                options: [{ label: "Details", value: "details" }],
            },
            {
                label: "First",
                options: [{ label: "Column wash", value: "first_wash" }],
            },
            {
                label: "Nth",
                options: [
                    { label: "De block", value: "n_block" },
                    { label: "Coupling", value: "n_coupling" },
                    { label: "Oxidization", value: "n_oxidization", isDisabled: !selectedMethodData?.hasOxidization },
                    { label: "Capping", value: "n_capping" },
                    { label: "Sulfurization", value: "n_sulfurization", isDisabled: !selectedMethodData?.hasSulfurization },
                    { label: "Extra", value: "n_extra", isDisabled: !selectedMethodData?.hasExtra },
                ],
            },
            {
                label: "Last",
                options: [
                    { label: "De block", value: "last_deBlock" },
                    { label: "DEA", value: "last_dea" },
                ],
            },
        ],
        [selectedMethodData?.hasOxidization, selectedMethodData?.hasSulfurization, selectedMethodData?.hasExtra]
    );

    return (
        <>
            <div className="space-y-4 w-full">
                <Header
                    printingState={printingState}
                    handlePressRun={() => setShowRunSpecificBlockModel(true)}
                    handlePause={handlePause}
                    handleResume={handleResume}
                    handleStop={handleStop}
                    currentBlock={currentBlock}
                    selectedMethodData={selectedMethodData}
                />

                <div className="flex flex-row justify-between items-center">
                    {currentBlock ? (
                        <p>
                            <strong>Block:</strong> {currentBlock.block}
                            <strong className="ml-8">Method:</strong> {currentBlock?.method?.label}
                        </p>
                    ) : (
                        <p>No block being processed.</p>
                    )}
                    <SelectionController name="selectedOptionToDisplay" control={control} placeholder="Select option" className="w-[230px]" menuItem={optionMenuItem} />
                </div>

                <DisplayMethodDetails currentBlock={currentBlock} />
            </div>

            {showRunSpecificBlockModel && (
                <RunSpecificBlocksModel handleRun={handleRun} setPrintingState={setPrintingState} onClose={() => setShowRunSpecificBlockModel(false)} />
            )}
        </>
    );
}

const data = {
    id: "e8c86c8f-7d86-4335-9399-d923f6faed1b",
    color: "#971c7d",
    method_name: "METHOD XYZ",
    columnSize: {
        label: "20 MLS",
        value: {
            id: "d3f8dd6d-7536-4ff4-a563-7bf777d0c179",
            volume: "20",
            flowRate: "20",
        },
    },
    synthesisScale: "12",
    loadingTime: "23",
    amediteExcessFactor: "45",
    actExcessFactor: "56",
    amediteConcentration: "5",
    actVolume: 137.45,
    amediteVolume: 108,
    deliveryTimeAct: 4.696,
    totalCouplingVolume: 245.45,
    deliveryTimeAmedite: 5.976,

    "1_waste": { label: 1, value: 1 },
    "1_XFactor": 1,
    "1_volume": "20",
    "1_solvent": {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    "1_flowRate": "120",

    n_deWaste: { label: 1, value: 1 },
    n_couplingWaste: { label: 1, value: 1 },
    n_oxidizationWaste: { label: 1, value: 1 },
    n_sulfurizationWaste: { label: 1, value: 1 },
    n_extraWaste: { label: 1, value: 1 },
    n_cappingWaste: { label: 1, value: 1 },
    last_deWaste: { label: 1, value: 1 },
    last_deaWaste: { label: 1, value: 1 },
    last_deaXFactor: 1,
    last_deaWashXFactor: 1,
    last_deXFactor: 1,
    last_deWashXFactor: 1,
    n_deXFactor: 1,
    n_deWashXFactor: 1,
    n_couplingXFactor: 1,
    n_couplingWashXFactor: 1,
    n_oxidizationXFactor: 1,
    n_oxidizationWashXFactor: 1,
    n_sulfurizationXFactor: 1,
    n_sulfurizationWashXFactor: 1,
    n_extraXFactor: 1,
    n_extraWashXFactor: 1,
    n_cappingAXFactor: 1,
    n_cappingBXFactor: 1,
    n_cappingWashXFactor: 1,
    hasOxidization: true,

    n_deVolume: "20",
    n_deWashVolume: "20",
    n_couplingVolume: "20",
    n_couplingAmediteVolume: "20",
    n_couplingActVolume: "20",
    n_couplingWashVolume: "20",
    n_oxidizationVolume: "20",
    n_oxidizationWashVolume: "20",
    n_sulfurizationVolume: "20",
    n_sulfurizationWashVolume: "20",
    n_extraVolume: "20",
    n_extraWashVolume: "20",
    n_cappingAVolume: 54,
    n_cappingBVolume: 54,
    n_cappingWashVolume: "20",

    n_deSolvent: {
        label: "Amedite 2",
        value: "d60815e6-793b-4154-a46c-3cf8c68e9271",
    },
    n_deFlowRate: "22",
    n_deWashSolvent: {
        label: "Amedite 2",
        value: "d60815e6-793b-4154-a46c-3cf8c68e9271",
    },
    n_deWashFlowRate: "22",
    n_couplingSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_couplingFlowRate: "12",
    n_couplingMixTime: "20",
    n_couplingWashSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_couplingWashFlowRate: "12",
    n_oxidizationSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_oxidizationFlowRate: "12",
    n_oxidizationWashSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_oxidizationWashFlowRate: "12",
    n_cappingASolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_cappingAFlowRate: "12",
    n_cappingBSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    n_cappingBFlowRate: "12",
    n_cappingWashSolvent: {
        label: "Amedite 2",
        value: "d60815e6-793b-4154-a46c-3cf8c68e9271",
    },
    n_cappingWashFlowRate: "22",

    last_deSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    last_deFlowRate: "12",
    last_deWashSolvent: {
        label: "Amedite 1",
        value: "d83ef78c-85d1-48d1-9f0a-b2633734faed",
    },
    last_deWashFlowRate: "12",
    last_deaSolvent: {
        label: "Amedite 3",
        value: "9f44ee15-f48f-4731-8bcb-6eb7565833ed",
    },
    last_deaFlowRate: "55",
    last_deaWashSolvent: {
        label: "Amedite 2",
        value: "d60815e6-793b-4154-a46c-3cf8c68e9271",
    },
    last_deaWashFlowRate: "22",
    last_deVolume: "20",
    last_deWashVolume: "20",
    last_deaVolume: "20",
    last_deaWashVolume: "20",
};
