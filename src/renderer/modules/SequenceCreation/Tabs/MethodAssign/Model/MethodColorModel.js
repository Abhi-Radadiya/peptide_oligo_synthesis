import React from "react";
import ModelWrapper from "../../../../../Components/Model/ModelWrapper";

export default function MethodColorModel(props) {
    const { methods, onClose } = props;

    return (
        <>
            <ModelWrapper width="w-[35vw]" onClose={onClose} header="Method">
                <div className="overflow-auto h-fit max-h-[85vh] scrollbar-style pr-2 -mr-2">
                    {methods.map((el, index) => {
                        return (
                            <div className="flex flex-row items-center px-2 rounded-md justify-between py-2 odd:bg-neutral-100 even:bg-white" key={index}>
                                <span>{el.method_name}</span>
                                <div className="rounded-lg h-6 w-10" style={{ background: el.color }} />
                            </div>
                        );
                    })}
                </div>
            </ModelWrapper>
        </>
    );
}
