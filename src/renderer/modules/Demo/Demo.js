import React from "react";
import Header from "./Component/Header/Header";
import SelectionCard from "./Component/Cards/Selection/SelectionCard";
import { FormProvider, useForm } from "react-hook-form";
import RunCard from "./Component/Cards/Run/RunCard";
import BlockCard from "./Component/Cards/Block/BlockCard";
import RunningBlockDetailsCard from "./Component/Cards/RunningBlockDetails/RunningBlockDetailsCard";

export default function Demo() {
    const method = useForm();

    return (
        <>
            <FormProvider {...method}>
                <div className="p-4">
                    <Header />

                    <div className="flex flex-row gap-4 items-stretch mb-6">
                        <SelectionCard />
                        <RunCard />
                        <BlockCard />
                    </div>

                    <RunningBlockDetailsCard />
                </div>
            </FormProvider>
        </>
    );
}
