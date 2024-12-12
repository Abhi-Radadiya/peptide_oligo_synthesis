import React, { useEffect, useState } from "react";
import { SelectionController } from "../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import { wasteMenuItems } from "../../MethodSetup2/Constant";
import RadioButton from "../../../Components/FormController/RadioButton";
import { Button } from "../../../Components/Buttons/Buttons";
import GeneralModel from "../Model/GeneralModel";
import { useSelector } from "react-redux";

export default function SingleSynthesisRun() {
    const { control, watch, setValue } = useFormContext();

    const radio3 = [
        { label: "3'", value: "3" },
        { label: "5'", value: "5" },
    ];

    const resinOption = [
        { label: "Standard", value: "standard" },
        { label: "Universal", value: "universal" },
    ];

    const [openModel, setOpenModel] = useState(null);

    const processMenuItem = [
        { label: "Oxidization", value: "oxidization" },
        { label: "Sulfurization", value: "sulfurization" },
        { label: "Cap A", value: "capA" },
        { label: "Cap B", value: "capB" },
        { label: "Act", value: "act" },
        { label: "Extra", value: "extra" },
    ];

    const columnEditor = useSelector((state) => state.columnEditor.positions);

    const containerMenuItem = columnEditor.map((el) => ({ value: el.id, label: el.name }));

    const method = useSelector((state) => state.methodSetup.method);

    const methodMenuItem = method.map((el) => ({ value: el.id, label: el.method_name }));

    const sequence = useSelector((state) => state.sequence.sequence);

    const sequenceMenuItem = sequence.map((el) => ({ value: el.id, label: el.name }));

    useEffect(() => {
        if (!watch("method")?.value) return;

        const selectedMethod = method.find((el) => el.id === watch("method")?.value);

        Object.keys(selectedMethod).map((key, index) => {
            setValue(key, selectedMethod[key]);

            console.log(`key, value : `, key, selectedMethod[key]);
            return null;
        });
    }, [watch("method")]);

    return (
        <>
            <div className="grid gap-6 grid-cols-4">
                <div className="">
                    <label htmlFor="" className="font-semibold text-gray-900">
                        Column
                    </label>
                    <SelectionController
                        control={control}
                        height={44}
                        name="columnNo"
                        placeholder="Select column"
                        isClearable={false}
                        menuItem={wasteMenuItems}
                        rules={{ required: "Please select column" }}
                    />
                </div>

                <div className="">
                    <label htmlFor="" className="font-semibold text-gray-900">
                        Container
                    </label>
                    <SelectionController
                        control={control}
                        height={44}
                        name="container"
                        placeholder="Select container"
                        isClearable={false}
                        menuItem={containerMenuItem}
                        rules={{ required: "Please select container" }}
                    />
                </div>
                <div className="">
                    <label htmlFor="" className="font-semibold text-gray-900">
                        Method
                    </label>
                    <SelectionController
                        control={control}
                        height={44}
                        name="method"
                        placeholder="Select method"
                        isClearable={false}
                        menuItem={methodMenuItem}
                        rules={{ required: "Please select method" }}
                    />
                </div>

                <div className="">
                    <label htmlFor="" className="font-semibold text-gray-900">
                        Process
                    </label>
                    <SelectionController control={control} menuItem={processMenuItem} height={41.6} name="process" placeholder="Select process" />
                </div>

                <div className="">
                    <label htmlFor="" className="font-semibold text-gray-900">
                        Sequence
                    </label>
                    <SelectionController control={control} menuItem={sequenceMenuItem} height={41.6} name="sequence" placeholder="Select sequence" />
                </div>

                <RadioButton buttons={radio3} control={control} name="3" header="Option" />

                <RadioButton header="Resin" buttons={resinOption} control={control} name="resinOption" />

                <Button label="RUN" bgClassName="bg-green-300 h-[42px] mt-6 border border-green-400" />
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

            {openModel && <GeneralModel openModel={openModel} onClose={() => setOpenModel(null)} />}
        </>
    );
}
