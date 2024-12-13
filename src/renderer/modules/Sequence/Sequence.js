import React from "react";
import RunSequence from "./Tabs/RunSequence/RunSequence";
import { FormProvider, useForm } from "react-hook-form";

// remove SynthesisDetailsSub while not needed

export default function Settings() {
    const method = useForm({ defaultValues: { option: "3", resinOption: "standard" } });

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
