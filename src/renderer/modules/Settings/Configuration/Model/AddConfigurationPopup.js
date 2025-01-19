import React from "react";
import InputField from "../../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import _, { isEmpty } from "lodash";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";

export default function AddConfigurationPopup(props) {
    const { editingData, onSubmit, togglePopup, data, type = "amedite" } = props;

    const getDefaultValue = () => {
        return !_.isEmpty(editingData) ? editingData : { full_name: "", mw: "", case_no: "", msds: "", concentration: "", flowRate: "" };
    };

    const { control, handleSubmit } = useForm({ defaultValues: getDefaultValue() });

    return (
        <>
            <ModelWrapper header={editingData ? `Edit ${type}` : `Create ${type}`} onClose={togglePopup} width="w-[40%]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        wrapperClassName="mb-4"
                        control={control}
                        name="full_name"
                        label="Full name"
                        rules={{
                            required: "Please enter full name",
                            ...(_.isEmpty(editingData)
                                ? {
                                      validate: {
                                          uniqueName: (value) => !data.some((item) => item.full_name === value) || "Name already exists",
                                      },
                                  }
                                : {}),
                        }}
                        placeholder="Enter full name"
                    />

                    <div className="flex flex-row items-start gap-4 w-full">
                        <InputField control={control} wrapperClassName="mb-4 w-1/2" name="mw" label="MW" rules={{ required: "Please enter MW" }} placeholder="Enter MW" />

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

                    <InputField
                        control={control}
                        wrapperClassName="mb-4 w-1/2"
                        name="flowRate"
                        label="Flow rate"
                        type="number"
                        rules={{ required: "Please enter flow rate" }}
                        placeholder="Enter flow rate"
                    />

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="rounded-lg border-neutral-500 text-neutral-700 border px-4 py-2 mr-2 focus:ring-2 ring-offset-2"
                            onClick={() => togglePopup()}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg focus:ring-2 ring-offset-2">
                            {!isEmpty(editingData) ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </ModelWrapper>
        </>
    );
}
