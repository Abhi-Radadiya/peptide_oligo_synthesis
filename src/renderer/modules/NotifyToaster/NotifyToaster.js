import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../../../redux/reducers/toastStateReducer/toastStateReducer";
import { iconData } from "../../Helpers/Icons";

export default function NotifyToaster() {
    const toastState = useSelector((state) => state.toastState);

    const isToastOpen = toastState.isOpen;

    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        dispatch(closeToast());
    }, [dispatch]);

    useEffect(() => {
        isToastOpen &&
            setTimeout(() => {
                handleClose();
            }, 3000);
    }, [isToastOpen, handleClose]);

    const Icon = useMemo(() => {
        return iconData?.find((el) => el.name === toastState?.icon)?.icon;
    }, [toastState.icon]);

    return (
        <>
            <div
                id="toast-success"
                className={`flex items-center w-full max-w-sm text-gray-500 bg-[#f2f1ed] border border-neutral-400 rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800 absolute left-0 right-0 mx-auto transition-all duration-500 ${
                    isToastOpen ? "top-10 opacity-100 z-20 mb-4 p-4" : "top-0 opacity-0 z-0 h-0 mb-0 p-0"
                }`}
                role="alert"
            >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    {Icon}
                </div>
                <div className="ms-3 text-base font-medium w-[200px] overflow-hidden text-ellipsis leading-4 max-h-[38px]">{toastState.text}</div>
                <button
                    type="button"
                    className={`ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 ${
                        isToastOpen ? "h-8 w-8" : "h-0 w-0"
                    }`}
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </>
    );
}
