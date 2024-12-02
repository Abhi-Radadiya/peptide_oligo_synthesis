import React, { useRef } from "react";
import { Button } from "../../../../Components/Buttons/Buttons";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../../../../Components/Input/Input";

const se =
    "A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG ";

export default function SequenceEditing(props) {
    const { setActiveTab } = props;

    const { clearErrors, handleSubmit, setValue, control, watch } = useFormContext();

    const onSubmit = () => {
        setActiveTab("method-assign");
        const blocksArray = watch("sequence")
            ?.trim()
            ?.split(/\s+/)
            ?.map((block) => ({ block, method: null }));

        setValue("block", blocksArray);
    };

    const fileInputRef = useRef(null);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                setValue("sequence", fileContent);
            };
            setValue("logFile", file?.name?.split(".txt")?.[0]);
            clearErrors("sequence");
            reader.readAsText(file);
        }
    };

    const saveTextFile = () => {
        const blob = new Blob([watch("sequence")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `logFile.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <div className="mb-4 mt-4">
                <div className="flex justify-between flex-row mb-4">
                    <div className="flex flex-row item-center gap-4">
                        <Button label="Import sequence" onClick={handleFileButtonClick} bgClassName="bg-indigo-200 hover:bg-indigo-300" />
                        <input type="file" accept=".txt" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                        <Button label="Export sequence" onClick={saveTextFile} bgClassName="bg-green-200 hover:bg-green-300" />
                    </div>

                    <Button label="Generate Blocks" bgClassName="bg-amber-200 hover:bg-amber-300" onClick={() => handleSubmit(onSubmit)()} />
                </div>

                <InputField
                    control={control}
                    labelClassName="text-neutral-700 text-base font-medium"
                    name="logFile"
                    label="Log File"
                    borderClass="border border-neutral-400"
                    placeholder="Enter log file"
                    wrapperClassName="mb-4"
                />

                <label className="mb-2 block text-neutral-700 text-base font-medium">Sequence</label>

                <Controller
                    control={control}
                    name="sequence"
                    rules={{ required: "Sequence can't be empty, enter sequence" }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="relative">
                            <textarea
                                {...field}
                                value={field.value ?? ""}
                                placeholder="Enter sequence here"
                                rows="21"
                                className={`shadow appearance-none border border-neutral-400 scrollbar-style rounded-lg w-full py-2 px-3 text-neutral-700 focus:outline-none focus:shadow-outline ${
                                    error ? "border-red-500 placeholder:text-red-500" : "border-gray-300"
                                }`}
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />
            </div>
        </>
    );
}
