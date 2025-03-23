import { Check, Pencil, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";

export default function SingleSensingValveBlock(props) {
    const { valveName, valveValue, valveMenuItem } = props;

    const [isModify, setIsModify] = useState(false);

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            bottleName: "",
            selectedContainer: "",
            selectedValve: ""
        }
    });

    const handleSaveName = () => {};

    const selectionName = `valveName.${valveName}`;

    const handleModify = () => {
        setValue(selectionName, valveValue);

        setIsModify(true);
    };

    return (
        <>
            <div className="flex items-center border bg-neutral-100 border-neutral-300 rounded-lg justify-between p-3 text-neutral-700 mb-2">
                <div className="flex items-center flex-1 min-w-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <span className="font-normal text-sm">
                        Name : <strong className="">{valveName}</strong>
                    </span>

                    <strong className="mx-4">|</strong>

                    <span className="font-normal text-sm flex-shrink-0">
                        Valve : <strong>{valveValue.label}</strong>
                    </span>

                    <SelectionController width={300} height={40} placeholder="Select Board Type" label="Board Type" menuItem={valveMenuItem} name="boardType" control={control} />
                </div>

                {isModify ? (
                    <>
                        <button
                            onClick={handleSubmit(handleSaveName)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-green-300"
                        >
                            <Check className="h-5 w-5 text-green-500" />
                        </button>
                        <button
                            onClick={() => setIsModify(false)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-red-300"
                        >
                            <X className="h-5 w-5 text-red-500" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleModify}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-blue-300"
                        >
                            <Pencil className="h-5 w-5 text-blue-700" />
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
