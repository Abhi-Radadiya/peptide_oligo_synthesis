import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as DownIcon } from "../../Assets/chevron-down.svg";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationPopup from "../Popup/ConfirmationPopup";
import { updateFormState } from "../../../redux/reducers/formState/formState";

export default function NavigationPanel(props) {
    const { isNavOpen, setIsNavOpen } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const isFormDirty = useSelector((state) => state.formState.formState)?.isDirty;

    const links = [
        { label: "Method Setup", to: "method-setup", isShowSubLink: true, subLink: [{ label: "Method Editor", to: "method-setting" }] },
        { label: "Settings", to: "settings" },
        { label: "Sequence", to: "sequence" },
        { label: "Available Sequence", to: "available-sequence", isShowSubLink: true, subLink: [{ label: "Sequence Editor", to: "sequence-editor/new" }] },
    ];

    const [activeTab, setActiveTab] = useState(() => {
        const currentPath = location.pathname.split("/").pop();
        const foundLink = links.find((link) => link.to === currentPath);
        if (foundLink) return foundLink.to;

        for (const link of links) {
            if (link.isShowSubLink) {
                const foundSubLink = link.subLink.find((subLink) => subLink.to === currentPath);
                if (foundSubLink) return link.to;
            }
        }

        return links[0].to;
    });

    useEffect(() => {
        const currentPath = location.pathname.split("/").pop();
        const foundLink = links.find((link) => link.to === currentPath);
        if (foundLink) {
            setActiveTab(currentPath);
            return;
        }

        for (const link of links) {
            if (link.isShowSubLink) {
                const foundSubLink = link.subLink.find((subLink) => subLink.to === currentPath);
                if (foundSubLink) {
                    setActiveTab(link.to);
                    return;
                }
            }
        }
    }, [location.pathname]);

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(null);

    const handleNavigation = (to) => {
        if (isFormDirty) {
            setShowConfirmationPopup(to);
        } else {
            navigate(to);
            setActiveTab(to);
        }
    };

    const dispatch = useDispatch();

    return (
        <>
            <nav className={`fixed top-0 left-0 h-screen w-64 bg-gray-200 transition-transform duration-300 ${isNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <ul className="space-y-4 mt-10 ml-8">
                    {links.map((el, index) => {
                        return (
                            <li key={index}>
                                <div className="flex flex-row items-center">
                                    {activeTab === el.to && (
                                        <span>
                                            <DownIcon className="-rotate-90 -ml-4" />
                                        </span>
                                    )}
                                    <Link
                                        className={`font-bold text-lg hover:tracking-wider transition-all duration-300 ${
                                            activeTab === el.to && !el?.subLink?.length && "border-b-2 tracking-wider border-neutral-500"
                                        }`}
                                        to={el.to}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavigation(el.to);
                                        }}
                                    >
                                        {el.label}
                                    </Link>
                                </div>

                                {!!el.isShowSubLink &&
                                    el?.subLink?.map((subLinkEl, subLinkIndex) => (
                                        <div className="mt-3 ml-4" key={subLinkIndex}>
                                            -
                                            <Link
                                                className={`font-medium ml-1 text-base hover:tracking-wider transition-all duration-300 ${
                                                    location.pathname.includes(subLinkEl.to) && "border-b-2 tracking-wider border-neutral-500"
                                                }`}
                                                to={subLinkEl.to}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNavigation(subLinkEl.to);
                                                }}
                                            >
                                                {subLinkEl.label}
                                            </Link>
                                        </div>
                                    ))}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div
                className={`bottom-10 ${!isNavOpen ? "left-2" : "left-60"} transition-all duration-300 cursor-pointer absolute z-[30]`}
                onClick={() => setIsNavOpen((prevState) => !prevState)}
            >
                <DownIcon
                    className={`${
                        isNavOpen ? "rotate-90" : "-rotate-90"
                    } rounded-full border-2 cursor-pointer bg-neutral-200 transition-all duration-300 border-neutral-500`}
                />
            </div>

            <ConfirmationPopup
                isOpen={!!showConfirmationPopup}
                closePopup={() => setShowConfirmationPopup(null)}
                handleConfirm={() => {
                    navigate(showConfirmationPopup);
                    setActiveTab(showConfirmationPopup);
                    setShowConfirmationPopup(null);
                    dispatch(updateFormState(false));
                }}
                desc="Are you sure to change module? you will lose unsaved work!"
                header="Change module!"
            />
        </>
    );
}
