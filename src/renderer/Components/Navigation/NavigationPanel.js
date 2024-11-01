import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DownIcon } from "../../Assets/chevron-down.svg";

export default function NavigationPanel(props) {
    const { isNavOpen, setIsNavOpen } = props;

    const links = [
        { label: "Method Setup", to: "method-setup" },
        { label: "Settings", to: "settings" },
    ];

    const [activeTab, setActiveTab] = useState(links[0].to);

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
                className={`bottom-10 ${!isNavOpen ? "left-2" : "left-60"} transition-all duration-300 cursor-pointer absolute z-[100]`}
                onClick={() => setIsNavOpen((prevState) => !prevState)}
            >
                <DownIcon
                    className={`${isNavOpen ? "rotate-90" : "-rotate-90"} rounded-full border-2 cursor-pointer bg-neutral-200 transition-all duration-300 border-neutral-500`}
                />
            </div>
        </>
    );
}
