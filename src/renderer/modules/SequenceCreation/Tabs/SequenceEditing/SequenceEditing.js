import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../../../../Components/Input/Input";
import { useWindowSize } from "@uidotdev/usehooks";

const se =
    "A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG A G TGCT A CGA T GCACTG GCTAGC G G G T T T T TTTT GCGA T CAACT TG ";

export default function SequenceEditing(props) {
    const { index } = props;

    const { control, setValue, watch } = useFormContext();

    const setSelectedBlocks = (blocks) => setValue("selectedBlock", blocks);

    const handleSelection = (event) => {
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        if (selectedText.trim() === "") {
            setSelectedBlocks([]);
            return;
        }

        const selectedBlocks = [];
        let currentIndex = 0;
        let currentBlock = "";

        for (let i = 0; i < textarea.value.length; i++) {
            if (i >= start && i < end) {
                currentBlock += textarea.value[i];
            }
            if (textarea.value[i] === " " || i === textarea.value.length - 1) {
                if (currentBlock.trim() !== "") {
                    selectedBlocks.push(currentIndex);
                }
                currentIndex++;
                currentBlock = "";
            }
        }

        setSelectedBlocks(selectedBlocks);
    };

    const { height: windowHeight } = useWindowSize();

    return (
        <>
            <div className="w-1/2 pr-4 border-r border-neutral-300 overflow-auto no-scrollbar" style={{ height: windowHeight - (index !== undefined ? 172 : 100) }}>
                <label className="block text-gray-700 text-sm font-bold">Log File</label>
                <p className="italic text-neutral-500 text-sm mb-2">(It will be name of below sequence)</p>

                <InputField
                    control={control}
                    name={index !== undefined ? `sequence.${index}.name` : "name"}
                    borderClass="border border-neutral-400"
                    placeholder="Enter log file"
                    wrapperClassName="mb-4"
                    rules={{ required: "Please enter log file" }}
                    key={`${index}.name`}
                />

                <label className="block text-gray-700 text-sm font-bold">Sequence</label>
                <p className="italic text-neutral-500 text-sm mb-2">(Enter Sequence Here)</p>

                <Controller
                    key={index}
                    control={control}
                    name={index !== undefined ? `sequence.${index}.sequenceString` : "sequenceString"}
                    rules={{ required: "Sequence can't be empty, enter sequence" }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="relative">
                            <textarea
                                {...field}
                                value={field.value ?? ""}
                                placeholder="Enter sequence here"
                                rows={index !== undefined ? 20 : 22}
                                className={`shadow appearance-none border border-neutral-400 scrollbar-style rounded-lg w-full py-2 px-3 text-neutral-700 focus:outline-none focus:shadow-outline ${
                                    error ? "border-red-500 placeholder:text-red-500" : "border-gray-300"
                                }`}
                                onSelect={handleSelection}
                            />

                            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />
            </div>
        </>
    );
}
