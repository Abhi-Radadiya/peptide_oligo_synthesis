import React, { useEffect } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { SimpleCheckBox } from "../../../../../../Components/FormController/CheckBox";
import { ModelButton } from "../../../../../../Components/Buttons/Buttons";
import { Controller, useFormContext } from "react-hook-form";

export default function ColumnBypassValveInformationModel(props) {
    const { onClose } = props;

    const { control, setValue, watch } = useFormContext();

    const handleSave = () => {
        setValue("manualModeRunFlow.isBypassColumn", watch("manualModeRunFlow.tempIsBypassColumn"));
        !!watch("manualModeRunFlow.tempIsBypassColumn") && setValue("manualModeRunFlow.columnBottomValveEnable", true);
        onClose();
    };

    useEffect(() => {
        setValue("manualModeRunFlow.tempIsBypassColumn", watch("manualModeRunFlow.isBypassColumn"));
    }, []);

    return (
        <>
            <ModelWrapper header="Bypass Column" onClose={onClose}>
                <Controller
                    control={control}
                    name="manualModeRunFlow.tempIsBypassColumn"
                    render={({ field: { onChange, value } }) => (
                        <div className="flex flow-row items-center gap-4 mt-5 cursor-pointer" onClick={() => onChange(!value)}>
                            <SimpleCheckBox checked={value} onChange={() => onChange(!value)} />
                            <span>Bypass Through Column</span>
                        </div>
                    )}
                />

                <p className="text-neutral-500 italic text-base pt-2 pb-4">* By checking it will close bottom valve as well.</p>

                <ModelButton handleSave={handleSave} onCancel={onClose} />
            </ModelWrapper>
        </>
    );
}
