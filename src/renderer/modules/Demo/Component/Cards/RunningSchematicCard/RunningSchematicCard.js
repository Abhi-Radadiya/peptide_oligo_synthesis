import React from "react";
import Container from "./Components/Container";
import { useSelector } from "react-redux";
import DistBlock from "./Components/DistBlock";
import PumpBlock from "./Components/PumpBlock";

export default function RunningSchematicCard() {
    const ameditePosition = useSelector((state) => state.bottleMapping.amedite);

    return (
        <>
            <div className="">
                <div className="w-full flex flex-row justify-between px-12">
                    <Container className="mt-36" bottleDetails={ameditePosition.slice(0, 9)} name="Container 2" position="left" />
                    <Container bottleDetails={ameditePosition.slice(9, 17)} name="Container 1" position="middle" />
                    <Container className="mt-36" bottleDetails={ameditePosition.slice(17, 24)} name="Container 3" position="right" />
                </div>

                <DistBlock />

                <PumpBlock />
            </div>
        </>
    );
}
