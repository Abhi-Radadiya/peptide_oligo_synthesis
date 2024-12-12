import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../Components/Buttons/Buttons";
import { FormProvider } from "react-hook-form";
import SequenceEditing from "./Tabs/SequenceEditing/SequenceEditing";
import MethodAssign from "./Tabs/MethodAssign/MethodAssign";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ImportSequenceModel from "./Model/ImportSequenceModel/ImportSequenceModel";
import SequenceTab from "./SequenceTab/SequenceTab";
import { addSequence, editSequence } from "../../../redux/reducers/sequenceReducer";

export default function SequenceCreation() {
    const { id } = useParams();

    const method = useForm();

    const { watch, setValue, clearErrors, handleSubmit } = method;

    const generateBlock = () => {
        setValue(
            "block",
            watch("sequenceString")
                .split(" ")
                .filter(Boolean)
                .map((block, index) => ({ block, index }))
        );
    };

    const fileInputRef = useRef(null);

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

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const sequence = useSelector((state) => state.sequence);

    const handleAddSequence = async () => {
        const newSequence = {
            id: Date.now(),
            name: watch("name"),
            block: watch("block"),
        };

        try {
            id ? await dispatch(editSequence(id, { name: watch("name"), block: watch("block") })) : await dispatch(addSequence(newSequence));

            navigate("/available-sequence");
        } catch (error) {
            console.log(`error handleAddSequence : `, error);
            alert(error.message);
        }
    };

    useEffect(() => {
        if (!id) return;

        const selectedSequence = sequence.find((el) => el.id === id);

        if (!selectedSequence) return;

        setValue("sequenceString", selectedSequence?.block?.map((item) => item.block).join(" "));

        setValue("name", selectedSequence.name);

        setValue("block", selectedSequence.block);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isShowImportModel, setIsShowImportModel] = useState(false);

    return (
        <>
            <FormProvider {...method}>
                <div className="px-4">
                    <div className="flex justify-between flex-row mb-4 pb-4 border-b border-neutral-800 sticky top-0 pt-4 bg-white z-10">
                        <div className="flex flex-row item-center gap-4">
                            <Button label="Import sequence" onClick={() => setIsShowImportModel(true)} bgClassName="bg-indigo-200 hover:bg-indigo-300" />
                            <input type="file" accept=".txt" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                            <Button label="Export sequence" onClick={saveTextFile} bgClassName="bg-green-200 hover:bg-green-300" />
                        </div>

                        {!watch("sequence")?.length && (
                            <div className="flex flex-row item-center gap-4">
                                <Button label="Generate Blocks" bgClassName="bg-amber-200 hover:bg-amber-300" onClick={() => handleSubmit(generateBlock)()} />

                                <Button label="Save" onClick={() => handleSubmit(handleAddSequence)()} />
                            </div>
                        )}
                    </div>

                    {!!watch("sequence")?.length ? (
                        <SequenceTab />
                    ) : (
                        <div className="flex flex-row w-full relative mt-4">
                            <SequenceEditing />
                            <MethodAssign />
                        </div>
                    )}

                    {/* {fields.map((el, index) => {
                        return (
                            <div className="flex flex-row w-full relative mb-4 pb-2 border-b border-neutral-900" key={index}>
                                <SequenceEditing id={el.id} index={index} />
                                <MethodAssign id={el.id} index={index} />
                            </div>
                        );
                    })} */}
                </div>

                {isShowImportModel && (
                    <ImportSequenceModel
                        onClose={() => {
                            setIsShowImportModel(false);
                        }}
                    />
                )}
            </FormProvider>
        </>
    );
}
