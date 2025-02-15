// import React from "react";

// export default function MethodSetup() {
//     return (
//         <>
//             <h1>Method setup</h1>
//             <p>User can search method by name, delete selected method and can create new method.</p>
//             <p>List of predefined methods where it display method by name, column, color and can edit predefined method.</p>
//             <h1>Method editor</h1>
//             {/* Below is details part of method setup */}
//             <p>Define method with parametes and assign unique color for each method.</p>

//             <div className="mb-3">
//                 Based on given parametes <strong className="border border-neutral-300 bg-neutral-50 pb-0.5 rounded px-1">Method name</strong>,{" "}
//                 <strong className="border border-neutral-300 bg-neutral-50 pb-0.5 rounded px-1">Column size in ml</strong>,{" "}
//                 <strong className="border border-neutral-300 bg-neutral-50 pb-0.5 rounded px-1">Synthesis scale in μmol</strong>,{" "}
//                 <strong className="border border-neutral-300 bg-neutral-50 pb-0.5 rounded px-1">Loading time in min</strong>,
//                 <strong className="border border-neutral-300 bg-neutral-50 pb-0.5 rounded px-1">Amedite excess factor in %</strong> and{" "}
//                 <strong className="border border-neutral-300 bg-neutral-50 pb-0.5 rounded px-1"> Amedite concentration in mmol.</strong>
//             </div>

//             <p>Calculate results based on user input with following formulas</p>

//             <div className="mt-2 space-y-3">
//                 <pre className="w-fit border border-neutral-500 bg-neutral-100 rounded px-2 py-1">
//                     Amedite volume = (Synthesis Scale * Amedite ExcessFactor) / Amedite Concentration
//                 </pre>
//                 <pre className="w-fit border border-neutral-500 bg-neutral-100 rounded px-2 py-1">
//                     ACT Volume = Amedite Volume / (1 - ACT Excess Factor / 100) - Amedite Volume
//                 </pre>
//                 <pre className="w-fit border border-neutral-500 bg-neutral-100 rounded px-2 py-1">Total Coupling Volume = Amedite Volume + ACT Volume</pre>
//                 <pre className="w-fit border border-neutral-500 bg-neutral-100 rounded px-2 py-1">Amedite Delivery Time = ACT Volume / Loading Time</pre>
//                 <pre className="w-fit border border-neutral-500 bg-neutral-100 rounded px-2 py-1">ACT Delivery Time = Amedite Volume / Loading Time</pre>
//             </div>

//             {/* Below is initial step part of method setup */}

//             <h1>Initial step</h1>
//             <h4>Column wash</h4>
//             <p>
//                 Select solvent for column wash and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally
//                 number of loop is 1 but user can change all parameters of column wash.
//             </p>
//             <p>Default waste column is first column user can modify it.</p>

//             {/* Below is Run step part of method setup starts */}
//             <h1>Run step</h1>

//             {/* deblock setting */}
//             <h4>De - block setting</h4>
//             <p>
//                 Select solvent for de-block and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally number
//                 of loop is 1 but user can change all parameters of it.
//             </p>
//             <p>User can enble/disable de-block.</p>
//             <p>Default waste column is first column user can modify it.</p>
//             <h6>Wash setting for de block</h6>
//             <p>
//                 Select solvent for column wash and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally
//                 number of loop is 1 but user can change all parameters of column wash.
//             </p>

//             {/* Coupling setting */}

//             <h4>Coupling setting</h4>
//             <p>
//                 Select solvent for Coupling and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally number
//                 of loop is 1 but user can change all parameters of it.
//             </p>
//             <p>User can enble/disable de-coupling.</p>
//             <p>Default waste column is first column user can modify it.</p>

//             <h6>Delivery system</h6>
//             <p>
//                 Enter following parameters for delivery system : Flow rate (by defuault taken from colume selectoin in details section) , Circulation time, Amedite volume
//                 (by default taken from amedite volumn calculated in details section) and ACT volume ( by default taken from ACT volume calculated in details section )
//             </p>

//             <p>Default waste column is first column user can modify it.</p>

//             <h6>Wash setting for coupling</h6>
//             <p>
//                 Select solvent for column wash and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally
//                 number of loop is 1 but user can change all parameters of column wash.
//             </p>

// important note : If user can toggle includance of following sections : Oxidization, Sulfurization & extra

//             {/* Oxidization setting */}

