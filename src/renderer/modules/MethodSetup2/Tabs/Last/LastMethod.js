import React from "react"
import DeBlock from "./Tabs/DeBlock"
import DEA from "./Tabs/DEA"

export default function LastMethod() {
    return (
        <>
            <div className="py-6 border-t border-neutral-500 mt-10">
                <span className="ml-4 text-2xl font-medium">Last Step</span>
            </div>
            <DeBlock />
            <DEA />
        </>
    )
}
