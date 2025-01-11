import React, { useMemo, useRef } from "react";
import ModelWrapper from "../../../../../Components/Model/ModelWrapper";
import TextArea from "../Component/TextArea";
import { useSelector } from "react-redux";
import { isEmpty, uniqBy } from "lodash";

export default function EnterSequenceModel(props) {
    const { onClose } = props;

    const textAreaRef = useRef();

    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    const uniqueBottleMappingAmedite = useMemo(() => {
        const uniquePositions = uniqBy(
            ameditePosition.filter((item) => !isEmpty(item)),
            "value"
        );

        return uniquePositions;
    }, [ameditePosition]);

    return (
        <>
            <ModelWrapper header="Create sequence" desc="Select blocks to create sequence" width="w-[80vw]" hasOutSideClick={false} onClose={onClose}>
                <div className="flex flex-row items-start">
                    <div className="border-r border-neutral-300 pr-4 mr-4 w-[calc(50vw-2rem)] h-[80vh] inline-block">
                        {[
                            ...uniqueBottleMappingAmedite,
                            ...uniqueBottleMappingAmedite,
                            ...uniqueBottleMappingAmedite,
                            ...uniqueBottleMappingAmedite,
                            ...uniqueBottleMappingAmedite,
                            ...uniqueBottleMappingAmedite,
                        ].map((el, index) => {
                            return (
                                <div className="rounded px-2 py-1 border border-neutral-300 inline-block w-fit m-2" key={index}>
                                    {el.label}
                                </div>
                            );
                        })}
                    </div>

                    <div className="border-r border-neutral-300">
                        <TextArea index="tempSequence" textAreaRef={textAreaRef} handleSelection={() => {}} />
                    </div>
                </div>
            </ModelWrapper>
        </>
    );
}
