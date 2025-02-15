import React from "react";
import Header from "./Component/Header/Header";
import SelectionCard from "./Component/Cards/Selection/SelectionCard";
import { FormProvider, useForm } from "react-hook-form";
import RunCard from "./Component/Cards/Run/RunCard";
import BlockCard from "./Component/Cards/Block/BlockCard";
import RunningBlockDetailsCard from "./Component/Cards/RunningBlockDetails/RunningBlockDetailsCard";
import SchematicFlowDetailsCard from "./Component/Cards/SchematicFlowDetails/SchematicFlowDetailsCard";

export default function Demo() {
    const method = useForm({ defaultValues: { option: "3", resin: "universal", showConfigurationCard: true } });

    const { watch } = method;

    return (
        <>
            <FormProvider {...method}>
                <div className="p-4">
                    <Header />

                    <div className="h-[80vh] overflow-auto scrollbar-style pr-4 -mr-4">
                        <div className="flex flex-row gap-4 items-stretch mb-6">
                            {watch("showConfigurationCard") && (
                                <>
                                    <SelectionCard />
                                    <RunCard />
                                </>
                            )}

                            <BlockCard />
                        </div>

                        <RunningBlockDetailsCard />

                        <SchematicFlowDetailsCard />
                    </div>
                </div>
            </FormProvider>
        </>
    );
}
