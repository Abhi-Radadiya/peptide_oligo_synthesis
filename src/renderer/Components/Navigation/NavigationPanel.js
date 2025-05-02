import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutGrid, Settings, List, BookText, ChevronRight, ChevronLeft, Terminal, Proportions, AudioWaveform } from "lucide-react"

export default function NavigationPanel({ isNavOpen, setIsNavOpen }) {
    const location = useLocation()
    const navigate = useNavigate()

    const links = [
        {
            label: "Method Setup",
            icon: LayoutGrid,
            to: "method-setup",
            isShowSubLink: true,
            subLink: [{ label: "Method Editor", to: "method-setting" }]
        },
        {
            label: "Settings",
            icon: Settings,
            to: "settings"
        },
        {
            label: "Run Synthesis",
            icon: AudioWaveform,
            // TODO : Change name of tab
            to: "run-synthesis"
        },
        {
            label: "Available Sequence",
            icon: List,
            to: "available-sequence",
            isShowSubLink: true,
            subLink: [{ label: "Sequence Editor", to: "sequence-editor" }]
        },
        {
            label: "Synthesis Procedure",
            icon: Proportions,
            to: "synthesis-procedure"
        },
        {
            label: "Command",
            icon: Terminal,
            to: "command-editor"
        }
    ]

    const [activeTab, setActiveTab] = useState(() => {
        const currentPath = location.pathname.split("/").pop()
        const foundLink = links.find((link) => link.to === currentPath)
        if (foundLink) return foundLink.to

        for (const link of links) {
            if (link.isShowSubLink) {
                const foundSubLink = link.subLink.find((subLink) => subLink.to === currentPath)
                if (foundSubLink) return link.to
            }
        }

        return links[0].to
    })

    const handleNavigation = (to) => {
        navigate(to)
        setActiveTab(to)
    }

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
                                                    className={` block px-3 py-2 text-sm rounded-md transition-all ${
                                                        location.pathname.includes(subLink.to) ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-600"
                                                    }
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

                        <Link to="/documentation" className={` flex items-center p-4 border-t hover:bg-gray-100 transition-all ${isNavOpen ? "justify-start" : "justify-center"}`}>
                            <BookText className="mr-3" size={20} />
                            {isNavOpen && <span>Documentation</span>}
                        </Link>
                    </div>
                </nav>
            </div>

            {!isNavOpen && (
                <button onClick={() => setIsNavOpen(true)} className="fixed bottom-6 left-6 z-40 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-all duration-300">
                    <ChevronRight className="text-blue-600" />
                </button>
            )}
        </>
    )
}
