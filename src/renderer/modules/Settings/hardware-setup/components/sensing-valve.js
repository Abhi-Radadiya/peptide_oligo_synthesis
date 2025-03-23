import React from "react";
import SingleSensingValveBlock from "./single-sensing-valve-block";

export default function SensingValve(props) {
    const { valveMenuItem } = props;

    return (
        <>
            <SingleSensingValveBlock valveName="Top Valve" valveValue={{}} valveMenuItem={valveMenuItem} />
        </>
    );
}
