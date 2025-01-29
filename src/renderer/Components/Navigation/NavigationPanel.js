// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ReactComponent as DownIcon } from "../../Assets/chevron-down.svg";
// import { useDispatch, useSelector } from "react-redux";
// import ConfirmationPopup from "../Popup/ConfirmationPopup";
// import { updateFormState } from "../../../redux/reducers/formState/formState";
// import { BookText } from "lucide-react";

// export default function NavigationPanel(props) {
//     const { isNavOpen, setIsNavOpen } = props;
//     const location = useLocation();
//     const navigate = useNavigate();
//     const isFormDirty = useSelector((state) => state.formState.formState)?.isDirty;

//     const links = [
//         { label: "Method Setup", to: "method-setup", isShowSubLink: true, subLink: [{ label: "Method Editor", to: "method-setting" }] },
//         { label: "Settings", to: "settings" },
//         { label: "Run Synthesis", to: "sequence" },
//         { label: "Run Demo", to: "demo" },
//         { label: "Available Sequence", to: "available-sequence", isShowSubLink: true, subLink: [{ label: "Sequence Editor", to: "sequence-editor" }] },
//     ];

//     const [activeTab, setActiveTab] = useState(() => {
//         const currentPath = location.pathname.split("/").pop();
//         const foundLink = links.find((link) => link.to === currentPath);
//         if (foundLink) return foundLink.to;

//         for (const link of links) {
//             if (link.isShowSubLink) {
//                 const foundSubLink = link.subLink.find((subLink) => subLink.to === currentPath);
//                 if (foundSubLink) return link.to;
//             }
//         }

//         return links[0].to;
//     });

//     useEffect(() => {
//         const currentPath = location.pathname.split("/").pop();
//         const foundLink = links.find((link) => link.to === currentPath);
//         if (foundLink) {
//             setActiveTab(currentPath);
//             return;
//         }

//         for (const link of links) {
//             if (link.isShowSubLink) {
//                 const foundSubLink = link.subLink.find((subLink) => subLink.to === currentPath);
//                 if (foundSubLink) {
//                     setActiveTab(link.to);
//                     return;
//                 }
//             }
//         }
//     }, [location.pathname]);

//     const [showConfirmationPopup, setShowConfirmationPopup] = useState(null);

//     const handleNavigation = (to) => {
//         // if (isFormDirty) {
//         //     setShowConfirmationPopup(to);
//         // } else {
//         // }
//         navigate(to);
//         setActiveTab(to);
//     };

//     const dispatch = useDispatch();

//     return (
//         <>
//             <nav
//                 className={`fixed top-0 z-[30] left-0 h-screen w-64 bg-gray-200 transition-transform duration-300 shadow-lg ${
//                     isNavOpen ? "translate-x-0" : "-translate-x-full"
//                 }`}
//             >
//                 <ul className="space-y-4 mt-10 ml-8">
//                     {links.map((el, index) => {
//                         return (
//                             <li key={index}>
//                                 <div className="flex flex-row items-center">
//                                     {activeTab === el.to && (
//                                         <span>
//                                             <DownIcon className="-rotate-90 -ml-4" />
//                                         </span>
//                                     )}
//                                     <Link
//                                         className={`font-bold text-lg hover:tracking-wider transition-all duration-300 ${
//                                             activeTab === el.to && !el?.subLink?.length && "border-b-2 tracking-wider border-neutral-500"
//                                         }`}
//                                         to={el.to}
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             handleNavigation(el.to);
//                                         }}
//                                     >
//                                         {el.label}
//                                     </Link>
//                                 </div>

//                                 {!!el.isShowSubLink &&
//                                     el?.subLink?.map((subLinkEl, subLinkIndex) => (
//                                         <div className="mt-3 ml-4" key={subLinkIndex}>
//                                             -
//                                             <Link
//                                                 className={`font-medium ml-1 text-base hover:tracking-wider transition-all duration-300 ${
//                                                     location.pathname.includes(subLinkEl.to) && "border-b-2 tracking-wider border-neutral-500"
//                                                 }`}
//                                                 to={subLinkEl.to}
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     handleNavigation(subLinkEl.to);
//                                                 }}
//                                             >
//                                                 {subLinkEl.label}
//                                             </Link>
//                                         </div>
//                                     ))}
//                             </li>
//                         );
//                     })}
//                 </ul>

//                 <Link to="/documantation" className="fixed bottom-4 ml-8 cursor-pointer font-medium flex flex-row items-center gap-3 text-[#738ff5]">
//                     <BookText />
//                     Documantation
//                 </Link>
//             </nav>

