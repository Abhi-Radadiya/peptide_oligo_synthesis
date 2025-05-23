import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWindowSize } from "@uidotdev/usehooks"
import { Button } from "../../../Components/Buttons/Buttons"
import { ReactComponent as BackIcon } from "../../../Assets/chevron-down.svg"
import ConfirmationPopup from "../../../Components/Popup/ConfirmationPopup"

export default function Footer(props) {
    const { onClick, label = "Save & Next" } = props

    const { width } = useWindowSize()

    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)

    const navigate = useNavigate()

    const handleConfirm = () => {
        navigate("/method-setup")
    }

    return (
        <>
            <div className="border-t bg-white border border-neutral-300 rounded-2xl shadow-md py-4 px-6">
                <div className="w-full flex justify-between flex-row ml-4 pr-4">
                    <button onClick={onClick} className="ml-auto px-2 py-2 rounded-lg w-[150px] text-black bg-amber-200 border ring-amber-300 ring-offset-2 focus:ring-2">
                        {label}
                    </button>
                </div>
            </div>

            <ConfirmationPopup
                isOpen={isOpenConfirmation}
                closePopup={() => setIsOpenConfirmation(false)}
                handleConfirm={handleConfirm}
                desc="Are you sure want to go back, you will loose unsaved data ?"
                header="Go back !"
            />
        </>
    )
}
