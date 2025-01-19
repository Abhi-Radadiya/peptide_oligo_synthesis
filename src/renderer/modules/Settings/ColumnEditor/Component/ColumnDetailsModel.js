import React from "react";
import { Button } from "../../../../Components/Buttons/Buttons";
import InputField from "../../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { addPosition, updatePosition } from "../../../../../redux/reducers/settings/columnEditor";
import { openToast } from "../../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { SUCCESS } from "../../../../Helpers/Icons";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";

export default function ColumnDetailsModel(props) {
    const { editingDetails, closeModal, columnEditor } = props;

    const positionDetails = { name: "", unit: "", maxPressure: "", maxFlowRate: "", diameter: "", height: "", liquidVolume: "", loadingVolume: "" };

    const isEditing = !isEmpty(editingDetails);

    const { control, handleSubmit } = useForm({ defaultValues: isEditing ? editingDetails : positionDetails });

    const fields = [
        { label: "Max pressure", name: "maxPressure", placeholder: "Enter max pressure", rightFixItem: "PSI" },
        { label: "Max flow rate", name: "maxFlowRate", placeholder: "Enter flow rate", rightFixItem: "ml/s" },
        { label: "Diameter", name: "diameter", placeholder: "Enter diameter", rightFixItem: "mm" },
        { label: "Height", name: "height", placeholder: "Enter height", rightFixItem: "mm" },
        { label: "Liquid volume", name: "liquidVolume", placeholder: "Enter liquid volume", rightFixItem: "ml" },
        { label: "Loading volume", name: "loadingVolume", placeholder: "Enter loading volume", rightFixItem: "ml" },
    ];

    const dispatch = useDispatch();

    const handleSave = (data) => {
        isEditing ? dispatch(updatePosition(data)) : dispatch(addPosition(data));
        closeModal();
        dispatch(openToast({ text: "Saved successfully.", icon: SUCCESS }));
    };

    return (
        <>
            <ModelWrapper header={!isEditing ? "Create new position" : `Edit Details for ${editingDetails?.name}`} onClose={closeModal} width="w-full max-w-xl">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField
                        wrapperClassName="col-span-2"
                        rules={{
                            ...(!isEditing ? { validate: { uniqueName: (value) => !columnEditor?.some((item) => item.name === value) || "Name already exists" } } : {}),
                            required: "Please enter name",
                        }}
                        control={control}
                        name="name"
                        label="Full name"
                        placeholder="Enter full name"
                    />

                    {fields.map((field, index) => (
                        <div key={index} className="w-full max-w-[500px]">
                            <InputField rules={{ required: "Please enter details" }} control={control} {...field} type="number" />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 font-medium focus:ring-2 focus:ring-neutral-600 ring-offset-1"
                    >
                        Close
                    </button>
                    <Button label="Save" onClick={handleSubmit(handleSave)} bgClassName="bg-green-200 hover:bg-green-300 border-green-300" />
                </div>
            </ModelWrapper>
        </>
    );
}
