import React from "react";
import RunSequence from "./Tabs/RunSequence/RunSequence";
import { FormProvider, useForm } from "react-hook-form";

export default function Sequence() {
    const method = useForm({ defaultValues: { option: "3", resinOption: "standard", mode: "auto", columnPosition: null, column: null, sequence: null } });

    return (
        <>
            <FormProvider {...method}>
                <div className="p-4">
                    <RunSequence />
                </div>
            </FormProvider>
        </>
    );
}
