import React, { useState } from "react";
import { SelectionController } from "../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import { wasteMenuItems } from "../../MethodSetup2/Constant";
import { testMethodData } from "../../Methods/Methods";
import RadioButton from "../../../Components/FormController/RadioButton";
import { Button } from "../../../Components/Buttons/Buttons";
import FileUploadFlyout from "./FileUploadFlyout";
import GeneralModel from "../Model/GeneralModel";
import { useWindowSize } from "@uidotdev/usehooks";

export default function SingleSynthesisRun() {
    const { control } = useFormContext();

    const radio3 = [
        { label: "3'", value: "3" },
        { label: "5'", value: "5" },
    ];

    const resinOption = [
        { label: "Standard", value: "standard" },
        { label: "Universal", value: "universal" },
    ];

    const [inputCmd, setInputCmd] = useState("");

    const [flyoutOpen, setFlyoutOpen] = useState(false);

    const [openModel, setOpenModel] = useState(null);

    const baseMenuItem = [
        { label: "A", value: "a" },
        { label: "C", value: "c" },
        { label: "mA", value: "mA" },
        { label: "fC", value: "fC" },
    ];

    const { width: windowWidth } = useWindowSize();

    const processMenuItem = [
        { label: "Oxidization", value: "oxidization" },
        { label: "Sulfurization", value: "sulfurization" },
        { label: "Cap A", value: "capA" },
        { label: "Cap B", value: "capB" },
        { label: "Act", value: "act" },
        { label: "Extra", value: "extra" },
    ];

    return (
        <>
            <div className="grid gap-6 grid-cols-3">
                <SelectionController
                    control={control}
                    height={45.6}
                    name="columnNo"
                    placeholder="Select Column"
                    isClearable={false}
                    menuItem={wasteMenuItems}
                    rules={{ required: "Please select column" }}
                />

                <SelectionController
                    control={control}
                    height={45.6}
                    name="method"
                    placeholder="Select Method"
                    isClearable={false}
                    menuItem={testMethodData.map((el) => ({ label: el.name, value: el.id }))}
                    rules={{ required: "Please select method" }}
                />

                <SelectionController control={control} menuItem={processMenuItem} height={41.6} name="process" placeholder="Select process" />

                <RadioButton className="flex flex-row gap-6 items-center bg-neutral-100 pl-4 rounded-lg" buttons={radio3} control={control} name="3" header="Option" />

                <RadioButton
                    header="Resin"
                    className="flex flex-row gap-6 items-center bg-neutral-100 pl-4 rounded-lg"
                    buttons={resinOption}
                    control={control}
                    name="resinOption"
                />
                <div className="gap-4 flex flex-row w-full">
                    <Button
                        className="w-1/2"
                        bgClassName="bg-amber-200 border border-amber-400"
                        label={!inputCmd.length ? "Upload file" : "View file"}
                        onClick={() => setFlyoutOpen(true)}
                    />
                    <Button className="w-1/2" label="RUN" bgClassName="bg-green-300 border border-green-400" />
                </div>
            </div>

            <div className="border border-neutral-300 rounded-lg shadow-lg p-6 mt-10">
                <span className="font-bold text-neutral-500">View Details</span>

                <div className="grid gap-6 grid-cols-5 mt-6">
                    <Button label="Details" onClick={() => setOpenModel("details")} />

                    <Button label="De Block" onClick={() => setOpenModel("deBlock")} />

                    <Button label="Coupling" onClick={() => setOpenModel("coupling")} />

                    <Button label="Oxidization" onClick={() => setOpenModel("oxidization")} />

                    <Button label="Capping" onClick={() => setOpenModel("capping")} />

                    <Button label="Sulfurization" onClick={() => setOpenModel("sulfurization")} />

                    <Button label="Extra" onClick={() => setOpenModel("extra")} />
                </div>
            </div>
            {/* 
            <div className="fixed bottom-0 right-0 py-3">
                <div className="w-full flex justify-end pr-5"></div>
            </div> */}

            <FileUploadFlyout setInputCmd={setInputCmd} setFlyoutOpen={setFlyoutOpen} flyoutOpen={flyoutOpen} />

            {openModel && <GeneralModel openModel={openModel} onClose={() => setOpenModel(null)} />}
        </>
    );
}