//             <div
//                 className={`bottom-10 ${!isNavOpen ? "left-2" : "left-60"} transition-all duration-300 cursor-pointer absolute z-[30]`}
//                 onClick={() => setIsNavOpen((prevState) => !prevState)}
//             >
//                 <DownIcon
//                     className={`${
//                         isNavOpen ? "rotate-90" : "-rotate-90"
//                     } rounded-full border-2 cursor-pointer bg-neutral-200 transition-all duration-300 border-neutral-500`}
//                 />
//             </div>

//             <ConfirmationPopup
//                 isOpen={!!showConfirmationPopup}
//                 closePopup={() => setShowConfirmationPopup(null)}
//                 handleConfirm={() => {
//                     navigate(showConfirmationPopup);
//                     setActiveTab(showConfirmationPopup);
//                     setShowConfirmationPopup(null);
//                     dispatch(updateFormState(false));
//                 }}
//                 desc="Are you sure to change module? you will lose unsaved work!"
//                 header="Change module!"
//             />
//         </>
//     );
// }

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutGrid, Settings, Play, Video, List, BookText, ChevronRight, ChevronLeft } from "lucide-react";

export default function NavigationPanel({ isNavOpen, setIsNavOpen }) {
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        {
            label: "Method Setup",
            icon: LayoutGrid,
            to: "method-setup",
            isShowSubLink: true,
            subLink: [{ label: "Method Editor", to: "method-setting" }],
        },
        {
            label: "Settings",
            icon: Settings,
            to: "settings",
        },
        {
            label: "Run Synthesis",
            icon: Play,
            to: "sequence",
        },
        {
            label: "Run Demo",
            icon: Video,
            to: "demo",
        },
        {
            label: "Available Sequence",
            icon: List,
            to: "available-sequence",
            isShowSubLink: true,
            subLink: [{ label: "Sequence Editor", to: "sequence-editor" }],
        },
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

    const handleNavigation = (to) => {
        navigate(to);
        setActiveTab(to);
    };

    return (
        <>
            <div className="relative">
                <nav
                    className={`fixed top-0 left-0 z-30 h-screen  bg-white shadow-2xl transition-all duration-300 ${
                        isNavOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full"
                    } overflow-hidden`}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo or Brand Area */}
                        <div
                            className={`
                        p-4 flex items-center 
                        ${isNavOpen ? "justify-between" : "justify-center"}
                    `}
                        >
                            {isNavOpen && <h2 className="text-xl font-bold text-neutral-700">Peptide</h2>}
                            <button onClick={() => setIsNavOpen(!isNavOpen)} className="hover:bg-blue-50 p-2 rounded-full">
                                {isNavOpen ? <ChevronLeft /> : <ChevronRight />}
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <ul className="flex-grow overflow-y-auto py-4 space-y-2">
                            {links.map((link, index) => (
                                <li key={index} className="px-4">
                                    <Link
                                        to={link.to}
                                        onClick={() => handleNavigation(link.to)}
                                        className={` flex items-center p-3 rounded-lg transition-all duration-300 ${
                                            activeTab === link.to ? "bg-amber-200 text-black" : "hover:bg-gray-100 text-gray-700"
                                        } ${isNavOpen ? "w-full" : "w-12 justify-center"}`}
                                    >
                                        <link.icon className="mr-3" size={20} />
                                        {isNavOpen && <span>{link.label}</span>}
                                    </Link>

                                    {isNavOpen && link.isShowSubLink && (
                                        <div className="ml-6 mt-2 space-y-1">
                                            {link.subLink.map((subLink, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subLink.to}
                                                    onClick={() => handleNavigation(subLink.to)}
                                                    className={`
                                                    block px-3 py-2 text-sm rounded-md transition-all
                                                    ${location.pathname.includes(subLink.to) ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-600"}
                                                `}
                                                >
                                                    {subLink.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Footer Link */}
                        <Link
                            to="/documentation"
                            className={`
                            flex items-center p-4 border-t 
                            hover:bg-gray-100 transition-all
                            ${isNavOpen ? "justify-start" : "justify-center"}
                        `}
                        >
                            <BookText className="mr-3" size={20} />
                            {isNavOpen && <span>Documentation</span>}
                        </Link>
                    </div>
                </nav>
            </div>

            {!isNavOpen && (
                <button
                    onClick={() => setIsNavOpen(true)}
                    className="fixed bottom-6 left-6 z-40 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-all duration-300"
                >
                    <ChevronRight className="text-blue-600" />
                </button>
            )}
        </>
    );
}
