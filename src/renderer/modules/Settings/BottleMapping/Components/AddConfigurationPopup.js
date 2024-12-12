import React from "react";
import InputField from "../../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import _ from "lodash";

export default function AddConfigurationPopup(props) {
    const { editingData, onSubmit, togglePopup, data, type = "amedite" } = props;

    const getDefaultValue = () => {
        return !_.isEmpty(editingData) ? editingData : { full_name: "", wm: "", case_no: "", msds: "", concentration: "" };
    };

    const { control, handleSubmit } = useForm({ defaultValues: getDefaultValue() });

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <div className="bg-white p-8 rounded-lg w-[600px] shadow-lg">
                    <h2 className="text-xl mb-4">{editingData ? `Edit ${type}` : `Create ${type}`}</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            wrapperClassName="mb-4"
                            control={control}
                            name="full_name"
                            label="Full name"
                            rules={{
                                required: "Please enter full name",
                                validate: {
                                    uniqueName: (value) => !data.some((item) => item.full_name === value) || "Name already exists",
                                },
                            }}
                            placeholder="Enter full name"
                        />

                        <div className="flex flex-row items-start gap-4 w-full">
                            <InputField control={control} wrapperClassName="mb-4 w-1/2" name="wm" label="WM" rules={{ required: "Please enter WM" }} placeholder="Enter WM" />

                            <InputField
                                control={control}
                                wrapperClassName="mb-4 w-1/2"
                                name="case_no"
                                label="Case no."
                                rules={{ required: "Please enter case number" }}
                                placeholder="Enter case number"
                            />
                        </div>

                        <div className="flex flex-row items-start gap-4">
                            <InputField
                                control={control}
                                wrapperClassName="mb-4 w-1/2"
                                name="msds"
                                label="MSDS"
                                rules={{ required: "Please enter msds" }}
                                placeholder="Enter msds"
                            />

                            <InputField
                                control={control}
                                wrapperClassName="mb-4 w-1/2"
                                name="concentration"
                                label="Concentration"
                                type="number"
                                rules={{ required: "Please enter concentration" }}
                                placeholder="Enter Concentration"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2 focus:ring-2 ring-offset-2" onClick={() => togglePopup()}>
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded focus:ring-2 ring-offset-2">
                                {editingData ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
