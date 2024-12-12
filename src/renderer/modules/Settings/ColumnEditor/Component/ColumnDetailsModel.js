import React from "react";
import { Button } from "../../../../Components/Buttons/Buttons";
import InputField from "../../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import { SelectionController } from "../../../../Components/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { addPosition, updatePosition } from "../../../../../redux/reducers/settings/columnEditor";

export default function ColumnDetailsModel(props) {
    const { editingDetails, closeModal, columnEditor } = props;

    const positionDetails = { name: "", unit: "", maxPressure: "", maxFlowRate: "", diameter: "", height: "", liquidVolume: "", loadingVolume: "" };

    const isEditing = !isEmpty(editingDetails);

    const { control, handleSubmit } = useForm({ defaultValues: isEditing ? editingDetails : positionDetails });

    const chemicals = useSelector((state) => state.amedite.amediteList)?.map((el) => ({ label: el.full_name, value: el.full_name }));

    const fields = [
        { label: "Chemical", name: "chemical", placeholder: "Select chemical", dropdown: true },
        { label: "Unit", name: "unit", placeholder: "Enter Unit" },
        { label: "Max pressure", name: "maxPressure", placeholder: "Enter max pressure" },
        { label: "Max flow rate", name: "maxFlowRate", placeholder: "Enter flow rate" },
        { label: "Diameter", name: "diameter", placeholder: "Enter diameter" },
        { label: "Height", name: "height", placeholder: "Enter height" },
        { label: "Liquid volume", name: "liquidVolume", placeholder: "Enter liquid volume" },
        { label: "Loading volume", name: "loadingVolume", placeholder: "Enter loading volume" },
    ];

    const dispatch = useDispatch();

    console.log(`isEditing : `, isEditing);

    const handleSave = (data) => {
        isEditing ? dispatch(updatePosition(data)) : dispatch(addPosition(data));
        console.log(`isEditing : `, isEditing);
        closeModal();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">{isEditing ? "Create new position" : `Edit Details for ${editingDetails?.name}`}</h2>

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
                                {field.dropdown ? (
                                    <div className="">
                                        <label className="text-gray-700 leading-[17px] font-normal" htmlFor={field.name}>
                                            {field.label}
                                        </label>
                                        <SelectionController control={control} {...field} height={44} menuItem={chemicals} rules={{ required: "Please select chemical" }} />
                                    </div>
                                ) : (
                                    <InputField rules={{ required: "Please enter details" }} control={control} {...field} type="number" />
                                )}
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
                </div>
            </div>
        </>
    );
}
