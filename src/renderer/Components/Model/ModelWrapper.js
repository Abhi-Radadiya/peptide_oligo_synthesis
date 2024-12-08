import React, { useRef } from "react";
import { ReactComponent as CloseIcon } from "../../Assets/close.svg";
import useOutsideClick from "../../Helpers/Hooks";

export default function ModelWrapper(props) {
    const { header, desc, children, width = "w-96", onClose } = props;

    const modelRef = useRef();

    useOutsideClick(modelRef, onClose);

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-100 opacity-100 p-6 relative ${width}`} ref={modelRef}>
                    {header && <h2 className="text-xl font-semibold mb-2 text-gray-800">{header}</h2>}

                    {desc && <p className="text-gray-600 mb-6">{desc}</p>}

                    <span className="absolute top-3 right-4 cursor-pointer" onClick={onClose}>
                        <CloseIcon />
                    </span>

                    {children}
                </div>
            </div>
        </>
    );
}
