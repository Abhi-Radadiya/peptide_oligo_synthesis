import React, { useRef } from "react";
import Draggable from "react-draggable";
import { X } from "lucide-react";

export default function ModelWrapper(props) {
    const { header, desc, children, width = "w-96", onClose, wrapperClass, hasOutsideClick = true } = props;

    const modalRef = useRef();

    const handleOutsideClick = (e) => {
        if (hasOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${wrapperClass}`} onClick={handleOutsideClick}>
            <Draggable nodeRef={modalRef} handle=".modal-header" bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
                <div ref={modalRef} className={`bg-white rounded-3xl shadow-lg p-6 relative ${width}`}>
                    <div className="modal-header cursor-move flex justify-between items-center mb-4">
                        {header && <h2 className="text-xl font-semibold text-gray-800">{header}</h2>}

                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" onClick={onClose}>
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {desc && <p className="text-gray-600 mb-6">{desc}</p>}

                    {children}
                </div>
            </Draggable>
        </div>
    );
}
