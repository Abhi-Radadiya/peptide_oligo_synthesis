import React from "react";
import { Beaker, Calculator, Edit2, Search, Plus, Trash } from "lucide-react";

export default function MethodSetup() {
    const parameters = [
        { name: "Method name", description: "Unique identifier for the method" },
        { name: "Column size in ml", description: "Specify the column volume in milliliters" },
        { name: "Synthesis scale in μmol", description: "Define the synthesis scale in micromoles" },
        { name: "Loading time in min", description: "Set the duration for loading in minutes" },
        { name: "Amedite excess factor in %", description: "Specify excess factor as a percentage" },
        { name: "Amedite concentration in mmol", description: "Define concentration in millimoles" },
    ];

    const formulas = [
        {
            name: "Amedite Volume",
            formula: "(Synthesis Scale × Amedite ExcessFactor) / Amedite Concentration",
            description: "Calculates the required volume of Amedite",
        },
        {
            name: "ACT Volume",
            formula: "Amedite Volume / (1 - ACT Excess Factor / 100) - Amedite Volume",
            description: "Determines the necessary ACT volume",
        },
        {
            name: "Total Coupling Volume",
            formula: "Amedite Volume + ACT Volume",
            description: "Calculates the total volume needed for coupling",
        },
        {
            name: "Amedite Delivery Time",
            formula: "ACT Volume / Loading Time",
            description: "Determines Amedite delivery duration",
        },
        {
            name: "ACT Delivery Time",
            formula: "Amedite Volume / Loading Time",
            description: "Calculates ACT delivery duration",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 overflow-auto scrollbar-style h-[calc(100vh-130px)]">
            {/* Method Setup Section */}
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Beaker className="w-6 h-6 text-blue-600" />
                    <h1 className="text-2xl font-bold text-neutral-800">Method Setup</h1>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        <div className="flex items-center gap-2 text-neutral-600">
                            <Search className="w-4 h-4" />
                            <span>Search methods</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                            <Plus className="w-4 h-4" />
                            <span>Create new</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                            <Trash className="w-4 h-4" />
                            <span>Delete selected</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h2 className="font-semibold mb-2 text-blue-800">Predefined Methods</h2>
                        <p className="text-blue-600">Access and manage predefined methods with customizable properties:</p>
                        <ul className="ml-5 mt-2 space-y-1 text-blue-700">
                            <li>Method name</li>
                            <li>Column specifications</li>
                            <li>Color coding</li>
                            <li>Edit capabilities</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Method Editor Section */}
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Edit2 className="w-6 h-6 text-purple-600" />
                    <h1 className="text-2xl font-bold text-neutral-800">Method Editor</h1>
                </div>

                <p className="text-neutral-600 mb-6">Define method parameters and assign unique colors for easy identification.</p>

                {/* Parameters */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Required Parameters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {parameters.map((param, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 rounded-md text-sm font-medium">{param.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calculations */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Calculator className="w-5 h-5 text-green-600" />
                        <h2 className="text-lg font-semibold">Calculations</h2>
                    </div>

                    <div className="space-y-4">
                        {formulas.map((formula, index) => (
                            <div key={index} className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                                <h3 className="font-medium text-neutral-800 mb-2">{formula.name}</h3>
                                <div className="bg-white p-3 rounded border border-neutral-300 font-mono text-sm">{formula.formula}</div>
                                <p className="mt-2 text-sm text-neutral-600">{formula.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
