//  TO DO need to change logic for add tab, navigation, changing tabs

// at component where passing id as props need to handle using routing params

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Methods from "../../modules/Methods/Methods";
import MethodSetting from "../../modules/MethodSetup2/MethodSetting";
import Sequence from "../../modules/Sequence/Sequence";
import Settings from "../../modules/Settings/Settings";
import AvailableSequence from "../../modules/AvailableSequence/AvailableSequence";
import SequenceCreation from "../../modules/SequenceCreation/SequenceCreation";
import Documantation from "../../modules/Documantation/Documantation.js";
import { useSelector } from "react-redux";

const TabContext = createContext();

const routeConfig = {
    "/": { name: "Methods", Component: Methods },
    "/method-setup": { name: "Methods", Component: Methods },
    "/settings": { name: "Settings", Component: Settings },
    "/sequence": { name: "Run Synthesis", Component: Sequence },
    "/available-sequence": { name: "Available Sequence", Component: AvailableSequence },
    "/method-setting/:id": { name: "Method Setting", Component: MethodSetting },
    "/sequence-editor/:id": { name: "Sequence Editor", Component: SequenceCreation },
    "/method-setting": { name: "Method Setting", Component: MethodSetting },
    "/sequence-editor": { name: "Sequence Editor", Component: SequenceCreation },
    "/documantation": { name: "Documantation", Component: Documantation },
};

const findSequenceName = (sequence, id) => {
    const selectedSequence = sequence.find((el) => el.id === id);
    return selectedSequence?.name;
};

const findMethodSettingName = (method, id) => {
    const selectedMethod = method.find((el) => el.id === id);
    return selectedMethod?.method_name;
};

export const TabProvider = ({ children }) => {
    const [tabs, setTabs] = useState([]);

    const [activeTabId, setActiveTabId] = useState(null);

    const navigate = useNavigate();

    const sequence = useSelector((state) => state.sequence.sequence);

    const methods = useSelector((state) => state.methodSetup.method);

    const addTab = useCallback((path) => {
        setTabs((prev) => {
            const existingTab = prev.find((tab) => tab.path === path);

            if (existingTab) {
                setActiveTabId(existingTab.id);
                return prev;
            }

            let id = null;

            let pathSegments;

            const matchedRoute = Object.keys(routeConfig).find((routeKey) => {
                pathSegments = path.split("/");

                const routeKeySegments = routeKey.split("/");

                if (pathSegments.length !== routeKeySegments.length) {
                    return false;
                }

                id = pathSegments.length === 3 ? pathSegments[pathSegments.length - 1] : null;

                return routeKeySegments.every((segment, index) => segment.startsWith(":") || segment === pathSegments[index]);
            });

            if (!matchedRoute) {
                console.warn(`No route found for path: ${path}`);
                return prev;
            }

            let additionalName = null;

            if (pathSegments[1] === "sequence-editor") {
                additionalName = findSequenceName(sequence, id);
            } else if (pathSegments[1] === "method-setting") {
                additionalName = findMethodSettingName(methods, id);
            }

            const name = `${routeConfig[matchedRoute]?.name}${!additionalName ? "" : ` / ${additionalName}`}`;

            const { Component } = routeConfig[matchedRoute];

            const newTab = {
                id: Date.now(),
                path,
                component: <Component key={Date.now()} id={id} />,
                name: name || "Unknown",
            };

            setActiveTabId(newTab.id);

            return [...prev, newTab];
        });
    }, []);

    const closeTab = useCallback(
        (tabId) => {
            setTabs((prev) => {
                const tabIndex = prev.findIndex((tab) => tab.id === tabId);
                const newTabs = prev.filter((tab) => tab.id !== tabId);

                if (activeTabId === tabId && newTabs.length > 0) {
                    const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);

                    const activeTab = tabs.find((el) => el.id === newTabs[newActiveIndex].id);

                    navigate(activeTab.path);

                    setActiveTabId(newTabs[newActiveIndex].id);
                }

                return newTabs;
            });
        },
        [activeTabId]
    );

    return <TabContext.Provider value={{ tabs, activeTabId, addTab, closeTab, setActiveTabId }}>{children}</TabContext.Provider>;
};

export const TabNavigation = (props) => {
    const { isNavOpen } = props;

    const { tabs, activeTabId, closeTab, setActiveTabId } = useContext(TabContext);

    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTabId(tab.id);
        navigate(tab.path);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white border-b border-gray-200 pt-1">
                <div
                    className={`flex overflow-x-auto no-scrollbar transition-all duration-300 ${
                        isNavOpen ? "w-[calc(100vw-16rem-150px)]" : "w-[calc(100vw-150px)]"
                    } naigation-tab-scrollbar-style`}
                >
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => handleTabClick(tab)}
                            className={`flex items-center w-fit h-9 px-4 border mx-1 mb-0.5 border-neutral-500 rounded-xl cursor-pointer ${
                                activeTabId === tab.id ? "bg-[#f7e9d2] text-gray-800" : "bg-[#faf8f5] text-neutral-800"
                            } `}
                        >
                            <span className="truncate flex-1">{tab.name}</span>

                            {tabs.length > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeTab(tab.id);
                                    }}
                                    className="ml-2 px-2 py-1 rounded-full hover:bg-gray-200"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {tabs.map((tab) => {
                    return (
                        <div key={tab.id} className={`h-full ${activeTabId === tab.id ? "block" : "hidden"}`}>
                            {tab.component}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TabNavigation;

export const RouteHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addTab } = useContext(TabContext);

    useEffect(() => {
        if (location.pathname === "/") {
            addTab("/method-setup");
            navigate("/method-setup");
        } else {
            addTab(location.pathname);
        }
    }, [location.pathname, addTab, navigate]);

    return null;
};