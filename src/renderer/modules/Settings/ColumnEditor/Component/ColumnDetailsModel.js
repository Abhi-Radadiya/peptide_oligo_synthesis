import React from "react";
import { Button } from "../../../../Components/Buttons/Buttons";
import InputField from "../../../../Components/Input/Input";
import { useForm } from "react-hook-form";

export default function ColumnDetailsModel(props) {
    const { isViewMode, selectedPosition, closeModal, positionDetails } = props;

    const { control } = useForm({
        defaultValues: positionDetails,
    });

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        {isViewMode ? `View Details for ${selectedPosition.name}` : `Edit Details for ${selectedPosition?.name}`}
                    </h2>

                    <div className="flex flex-row gap-4 mb-4">
                        <div className="w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Full Name</div>
                            <InputField disabled={isViewMode} control={control} name="name" placeholder="Enter full name" />
                        </div>

                        <div className="w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Unit</div>
                            <InputField disabled={isViewMode} control={control} name="name" placeholder="Enter Unit" />
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 mb-4">
                        <div className="w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Max Pressure</div>
                            <InputField disabled={isViewMode} control={control} name="maxPressure" placeholder="Enter max pressure" />
                        </div>

                        <div className="w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Max Flow Rate</div>
                            <InputField disabled={isViewMode} control={control} name="maxFlowRate" placeholder="Enter flow rate" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 mb-4">
                        <div className="w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Diameter</div>
                            <InputField disabled={isViewMode} control={control} name="diameter" placeholder="Enter diameter" />
                        </div>

                        <div className="w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Height</div>
                            <InputField disabled={isViewMode} control={control} name="height" placeholder="Enter height" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 mb-4">
                        <div className="w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Liquid Volume</div>
                            <InputField disabled={isViewMode} control={control} name="liquidVolume" placeholder="Enter liquid volume" />
                        </div>

                        <div className="w-full max-w-[500px]">
                            <div className="font-medium text-base text-neutral-500 leading-7 w-full mb-2">Loading Volume</div>
                            <InputField disabled={isViewMode} control={control} name="loadingVolume" placeholder="Enter loading volume" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 font-medium">
                            Close
                        </button>
                        {!isViewMode && <Button label="Save" bgClassName="bg-green-200 hover:bg-green-300 border-green-300" />}
                    </div>
                </div>
            </div>
        </>
    );
}
