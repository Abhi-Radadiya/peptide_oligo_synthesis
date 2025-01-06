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
import ConfirmGenerateBlock from "./Model/ConfirmGenerateBlock/ConfirmGenerateBlock";
import { getUniqueId } from "../../Helpers/Constant";
import { updateFormState } from "../../../redux/reducers/formState/formState";
import ConfirmationPopup from "../../Components/Popup/ConfirmationPopup";
import { openToast } from "../../../redux/reducers/toastStateReducer/toastStateReducer";
import { SUCCESS } from "../../Helpers/Icons";

export default function SequenceCreation() {
    const { id } = useParams();

    const method = useForm({ defaultValues: { blockOption: "1", sequenceString: "", name: "" } });

    const {
        watch,
        setValue,
        clearErrors,
        handleSubmit,
        setError,
        formState: { isDirty },
    } = method;

    const fileInputRef = useRef(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const sequence = useSelector((state) => state.sequence.sequence);

    const [showGenerateBlockModel, setShowGenerateBlockModel] = useState(false);

    const [isShowImportModel, setIsShowImportModel] = useState(false);

    const [showConfirmationModelLeftMethodAssign, setShowConfirmationModelLeftMethodAssign] = useState(false);

    useEffect(() => {
        dispatch(updateFormState(isDirty));

        if (watch("sequence")?.length === 0 && watch("sequenceString")?.length === 0) {
            dispatch(updateFormState(false));
        }
    }, [isDirty]);

    useEffect(() => {
        if (!id) return;

        const selectedSequence = sequence.find((el) => el.id === id);

        if (!selectedSequence) return;

        setValue("sequenceString", selectedSequence.sequenceString);

        setValue("name", selectedSequence.name);

        setValue("block", selectedSequence.block);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const saveSequence = async () => {
        const sequence = {
            id: getUniqueId(),
            name: watch("name"),
            block: watch("block"),
            sequenceString: watch("sequenceString"),
        };

        try {
            id
                ? await dispatch(editSequence({ id: id, name: watch("name"), block: watch("block"), sequenceString: watch("sequenceString") }))
                : await dispatch(addSequence(sequence));

            dispatch(openToast({ text: "Sequence saved successfully.", icon: SUCCESS }));

            navigate("/available-sequence");
        } catch (error) {
            if (error.message === "Sequence with the same name already exists.") {
                setError(`name`, {
                    type: "manual",
                    message: "Name already exists!",
                });
            } else {
                console.log(`error : `, error);
            }
            console.log(`error handleAddSequence : `, error);
        } finally {
            setShowConfirmationModelLeftMethodAssign(false);
        }
    };

    const handleAddSequence = async () => {
        const hasMissingMethod = watch("block").some((element) => !element.method);

        if (hasMissingMethod) {
            setShowConfirmationModelLeftMethodAssign(true);
            return;
        }

        saveSequence();
    };

    // const setSequenceString = () => {
    //     const cleanedSequenceString = watch("sequenceString").replace(/\s+/g, "");

    //     const blockOption = watch("blockOption");

    //     let optionSeparatedSequenceString;

    //     if (blockOption === "3") {
    //         const blocks = cleanedSequenceString.match(/.{1,3}/g);
    //         optionSeparatedSequenceString = blocks.join(" ");
    //     } else {
    //         optionSeparatedSequenceString = cleanedSequenceString.split("").join(" ");
    //     }

    //     setValue("sequenceString", optionSeparatedSequenceString);

    //     console.log(
    //         "=:= ",
    //         optionSeparatedSequenceString
    //             .split(" ")
    //             .filter(Boolean)
    //             .map((block, index) => ({ block, index }))
    //     );

    // setValue(
    //     "block",
    //     optionSeparatedSequenceString
    //         .split(" ")
    //         .filter(Boolean)
    //         .map((block, index) => ({ block, index }))
    // );
    // };

    const setSequenceString = () => {
        const sequenceStringArray = watch("sequenceString").split(" ");

        const blockOption = watch("blockOption");
        if (blockOption === "1") {
            const block = sequenceStringArray.filter(Boolean).map((block, index) => ({ block: [block], index }));

            setValue("block", block);

            setValue("sequenceString", watch("sequenceString"));
        } else {
            let blockArray = [];

            for (let index = 0; index < sequenceStringArray.length / 3 + 1; index++) {
                const element1 = sequenceStringArray[index * 3];
                const element2 = sequenceStringArray[index * 3 + 1];
                const element3 = sequenceStringArray[index * 3 + 2];

                if (!element1) break;

                const combine3Element = [element1, element2, element3];

                blockArray.push(combine3Element.filter(Boolean));
            }

            const flatMapArray = blockArray.map((el) => el.join(""));

            setValue("sequenceString", flatMapArray.join(" "));

            const block = blockArray.filter(Boolean).map((block, index) => ({ block: [...block], index }));

            setValue("block", block);
        }

        clearErrors("invalidSequenceBlock");
    };

    return (
        <>
            <FormProvider {...method}>
                <div className="px-4">
                    <div className="flex justify-between flex-row mb-4 pb-4 border-b border-neutral-800 sticky top-0 pt-4 bg-white z-10">
                        <div className="flex flex-row item-center gap-4">
                            <Button label="Import sequence" onClick={() => setIsShowImportModel(true)} bgClassName="bg-indigo-200 hover:bg-indigo-300" />
                            <input type="file" accept=".txt" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                        </div>

                        {!watch("sequence")?.length && (
                            <div className="flex flex-row item-center gap-4">
                                <Button
                                    label="Generate Blocks"
                                    bgClassName="bg-amber-200 hover:bg-amber-300"
                                    onClick={() => handleSubmit(() => setShowGenerateBlockModel(true))()}
                                />

                                <Button label="Save" disabled={!watch("block")?.length} onClick={() => handleSubmit(handleAddSequence)()} />
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
                </div>

                {isShowImportModel && (
                    <ImportSequenceModel
                        onClose={() => {
                            setIsShowImportModel(false);
                        }}
                    />
                )}
                {showGenerateBlockModel && <ConfirmGenerateBlock setSequenceString={setSequenceString} onClose={() => setShowGenerateBlockModel(false)} />}
            </FormProvider>

            <ConfirmationPopup
                isOpen={showConfirmationModelLeftMethodAssign}
                header="Confirm Save"
                desc={`Some blocks are left where any method isn't assigned. Are you sure to save ? `}
                closePopup={() => setShowConfirmationModelLeftMethodAssign(false)}
                handleConfirm={saveSequence}
            />
        </>
    );
}
