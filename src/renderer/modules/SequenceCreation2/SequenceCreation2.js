import React from "react";
import SequenceEditing from "./Tabs/SequenceEditing/SequenceEditing.js";
import MethodAssign from "./Tabs/MethodAssign/MethodAssign.js";
import { FormProvider, useForm } from "react-hook-form";

export default function SequenceCreation2() {
    const method = useForm();

    return (
        <>
            <div className="p-6">
                <FormProvider {...method}>
                    <div className="flex flex-row w-full relative mt-4">
                        <SequenceEditing />
                        <MethodAssign />
                    </div>
                </FormProvider>
            </div>
        </>
    );
}
