import React from "react"
import LastMethod from "../Tabs/Last/LastMethod"
import NthMethod from "../Tabs/Nth/NthMethod"
import FirstMethod from "../Tabs/First/FirstMethod"
import MethodDetails from "../Tabs/Details/MethodDetails"
import Footer from "./Footer"

export default function AllComponents(props) {
    const { handleSave } = props

    return (
        <>
            <MethodDetails />
            <FirstMethod />
            <NthMethod />
            <LastMethod />
            <Footer onClick={handleSave} label={"Save"} />
        </>
    )
}
