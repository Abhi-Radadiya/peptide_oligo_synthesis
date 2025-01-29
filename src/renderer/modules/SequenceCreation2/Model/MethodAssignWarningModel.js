import React from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";
import { ModelButton } from "../../../Components/Buttons/Buttons";

export default function MethodAssignWarningModel(props) {
    const { onClose, handleSave } = props;

    return (
        <>
            <ModelWrapper header="Save sequence ?" width="w-[35%]" desc="Some block hasn't assign method, Are you sure want to save sequence ?" onClose={onClose}>
                <ModelButton onCancel={onClose} handleSave={handleSave} />
            </ModelWrapper>
        </>
    );
}
