import React from "react";
import Header from "./Component/Header/Header";
import SelectionCard from "./Component/Cards/Selection/SelectionCard";
import { FormProvider, useForm } from "react-hook-form";
import RunCard from "./Component/Cards/Run/RunCard";
import BlockCard from "./Component/Cards/Block/BlockCard";
import RunningSchematicCard from "./Component/Cards/RunningSchematicCard/RunningSchematicCard";
import RunningSchematicCard2 from "./Component/Cards/RunningSchematicCard2/RunningSchematicCard2";
import SchematicFlowDetailsCard from "./Component/Cards/SchematicFlowDetails/SchematicFlowDetailsCard";

export default function Demo() {
    const method = useForm({
        defaultValues: {
            option: "3",
            resin: "universal",
            showConfigurationCard: true,
            manualModeRunFlow: {
                reagent1: { valve: [] },
                reagent2: { valve: [] },
                amedite1: { valve: [] },
                amedite2: { valve: [] },
                amedite3: { valve: [] },
                column: {
                    columnDetails: {},
                    columnStatus: "close"
                },
                pump: {
                    flowRate: "",
                    flowRateUnit: ""
                },
                wasteBlock: {
                    selectedBlock: null
                },
                isBypassColumn: false,
                rgValveStatus: "closeValve"
                // valve2Pump2
                // reagent2Pump2
                // closeValve
            }
        }
    });

    const { watch } = method;

    return (
        <>
            <FormProvider {...method}>
                <div className="p-4">
                    <Header />

                    {/* <div className="overflow-auto scrollbar-style pr-4 -mr-4 space-y-6"> */}
                    <div className="h-[80vh] overflow-auto scrollbar-style pr-4 -mr-4">
                        {/* <div className="flex flex-row gap-4 items-stretch mb-6">
                            {watch("showConfigurationCard") && (
                                <>
                                    <SelectionCard />
                                    <RunCard />
                                </>
                            )}

                            <BlockCard />
                        </div>

                        <SchematicFlowDetailsCard />
 */}
                        <div className=" mb-10">
                            <RunningSchematicCard2 />
                        </div>

                        {/* <RunningSchematicCard /> */}
                    </div>
                </div>
            </FormProvider>
        </>
    );
}

// Manual mode schema

const manualModeRunFlow = {
    amedite: [
        {
            valveNumber: 12,
            volume: 200,
            volumeUnit: "miliLitre",
            valveStatus: "close"
        },
        {
            valveNumber: 12,
            volume: 200,
            volumeUnit: "miliLitre",
            valveStatus: "close"
        }
    ],
    reagent1: [
        {
            valveNumber: 12,
            volume: 200,
            volumeUnit: "miliLitre",
            valveStatus: "close"
        },
        {
            valveNumber: 12,
            volume: 200,
            volumeUnit: "miliLitre",
            valveStatus: "close"
        }
    ],
    reagent2: [
        {
            valveNumber: 12,
            volume: 200,
            volumeUnit: "miliLitre",
            valveStatus: "close"
        },
        {
            valveNumber: 12,
            volume: 200,
            volumeUnit: "miliLitre",
            valveStatus: "close"
        }
    ],
    column: {
        columnDetails: {},
        columnStatus: "close"
    }
};
