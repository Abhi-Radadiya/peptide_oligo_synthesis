import React from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";
import ProcedureForm from "../components/procedure-form";

export default function SynthesisProcedureFormModel(props) {
    const { isEditing, onClose } = props;

    return (
        <>
            <ModelWrapper onClose={onClose} width="w-[600px]" header={isEditing ? "Edit Procedure" : "Create Procedure"}>
                <div className="h-[80vh] overflow-y-auto scrollbar-style">
                    <ProcedureForm />
                </div>
            </ModelWrapper>
        </>
    );
}
