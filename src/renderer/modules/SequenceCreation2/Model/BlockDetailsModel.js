import React from "react";
import ModelWrapper from "../../../Components/Model/ModelWrapper";

export default function BlockDetailsModel(props) {
    const { onClose, availableBlocks } = props;

    return (
        <>
            <ModelWrapper
                header="Available amedite"
                width="w-[45%]"
                desc="When adding sequence, you must use amedite which is used in bottle mapping. If you enter any other amedite, the system will display an error."
                onClose={onClose}
            >
                <div className="-mx-2 max-h-[65vh] h-fit overflow-auto scrollbar-style">
                    {availableBlocks?.map((el, index) => {
                        return (
                            <div key={index} className="border border-neutral-300 bg-neutral-50 rounded-lg w-fit inline-block px-2 py-1 m-2">
                                {el}
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-row justify-end w-full gap-2 mt-4">
                    <button onClick={onClose} className="text-sm hover:bg-neutral-100 transition-colors duration-300 rounded-lg px-4 py-1">
                        Close
                    </button>
                </div>
            </ModelWrapper>
        </>
    );
}
