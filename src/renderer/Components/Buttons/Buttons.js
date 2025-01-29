import { useState } from "react";
import ConfirmationPopup from "../Popup/ConfirmationPopup";

const Button = (props) => {
    const { label, active, disabled, className, onClick, bgClassName, rightIcon, leftIcon } = props;

    return (
        <button
            className={`border font-medium border-neutral-300 rounded-lg px-5 py-1.5 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed focus:ring-2 focus:ring-neutral-600 active:ring-0 active:ring-offset-0 focus:active:ring-0 focus:active:ring-offset-0 ring-offset-1 flex flex-row items-center gap-4 ${
                bgClassName ? bgClassName : active ? "bg-neutral-400 text-white" : "bg-neutral-200 hover:bg-neutral-300 hover:text-black"
            } ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {leftIcon}
            {label}
            {rightIcon}
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

const ModelButton = (props) => {
    const { onCancel, handleSave } = props;

    return (
        <div className="flex flex-row justify-end w-full gap-2 mt-4">
            <button onClick={onCancel} className="text-sm hover:bg-neutral-100 transition-colors duration-300 rounded-lg px-4 py-1">
                Cancel
            </button>

            <Button label="Save" onClick={handleSave} bgClassName="bg-green-300" />
        </div>
    );
};

const SmallButton = (props) => {
    const { label, onClick, bgClassName } = props;

    return (
        <button onClick={onClick} className={`text-sm font-normal transition-colors duration-300 rounded-lg px-2 py-1 ${bgClassName}`}>
            {label}
        </button>
    );
};

export { SaveButton, Button, ModelButton, SmallButton };
