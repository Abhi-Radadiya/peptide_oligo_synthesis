import React from "react";
import RadioButton from "../../../../../Components/FormController/RadioButton";
import { useForm,   } from "react-hook-form";
import { SelectionController } from "../../../../../Components/Dropdown/Dropdown";
import { Button } from "../../../../../Components/Buttons/Buttons";
import { Plus } from "lucide-react";

export default function ValveOperation(props) {
    const { append, processType } = props;

    const valveTypeFieldName = `valveType`;

    const valveType = [
        { label: "Amedite", value: "amedite" },
        { label: "Reagent", value: "reagent" },
        { label: "Waste", value: "waste" },
        { label: "Other", value: "other" }
    ];

    const valveDetails = {
        waste: [
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 }
        ],
        reagent: [
            { label: "Reagent 1", value: "reagent1" },
            { label: "Reagent 2", value: "reagent2" },
            { label: "Reagent 3", value: "reagent3" }
        ],

        amedite: [
            { label: "Amedite 1", value: "amedite1" },
            { label: "Amedite 2", value: "amedite2" },
            { label: "Amedite 3", value: "amedite3" }
        ],
        other: [
            { label: "Top Valve", value: "topValve" },
            { label: "Bottom Valve", value: "bottomValve" },
            { label: "RG Valve", value: "rgValve" },
            { label: "Waste Valve", value: "wasteValve" }
        ]
    };

    const { control, watch, setValue, reset } = useForm({ defaultValues: { [valveTypeFieldName]: "", selectedValve: "" } });

    const handleValveTypeChange = () => {
        setValue(`selectedValve`, "");
    };

    const addNewProcess = () => {
        append({ processType, valveType: watch("valveType"), selectedValve: watch("selectedValve") });
        reset();
    };

    return (
        <>
            <RadioButton handleRadioChange={handleValveTypeChange} className="space-y-1.5" buttons={valveType} control={control} name={valveTypeFieldName} header="Valve Type" />

            {watch(valveTypeFieldName) && (
                <SelectionController control={control} menuItem={valveDetails[watch(valveTypeFieldName)]} name={`selectedValve`} label="Select Valve" placeholder="Select Valve" />
            )}

            <Button className="ml-auto" type="button" label="Add Process" leftIcon={<Plus color="blue" />} bgClassName="bg-blue-400" onClick={addNewProcess} />
        </>
    );
}
