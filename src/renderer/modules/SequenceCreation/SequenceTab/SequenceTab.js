import React, { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import SequenceEditing from "../Tabs/SequenceEditing/SequenceEditing";
import MethodAssign from "../Tabs/MethodAssign/MethodAssign";
import { Button } from "../../../Components/Buttons/Buttons";
import { Selection } from "../../../Components/Dropdown/Dropdown";
import { useDispatch } from "react-redux";
import { addSequence } from "../../../../redux/reducers/sequenceReducer";

export default function SequenceTab() {
    const { watch, handleSubmit, setValue } = useFormContext();

    const [activeTab, setActiveTab] = useState(null);

    const sequence = useWatch({ name: "sequence" });

    const tabs = useMemo(() => {
        return sequence.map((el, index) => ({ label: el.name, value: index }));
    }, [sequence, activeTab]);

    useEffect(() => {
        if (!activeTab) setActiveTab(tabs[0]);
    }, [sequence]);

    const activeTabIndex = useMemo(() => tabs?.findIndex((el) => el.value === activeTab?.value), [activeTab]);

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

            const newSequence = sequence.filter((_, index) => index !== activeTabIndex);

            setValue(
                "sequence",
                sequence.filter((_, index) => index !== activeTabIndex)
            );

            setActiveTab({ label: newSequence[0].name, value: 0 });
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
        </>
    );
}
