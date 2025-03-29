import React from "react";
import SingleSensingValveBlock from "./single-sensing-valve-block";

export default function SensingValve(props) {
    const { valveMenuItem } = props;

    return (
        <>
            <div className="border border-neutral-200 shadow-md p-6 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-rose-50 to-rose-100 rounded-lg justify-between text-neutral-700 mb-2">
                <SingleSensingValveBlock valveType="topValve" valveName="Top Valve" valveMenuItem={valveMenuItem} />
                <SingleSensingValveBlock valveType="bottomValve" valveName="Bottom Valve" valveMenuItem={valveMenuItem} />
                <SingleSensingValveBlock valveType="rgValve" valveName="RG Valve" valveMenuItem={valveMenuItem} />
                <SingleSensingValveBlock valveType="wasteValve" valveName="Waste Valve" valveMenuItem={valveMenuItem} />
            </div>
        </>
    );
}
