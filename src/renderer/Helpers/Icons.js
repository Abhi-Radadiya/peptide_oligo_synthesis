import { ReactComponent as SaveIcon } from "../Assets/save.svg";
import { ReactComponent as SuccessIcon } from "../Assets/success-tick.svg";
import { ReactComponent as ErrorIcon } from "../Assets/reimbursement.svg";

export const SAVE = "save";
export const SUCCESS = "success";
export const ERROR = "error";

export const iconData = [
    { name: SAVE, icon: <SaveIcon /> },
    { name: SUCCESS, icon: <SuccessIcon /> },
    { name: ERROR, icon: <ErrorIcon fill="#ff0000" /> },
];