import React from "react";
import SingleSynthesisRun from "../../Component/SingleSynthesisRun";
import RunningSynthesis from "../RunningSynthesis/RunningSynthesis";

export default function Settings() {
    return (
        <>
            <div className="flex flex-row items-start">
                <SingleSynthesisRun />
                <RunningSynthesis />
            </div>
        </>
    );
}
