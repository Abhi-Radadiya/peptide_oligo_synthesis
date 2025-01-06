import React, { useMemo } from "react";
import ModelWrapper from "../../../../../Components/Model/ModelWrapper";
import { useSelector } from "react-redux";
import { findAmediteLabel } from "../../../../../Helpers/Constant";

export default function InvalidSequenceBlockModel(props) {
    const { onClose } = props;

    const invalidBlock = [...new Set(props.invalidBlock)];

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    const amediteList = useSelector((state) => state.amedite.amediteList);

    const bottleMappingAmediteArray = useMemo(() => {
        return [...new Set([...ameditePosition.map((el) => findAmediteLabel(amediteList, el.value)).filter((el) => !!el)])]; // get all label => filter defined value => remove duplicate entries
    }, [ameditePosition]);

    return (
        <>
            <ModelWrapper width="w-[65vw]" header="Invalid sequence" onClose={onClose}>
                <div className="mt-6 max-h-[85vh] h-fit overflow-y-auto overflow-x-hidden pr-2 -mr-2 scrollbar-style">
                    <span className="font-medium text-base">Available sequence</span>

                    <div className="mt-2 mb-6 -mx-2 pb-4 border-b border-neutral-400">
                        {bottleMappingAmediteArray.map((el, index) => {
                            return (
                                <span className="px-2 mx-2 my-1 py-1 inline-block rounded bg-neutral-200" key={index}>
                                    {el}
                                </span>
                            );
                        })}
                    </div>

                    <span className="font-medium text-base">Invalid sequence block</span>

                    <div className="mt-2 mb-6 -mx-2">
                        {invalidBlock.map((el, index) => {
                            return (
                                <span className="px-2 mx-2 my-1 py-1 inline-block rounded bg-neutral-200" key={index}>
                                    {el}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </ModelWrapper>
        </>
    );
}
