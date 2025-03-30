import React from "react"
import ValveSetup from "../setup-module/valve-setup"
import PumpSetup from "../setup-module/pump-setup"
import SensorSetup from "../setup-module/sensor-setup"

export default function HardwareAssignment() {
    return (
        <>
            <div className="space-y-4">
                <ValveSetup />
                <PumpSetup />
                <SensorSetup />
            </div>
        </>
    )
}
