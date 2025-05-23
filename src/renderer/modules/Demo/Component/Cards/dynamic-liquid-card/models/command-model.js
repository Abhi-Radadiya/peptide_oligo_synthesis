import React from "react"
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper"

export default function CommandModel({ onClose, commands }) {
    if (!commands?.length) {
        return null
    }

    return (
        <>
            <ModelWrapper header="Commands" width="w-[400px]" onClose={onClose}>
                <div className="h-[40vh] overflow-auto scrollbar-style">
                    <ul>
                        {commands.map((command, index) => {
                            return <li key={index}>{command}</li>
                        })}
                    </ul>
                </div>
            </ModelWrapper>
        </>
    )
}