//             <h4>Coupling setting</h4>
//             <p>
//                 Select solvent for Coupling and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally number
//                 of loop is 1 but user can change all parameters of it.
//             </p>
//             <p>User can enble/disable Coupling.</p>
//             <p>Default waste column is first column user can modify it.</p>
//             <h6>Wash setting for Coupling</h6>
//             <p>
//                 Select solvent for column wash and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally
//                 number of loop is 1 but user can change all parameters of column wash.
//             </p>

//             {/*  I have same setting for 3 Oxidization, Sulfurization & extra as oxidizations so make its so. */}

//             {/* Capping setting */}

// <h4>Capping setting</h4>

// <span>There is two cappings : Capping A & Capping B</span>

// <span>For both capping select solvent and by default from defination of solvent it gets flow rate, and volume from half of Amedite volume
//     additionally number of loop is 1 but user can change all parameters of it.</span>

//             <p>User can enble/disable Capping.</p>

//             <p>Default waste column is first column user can modify it.</p>

//             <h6>Wash setting for Capping</h6>

//             <p>
//                 Select solvent for column wash and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally
//                 number of loop is 1 but user can change all parameters of column wash.
//             </p>

//             {/* Run step part of method setup end */}

//             {/* Below is Final step part of method setup starts */}

//             <h4>De - block setting</h4>
//             <p>
//                 Select solvent for de-block and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally number
//                 of loop is 1 but user can change all parameters of it.
//             </p>
//             <p>User can enble/disable de-block.</p>
//             <p>Default waste column is first column user can modify it.</p>
//             <h6>Wash setting for de block</h6>
//             <p>
//                 Select solvent for column wash and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally
//                 number of loop is 1 but user can change all parameters of column wash.
//             </p>

//             <h4>DEA setting</h4>
//             <p>
//                 Select solvent for DEA and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally number
//                 of loop is 1 but user can change all parameters of it.
//             </p>
//             <p>User can enble/disable DEA.</p>
//             <p>Default waste column is first column user can modify it.</p>
//             <h6>Wash setting for DEA</h6>
//             <p>
//                 Select solvent for column wash and by default from defination of solvent it gets flow rate, and volume from column size define in details additionally
//                 number of loop is 1 but user can change all parameters of column wash.
//             </p>
//             {/*  Final step part of method setup ends */}

//         </>
//     );
// }

// {/* this is all parametes to define method */}

import React from "react";
import { Beaker, Settings, Play, Flag, FlaskConical, Calculator, ToggleLeft, Droplet, Workflow } from "lucide-react";

