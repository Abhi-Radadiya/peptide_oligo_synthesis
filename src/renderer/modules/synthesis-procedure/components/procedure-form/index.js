import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Button } from "../../../../Components/Buttons/Buttons";
import { Trash2 } from "lucide-react";
import OperationDefinition from "./components/operation-definition";

export default function ProcedureForm() {
    const method = useForm({
        defaultValues: {
            processes: []
        }
    });

    const { control, handleSubmit } = method;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "processes"
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    console.log(`fields : `, fields);

    return (
        <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => {
                    return (
                        <div key={field.id} className="mb-4 p-4 border border-gray-400 rounded-lg">
                            <div className="flex justify-between items-center mb-4 border-b border-neutral-300 pb-4">
                                <span className="font-medium text-neutral-900"> {field.processType.label}</span>

                                <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {field?.processType?.value === "valveOperation" && (
                                <div className="flex flex-row items-center justify-between">
                                    <p>
                                        <span className="mr-2">Valve Type : </span>
                                        <strong>{field?.valveType?.[0]?.toUpperCase() + field?.valveType?.slice(1)}</strong>
                                    </p>
                                    |
                                    <p>
                                        <span className="mr-2">Valve : </span>
                                        <strong>{field?.selectedValve?.label?.[0].toUpperCase() + field?.selectedValve?.label?.slice(1)}</strong>
                                    </p>
                                </div>
                            )}

                            {field?.processType?.value === "pumpOperation" && (
                                <>
                                    <div className="flex flex-row items-center justify-between mb-2">
                                        <p>
                                            <span className="mr-2">Pump Number : </span>
                                            <strong>{field?.selectedPump?.value}</strong>
                                        </p>
                                        |
                                        <p>
                                            <span className="mr-2">Pump RPM : </span>
                                            <strong>{field?.pumpRPM}</strong>
                                        </p>
                                    </div>

                                    <p>
                                        <span className="mr-2">{field?.pumpTime ? "Pump Time" : "Pump Liquid"} : </span>
                                        <strong>{field?.pumpTime + " ms" ?? field?.liquidVolume + " ml"}</strong>
                                    </p>
                                </>
                            )}
                        </div>
                    );
                })}

                <OperationDefinition append={append} />

                {fields.length > 0 && <Button type="submit" label="Save Procedure" className="mt-4" bgClassName="bg-green-500" />}
            </form>
        </FormProvider>
    );
}
