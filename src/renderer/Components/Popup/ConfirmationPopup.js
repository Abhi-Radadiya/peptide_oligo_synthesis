import React, { useRef } from "react";
import useOutsideClick from "../../Helpers/Hooks";
import ModelWrapper from "../Model/ModelWrapper";

const ConfirmationPopup = (props) => {
    const { isOpen, closePopup, handleConfirm, desc, header, width = "w-96" } = props;

    const modelRef = useRef();

    useOutsideClick(modelRef, closePopup);

    if (!isOpen) return null;

    return (
        <>
            <ModelWrapper header={header} desc={desc} onClose={closePopup} width={width}>
                <div className="flex justify-end space-x-3">
                    <button onClick={closePopup} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none">
                        Cancel
                    </button>

                    {handleConfirm && (
                        <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                            Confirm
                        </button>
                    )}
                </div>
            </ModelWrapper>
        </>
    );
};

export default ConfirmationPopup;