const StepSection = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`border-l-4 pl-4 py-2 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
            <Icon className="w-5 h-5" />
            <h4 className="font-semibold text-lg">{title}</h4>
        </div>
        {children}
    </div>
);

export default function MethodSetup() {
    const formulasList = [
        {
            name: "Amedite Volume",
            formula: "(Synthesis Scale × Amedite ExcessFactor) / Amedite Concentration",
        },
        {
            name: "ACT Volume",
            formula: "Amedite Volume / (1 - ACT Excess Factor / 100) - Amedite Volume",
        },
        {
            name: "Total Coupling Volume",
            formula: "Amedite Volume + ACT Volume",
        },
        {
            name: "Amedite Delivery Time",
            formula: "ACT Volume / Loading Time",
        },
        {
            name: "ACT Delivery Time",
            formula: "Amedite Volume / Loading Time",
        },
    ];

    const parameters = ["Method name", "Column size in ml", "Synthesis scale in μmol", "Loading time in min", "Amedite excess factor in %", "Amedite concentration in mmol"];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 overflow-auto scrollbar-style h-[calc(100vh-130px)]">
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Beaker className="w-6 h-6 text-blue-600" />
                    <h1 className="text-2xl font-bold">Method Setup Overview</h1>
                </div>
                <div className="space-y-4 text-neutral-700">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h2 className="font-semibold mb-2">Key Features</h2>
                        <ul className="space-y-2 ml-4">
                            <li>Search methods by name</li>
                            <li>Create and delete methods</li>
                            <li>Access predefined methods (name, column, color)</li>
                            <li>Edit existing methods</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Method Details Section */}
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold">Method Details</h2>
                </div>

                <div className="space-y-6">
                    {/* Parameters */}
                    <div className="bg-neutral-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Required Parameters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {parameters.map((param, index) => (
                                <div key={index} className="px-3 py-2 bg-white border border-neutral-200 rounded-md">
                                    {param}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formulas */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Calculator className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold">Calculation Formulas</h3>
                        </div>
                        <div className="space-y-3">
                            {formulasList.map((item, index) => (
                                <div key={index} className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                                    <div className="font-medium text-sm text-neutral-600 mb-1">{item.name}</div>
                                    <div className="bg-white p-2 rounded font-mono text-sm">{item.formula}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Workflow className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold">Process Steps</h2>
                </div>

                <div className="space-y-8">
                    {/* Initial Step */}
                    <div className="border-l-4 border-blue-400 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-3">
                            <Flag className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-xl">Initial Step</h3>
                        </div>
                        <StepSection icon={Droplet} title="Column Wash" className="border-blue-200">
                            <ul className="space-y-2 text-neutral-600">
                                <li>Select solvent for column wash</li>
                                <li>Default flow rate from solvent definition</li>
                                <li>Volume from column size</li>
                                <li>Adjustable loop count (default: 1)</li>
                                <li>Configurable waste column (default: first column)</li>
                            </ul>
                        </StepSection>
                    </div>

                    {/* Run Step */}
                    <div className="border-l-4 border-green-400 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-3">
                            <Play className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-xl">Run Step</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <ToggleLeft className="w-5 h-5 text-yellow-600" />
                                    <span className="font-medium">Optional Sections</span>
                                </div>
                                <p>Users can toggle the inclusion of:</p>
                                <ul className="ml-5 mt-2 list-disc">
                                    <li>Oxidization</li>
                                    <li>Sulfurization</li>
                                    <li>Extra steps</li>
                                </ul>
                            </div>

                            <div className="bg-neutral-50 p-3 rounded">
                                <h6 className="font-medium mb-2">Wash Settings for All Run Steps</h6>
                                <ul className="space-y-2 text-neutral-600">
                                    <li>Configurable column wash after capping</li>
                                    <li>Solvent selection with default parameters</li>
                                    <li>Volume based on column size</li>
                                    <li>Adjustable loop count</li>
                                </ul>
                            </div>

                            {/* Common Process Settings */}
                            {["De-block", "Coupling", "Oxidization", "Sulfurization", "Capping"].map((process, index) => {
                                if (process === "Capping")
                                    return (
                                        <StepSection icon={FlaskConical} title="Capping Settings" key={index} className="border-green-200">
                                            <div className="space-y-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <h5 className="font-medium mb-2">Two-Stage Capping Process</h5>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <span className="font-medium">Capping A & Capping B</span>
                                                            <ul className="mt-2 space-y-2 text-neutral-600">
                                                                <li>Separate solvent selection for each capping stage</li>
                                                                <li>Default volume: Half of Amedite volume for each stage</li>
                                                                <li>Flow rate inherited from solvent definition</li>
                                                                <li>Default loop count: 1 (adjustable)</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <ul className="space-y-2 text-neutral-600">
                                                    <li>Enable/disable capping process</li>
                                                    <li>Customizable waste column (default: first column)</li>
                                                    <li>All parameters can be modified as needed</li>
                                                </ul>
                                            </div>
                                        </StepSection>
                                    );

                                return (
                                    <StepSection key={process} icon={FlaskConical} title={`${process} Settings`} className="border-green-200">
                                        <ul className="space-y-2 text-neutral-600">
                                            <li>Solvent selection with default parameters</li>
                                            <li>Adjustable flow rate and volume</li>
                                            <li>Configurable loop count</li>
                                            <li>Enable/disable option</li>
                                            <li>Customizable waste column</li>
                                            {process === "Coupling" && (
                                                <li className="mt-2 bg-blue-50 p-2 rounded">Includes delivery system configuration for Amedite and ACT volumes</li>
                                            )}
                                        </ul>
                                    </StepSection>
                                );
                            })}
                        </div>
                    </div>

                    {/* Final Step */}
                    <div className="border-l-4 border-purple-400 pl-4 py-2 space-y-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Flag className="w-5 h-5 text-purple-600" />
                            <h3 className="font-semibold text-xl">Final Step</h3>
                        </div>
                        {["De-block", "DEA"].map((process) => (
                            <StepSection key={process} icon={FlaskConical} title={`${process} Settings`} className="border-purple-200">
                                <ul className="space-y-2 text-neutral-600">
                                    <li>Solvent selection with default parameters</li>
                                    <li>Adjustable flow rate and volume</li>
                                    <li>Configurable loop count</li>
                                    <li>Enable/disable option</li>
                                    <li>Customizable waste column</li>
                                </ul>
                            </StepSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
