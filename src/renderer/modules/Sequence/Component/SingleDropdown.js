import React, { useState } from "react";
import { SelectionController } from "../../../Components/Dropdown/Dropdown";
import { useFormContext } from "react-hook-form";
import { wasteMenuItems } from "../../MethodSetup2/Constant";
import { testMethodData } from "../../Methods/Methods";
import RadioButton from "../../../Components/FormController/RadioButton";
import { Button } from "../../../Components/Buttons/Buttons";

export default function SingleDropdown() {
    const { control, watch } = useFormContext();

    const [files, setFiles] = useState([]);

    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    };

    const radio3 = [
        { label: "3'", value: "3" },
        { label: "5'", value: "5" },
    ];

    const resinOption = [
        { label: "Standard", value: "standard" },
        { label: "Universal", value: "universal" },
    ];

    return (
        <div className="flex flex-row items-center justify-between">
            <SelectionController
                control={control}
                hight={45.6}
                name="columnNo"
                placeholder="Select Column"
                isClearable={false}
                menuItem={wasteMenuItems}
                rules={{ required: "Please select column" }}
            />
            <SelectionController
                control={control}
                hight={45.6}
                name="method"
                placeholder="Select Method"
                isClearable={false}
                menuItem={testMethodData.map((el) => ({ label: el.name, value: el.id }))}
                rules={{ required: "Please select method" }}
            />

            <div className="bg-neutral-100 px-2 py-1 rounded-lg flex flex-row justify-between">
                <input
                    type="file"
                    multiple
                    accept=".txt"
                    className="block cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                    onChange={handleFileUpload}
                />
            </div>

            <RadioButton className="flex flex-row gap-6 items-center bg-neutral-100 pl-4 rounded-lg" buttons={radio3} control={control} name="3" header="Option" />

            <RadioButton header="Resin" className="flex flex-row gap-6 items-center bg-neutral-100 pl-4 rounded-lg" buttons={resinOption} control={control} name="resinOption" />
            <Button label="RUN" />
        </div>
    );
}
