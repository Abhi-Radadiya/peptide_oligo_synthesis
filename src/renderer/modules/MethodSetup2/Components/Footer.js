import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { Button } from "../../../Components/Buttons/Buttons";
import { ReactComponent as BackIcon } from "../../../Assets/chevron-down.svg";
import ConfirmationPopup from "../../../Components/Popup/ConfirmationPopup";

export default function Footer(props) {
    const { onClick, label = "Save & Next" } = props;

    const { width } = useWindowSize();

    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate("/method-setup");
    };

    return (
        <>
            <div className="absolute bottom-0 right-0 border-t pt-4 border-neutral-700 bg-white" style={{ width: width }}>
                <div className="w-full flex justify-between flex-row px-4 ml-4">
                    <Button
                        leftIcon={<BackIcon className="rotate-90" />}
                        label="Back to method"
                        onClick={() => {
                            setIsOpenConfirmation(true);
                        }}
                    />

                    <button onClick={onClick} className="px-2 py-2 rounded-lg w-[150px] text-black bg-amber-200 border ring-amber-300 ring-offset-2 focus:ring-2">
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
    );
}
