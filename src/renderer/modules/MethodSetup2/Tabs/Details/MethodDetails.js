import React, { useEffect } from "react";
import InputField from "../../../../Components/Input/Input";
import { useFormContext } from "react-hook-form";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";

const MethodDetails = (props) => {
    const { disabled } = props;

    const { control, watch, setValue } = useFormContext();

    const synthesisScale = watch("synthesisScale");
    const loadingTime = watch("loadingTime");
    const amediteExcessFactor = watch("amediteExcessFactor");
    const amediteConcentration = watch("amediteConcentration");
    const actExcessFactor = watch("actExcessFactor");

    const columnsMenuItem = [
        { label: "10", value: { volume: 10, flowRate: 2 } },
        { label: "20", value: { volume: 20, flowRate: 4 } },
        { label: "30", value: { volume: 30, flowRate: 6 } },
        { label: "40", value: { volume: 40, flowRate: 8 } },
    ];

    const setFieldValues = (amediteVolume, washVolume) => {
        const amediteFields = [
            "1_volume",
            "n_deVolume",
            "n_couplingVolume",
            "n_couplingAmediteVolume",
            "n_oxidizationVolume",
            "n_sulfurizationVolume",
            "n_extraVolume",
            "last_deVolume",
            "last_deaVolume",
        ];

        setValue("n_cappingAVolume", amediteVolume / 2);
        setValue("n_cappingBVolume", amediteVolume / 2);

        amediteFields.forEach((field) => setValue(field, amediteVolume));

        const washField = [
            "n_deWashVolume",
            "n_couplingWashVolume",
            "n_couplingActVolume",
            "n_oxidizationWashVolume",
            "n_sulfurizationWashVolume",
            "n_extraWashVolume",
            "n_cappingWashVolume",
            "last_deWashVolume",
            "last_deaWashVolume",
        ];

        washField.forEach((field) => setValue(field, washVolume));
    };

    useEffect(() => {
        let numberAmediteVolume, numberActVolume;

        if (synthesisScale && loadingTime && amediteExcessFactor && amediteConcentration) {
            const amediteVolume = (synthesisScale * amediteExcessFactor) / amediteConcentration;
            const actVolume = amediteVolume / (1 - actExcessFactor / 100) - amediteVolume;
            const totalCouplingVolume = amediteVolume + actVolume;
            const deliveryTimeAmedite = actVolume / loadingTime;
            const deliveryTimeAct = amediteVolume / loadingTime;

            numberAmediteVolume = Number(amediteVolume.toFixed(2));
            numberActVolume = Number(actVolume.toFixed(2));

            setValue("actVolume", numberActVolume);
            setValue("amediteVolume", numberAmediteVolume);
            setValue("deliveryTimeAct", Number(deliveryTimeAct.toFixed(3)));
            setValue("totalCouplingVolume", Number(totalCouplingVolume.toFixed(2)));
            setValue("deliveryTimeAmedite", Number(deliveryTimeAmedite.toFixed(3)));
        }

        return () => {
            if (numberAmediteVolume && numberActVolume) {
                setFieldValues(numberAmediteVolume, numberActVolume);
            }
        };
    }, [synthesisScale, loadingTime, amediteExcessFactor, amediteConcentration, actExcessFactor]);

    return (
        <>
            <div className="border-b border-neutral-300 pb-6 mb-6">
                <InputField
                    disabled={disabled}
                    control={control}
                    wrapperClassName="max-w-64"
                    name="method_name"
                    rules={{ required: "Please enter method name" }}
                    label="Method Name"
                    labelClassName="text-lg text-neutral-500 font-bold"
                    placeholder="Enter Method Name"
                />
            </div>

            <div className="w-full max-w-2xl mt-4">
                <h3 className="text-lg text-neutral-500 mb-4 font-bold">Synthesis Parameter Calculator</h3>
                <div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="column-size">Column Size (ml)</label>
                                <SelectionController
                                    disabled={disabled}
                                    placeholder="Select Column Size"
                                    height={41.6}
                                    control={control}
                                    name="columnSize"
                                    menuItem={columnsMenuItem}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="synthesis-scale">Synthesis Scale (μmol)</label>
                                <InputField
                                    disabled={disabled}
                                    control={control}
                                    name="synthesisScale"
                                    placeholder="Enter synthesis scale (μmol)"
                                    type="number"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="loading-time">Loading Time (min)</label>
                                <InputField disabled={disabled} control={control} name="loadingTime" placeholder="Enter loading time (min)" type="number" className="w-full" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="amedite-excess">Amedite Excess Factor</label>
                                <InputField
                                    disabled={disabled}
                                    control={control}
                                    name="amediteExcessFactor"
                                    placeholder="Enter amedite excess factor"
                                    type="number"
                                    step="0.1"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="act-excess">ACT Excess Factor (%)</label>
                                <InputField
                                    disabled={disabled}
                                    control={control}
                                    name="actExcessFactor"
                                    placeholder="Enter act excess factor (%)"
                                    type="number"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="amedite-concentration">Amedite Concentration (mmol)</label>
                                <InputField
                                    disabled={disabled}
                                    name="amediteConcentration"
                                    control={control}
                                    placeholder="Enter amedite concentration (mmol)"
                                    id="amedite-concentration"
                                    type="number"
                                    value={amediteConcentration}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
                            <h3 className="font-semibold text-lg mb-4">Calculated Results</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Amedite Volume</p>
                                    <p className="font-medium">{watch("amediteVolume") ?? "______"} ml</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Delivery Time Amedite</p>
                                    <p className="font-medium">{watch("deliveryTimeAmedite") ?? "______"} ml/min</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">ACT Volume</p>
                                    <p className="font-medium">{watch("actVolume") ?? "______"} ml</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Delivery Time ACT</p>
                                    <p className="font-medium">{watch("deliveryTimeAct") ?? "______"} ml/min</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Total Coupling Volume</p>
                                    <p className="font-medium">{watch("totalCouplingVolume") ?? "______"} ml</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MethodDetails;
