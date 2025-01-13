import React from "react";
import { Info, Settings, Database, Columns, FileJson, FlaskConical } from "lucide-react";

export default function SettingsDocumentation() {
    const sections = [
        {
            title: "Bottle Mapping",
            icon: <FlaskConical className="w-5 h-5" />,
            description: "Configure your bottle positions for optimal workflow",
            content: "Organize your laboratory setup by mapping bottle positions:",
            details: ["Configure 24 positions for Amedite bottles", "Assign 10 positions for Solvent bottles"],
        },
        {
            title: "Prime Settings",
            icon: <Settings className="w-5 h-5" />,
            description: "Customize position-specific priming controls",
            content: "Fine-tune your priming configuration:",
            details: ["Enable/disable Amedite priming for specific positions", "Control Solvent priming settings individually"],
        },
        {
            title: "Column Editor",
            icon: <Columns className="w-5 h-5" />,
            description: "Manage and customize column specifications",
            content: "Configure pre-defined columns or create custom ones with detailed specifications:",
            details: [
                "Pre-configured options: 10 Barrel, 50 Barrel, 5 MLS, 20 MLS",
                "Adjustable parameters: Max pressure, Max flow rate, Diameter, Height, Liquid volume, Loading volume",
                "Create and save new column configurations",
            ],
        },
        {
            title: "Configuration",
            icon: <Database className="w-5 h-5" />,
            description: "Define detailed specifications for materials",
            content: "Set comprehensive specifications for your materials:",
            details: [
                "Amedite specifications: MW, Case no., MSDS, Concentration, Flow rate",
                "Solvent specifications: MW, Case no., MSDS, Concentration, Flow rate",
                "Maintain accurate material documentation",
            ],
        },
        {
            title: "Application Data",
            icon: <FileJson className="w-5 h-5" />,
            description: "Manage your application data seamlessly",
            content: "Export and import your configuration data:",
            details: ["Export complete system configuration as JSON", "Transfer settings between different installations", "Backup your configuration data"],
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 overflow-auto scrollbar-style h-[calc(100vh-130px)]">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Settings Guide</h1>
                <p className="text-neutral-600">Configure your system with these comprehensive settings.</p>
            </div>

            {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        {section?.icon}
                        <h2 className="text-xl font-semibold text-neutral-800">{section.title}</h2>
                    </div>

                    <div className="mb-2 text-neutral-600">{section.description}</div>

                    <div className="mt-4">
                        <p className="font-medium text-neutral-700 mb-2">{section.content}</p>
                        <ul className="space-y-2 ml-5">
                            {section.details.map((detail, idx) => (
                                <li key={idx} className="text-neutral-600 list-disc">
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-blue-700">Pro Tip</span>
                </div>
                <p className="text-blue-600">Remember to export your configuration data regularly to maintain a backup of your settings.</p>
            </div>
        </div>
    );
}
