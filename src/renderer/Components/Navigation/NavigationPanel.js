import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as DownIcon } from "../../Assets/chevron-down.svg";

export default function NavigationPanel(props) {
    const { isNavOpen, setIsNavOpen } = props;

    const location = useLocation();

    const links = [
        { label: "Method Setup", to: "method-setup" },
        { label: "Settings", to: "settings" },
        { label: "Sequence", to: "sequence" },
    ];

    const [activeTab, setActiveTab] = useState(() => {
        const currentPath = location.pathname.split("/").pop();
        return links.find((link) => link.to === currentPath)?.to || links[0].to;
    });

    useEffect(() => {
        const currentPath = location.pathname.split("/").pop();
        if (links.some((link) => link.to === currentPath)) {
            setActiveTab(currentPath);
        }
    }, [location.pathname]);

    return (
        <>
            <nav className={`fixed top-0 left-0 h-screen w-64 bg-gray-200 transition-transform duration-300 ${isNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <ul className="space-y-4 mt-10 ml-8">
                    {links.map((el, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    className={`font-bold text-xl hover:tracking-wider transition-all duration-300 ${
                                        activeTab === el.to && "border-b-2 tracking-wider border-neutral-500"
                                    }`}
                                    to={el.to}
                                    onClick={() => setActiveTab(el.to)}
                                >
                                    {el.label}
                                </Link>
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
                    className={`${isNavOpen ? "rotate-90" : "-rotate-90"} rounded-full border-2 cursor-pointer bg-neutral-200 transition-all duration-300 border-neutral-500`}
                />
            </div>
        </>
    );
}
