import React, { useRef } from "react";
import useOutsideClick from "../../Helpers/Hooks";

const ConfirmationPopup = (props) => {
    const { isOpen, closePopup, handleConfirm, desc, header, width = "w-96" } = props;

    const modelRef = useRef();

    useOutsideClick(modelRef, closePopup);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className={`bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-100 opacity-100 p-6 ${width} ${
                    isOpen ? "animate-bounce-in" : "scale-95 opacity-0"
                }`}
                ref={modelRef}
            >
                {header && <h2 className="text-xl font-semibold mb-4 text-gray-800">{header}</h2>}

                {desc && <p className="text-gray-600 mb-6">{desc}</p>}

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
            </div>
        </div>
    );
};

export default ConfirmationPopup;
