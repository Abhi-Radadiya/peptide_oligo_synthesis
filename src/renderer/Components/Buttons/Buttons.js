import { useState } from "react";
import ConfirmationPopup from "../Popup/ConfirmationPopup";

const Button = (props) => {
    const { label, active, disabled, className, onClick, bgClassName } = props;

    return (
        <button
            className={`border font-medium border-neutral-300 rounded-lg px-5 py-1.5 ${
                bgClassName ? bgClassName : active ? "bg-neutral-400 text-white" : "bg-neutral-200 hover:bg-neutral-300 hover:text-black"
            } ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

const SaveButton = (props) => {
    const { header } = props;

    const [isSubmitted, setIsSubmitted] = useState(false);

    const submission = async () => {
        const response = await props.onClick();

        setIsSubmitted(response);

        setTimeout(() => {
            setIsSubmitted(false);
        }, 700);
    };

    return (
        <>
            <Button {...props} onClick={submission} />
            <ConfirmationPopup isOpen={isSubmitted} closePopup={() => setIsSubmitted(false)} header={header} />
        </>
    );
};

export { SaveButton, Button };
