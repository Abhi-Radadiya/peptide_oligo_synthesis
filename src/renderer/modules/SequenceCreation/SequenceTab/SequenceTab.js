import React, { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import SequenceEditing from "../Tabs/SequenceEditing/SequenceEditing";
import MethodAssign from "../Tabs/MethodAssign/MethodAssign";
import { Button } from "../../../Components/Buttons/Buttons";
import { ReactComponent as TrashIcon } from "../../../Assets/trash.svg";
import ConfirmationPopup from "../../../Components/Popup/ConfirmationPopup";
import { Selection } from "../../../Components/Dropdown/Dropdown";
import { useDispatch } from "react-redux";
import { addSequence } from "../../../../redux/actions";

export default function SequenceTab() {
    const { watch, handleSubmit, setValue } = useFormContext();

    const [deleteSelectedTab, setDeleteSelectedTab] = useState(null);

    const handleRemove = () => {
        setValue(
            "sequence",
            watch("sequence").filter((el, idx) => deleteSelectedTab !== idx)
        );
        setShowConfirmDeleteModel(false);
    };

    const [activeTab, setActiveTab] = useState(null);

    const sequence = useWatch({ name: "sequence" });

    const tabs = useMemo(() => {
        return sequence.map((el, index) => ({
            label: el.name,
            value: index,
            className: "w-[40%]",
            rightIcon: (
                <TrashIcon
                    stroke={activeTab !== index ? "red" : "white"}
                    onClick={() => {
                        setDeleteSelectedTab(index);
                        setShowConfirmDeleteModel(true);
                    }}
                />
            ),
        }));
    }, [sequence, activeTab]);

    useEffect(() => {
        if (!activeTab) setActiveTab(tabs[0]);
    }, [sequence]);

    const activeTabIndex = useMemo(() => tabs?.findIndex((el) => el.value === activeTab?.value), [activeTab]);

    const [showConfirmDeleteModel, setShowConfirmDeleteModel] = useState(false);

    const generateBlock = () => {
        const selectedSequence = watch("sequence").find((_, index) => index === activeTabIndex)?.sequenceString;

        const generatedBlock = selectedSequence
            .split(" ")
            .filter(Boolean)
            .map((block, index) => ({ block, index }));

        const newSequence = watch("sequence").map((el, index) => {
            return { ...el, ...(index === activeTabIndex ? { block: generatedBlock } : {}) };
        });

        setValue("sequence", newSequence);
    };

    const dispatch = useDispatch();

    const handleSaveSequence = async () => {
        const selectedSequence = watch("sequence")[activeTabIndex];

        try {
            await dispatch(addSequence(selectedSequence));

            setValue(
                "sequence",
                sequence.filter((_, index) => index !== activeTabIndex)
            );

            setActiveTab(tabs[0]);
        } catch (error) {
            console.log(`error : `, error);
            alert(JSON.stringify(error.message));
        }
    };

    return (
        <>
            <div className="flex flex-row justify-between pb-4 mb-4 border-b border-neutral-300">
                <div className="w-[47vw] flex gap-6 flex-row items-center">
                    <label className="" htmlFor="">
                        Select sequence :
                    </label>
                    <div className="w-[50%]">
                        <Selection onChange={setActiveTab} menuItem={tabs} value={activeTab} placeholder="Select sequence to assign method" isClearable={false} />
                    </div>
                </div>

                <div className="flex flex-row item-center gap-4">
                    <Button label="Generate Blocks" bgClassName="bg-amber-200 hover:bg-amber-300" onClick={() => handleSubmit(generateBlock)()} />

                    <Button label="Save" onClick={() => handleSubmit(handleSaveSequence)()} />
                </div>
            </div>

            <div className="flex flex-row w-full relative mt-4 pb-2">
                <SequenceEditing index={activeTabIndex} />
                <MethodAssign index={activeTabIndex} />
            </div>

            <ConfirmationPopup
                isOpen={showConfirmDeleteModel}
                header="Delete sequence !"
                desc={`Are you sure want to delete ${watch("sequence")[deleteSelectedTab]?.name} ?`}
                width="w-[35%]"
                handleConfirm={handleRemove}
                closePopup={() => setShowConfirmDeleteModel(false)}
            />
        </>
    );
}
