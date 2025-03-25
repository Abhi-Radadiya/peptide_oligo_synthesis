import React, { useState } from "react";
import { Button } from "../../../Components/Buttons/Buttons";
import { Plus, Trash2 } from "lucide-react";
import SynthesisProcedureFormModel from "../models/synthesis-procedure-form-model.js";

export default function Header() {
    const [isShowProcedureModel, setIsShowProcedureModel] = useState(true);

    return (
        <>
            <div className="flex flex-row justify-between items-center border-b border-gray-600 pb-4 mb-4">
                <h3 className="text-xl font-medium">Synthesis Procedure</h3>

                <div className="flex flex-row items-center gap-4">
                    {/* TODO : Create delete, add buttons */}
                    <Button leftIcon={<Trash2 color="red" />} label="Delete" bgClassName="bg-red-200 hover:bg-red-300 text-red-700 hover:text-red-900" />
                    <Button
                        onClick={() => setIsShowProcedureModel(true)}
                        leftIcon={<Plus color="green" />}
                        label="Create"
                        bgClassName="bg-green-400/50 hover:bg-green-400 text-green-700 hover:text-green-900"
                    />
                </div>
            </div>

            {isShowProcedureModel && <SynthesisProcedureFormModel onClose={() => setIsShowProcedureModel(false)} />}
        </>
    );
}
