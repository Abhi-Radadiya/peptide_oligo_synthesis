import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../Components/Buttons/Buttons";
import { FormProvider } from "react-hook-form";
import SequenceEditing from "./Tabs/SequenceEditing/SequenceEditing";
import MethodAssign from "./Tabs/MethodAssign/MethodAssign";
import { useDispatch, useSelector } from "react-redux";
import { addSequence, editSequence } from "../../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

export default function SequenceCreation() {
    const { id } = useParams();

    const method = useForm();

    const tabs = [
        { label: "Sequence Editing", value: "sequence-editing", component: SequenceEditing },
        { label: "Method Assign", value: "method-assign", component: MethodAssign },
    ];

    const { watch, setValue } = method;

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const ComponentToRender = tabs.find((el) => el.value === activeTab).component;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const sequence = useSelector((state) => state.sequence);

    const handleAddSequence = async () => {
        const newSequence = {
            id: Date.now(),
            name: watch("logFile"),
            block: watch("block"),
        };

        try {
            id ? await dispatch(editSequence(id, { name: watch("logFile"), block: watch("block") })) : await dispatch(addSequence(newSequence));

            navigate("/available-sequence");
        } catch (error) {
            console.log(`error : `, error);
            alert(error.message);
        }
    };

    useEffect(() => {
        if (!id) return;

        const selectedSequence = sequence.find((el) => el.id == id);

        setValue("sequence", selectedSequence?.block?.map((item) => item.block).join(" "));

        setValue("logFile", selectedSequence.name);
        setValue("block", selectedSequence.block);
    }, []);

    return (
        <>
            <FormProvider {...method}>
                <div className="px-4">
                    <div className="flex flex-row justify-between items-center border-b border-neutral-300 sticky top-0 z-10 bg-white">
                        <div className={`flex flex-row gap-4 py-4 w-full`}>
                            <Button label="Sequence Editing" active={activeTab === "sequence-editing"} onClick={() => setActiveTab("sequence-editing")} />
                            {!!watch("sequence") && <Button label="Method Assign" active={activeTab === "method-assign"} onClick={() => setActiveTab("method-assign")} />}
                        </div>

                        {activeTab !== tabs[0].value && <Button label="Save" onClick={handleAddSequence} />}
                    </div>

                    <ComponentToRender setActiveTab={setActiveTab} />
                </div>
            </FormProvider>
        </>
    );
}
