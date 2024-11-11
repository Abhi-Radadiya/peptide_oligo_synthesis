import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import SingleDropdown from "./Component/SingleDropdown";

export default function Sequence() {
    const method = useForm({ defaultValues: { 3: "3" } });

    return (
        <>
            <FormProvider {...method}>
                <SingleDropdown />
            </FormProvider>
        </>
    );
}
