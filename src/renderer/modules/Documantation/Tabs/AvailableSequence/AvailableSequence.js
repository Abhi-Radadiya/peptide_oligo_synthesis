// import React from "react";

// export default function Sequence() {
//     return (
//         <>
//             <h1>Sequence</h1>
//             <h6>List of Defined Sequence</h6>
//             <p>Display list of defined sequence with number of blocks in each sequence, file name</p>
//             <p>functionality </p>
//             <ul>
//                 <li>Delete sequence</li>
//                 <li>Edit sequence</li>
//                 <li>Create new sequence</li>
//                 <li>Display sequence blocks</li>
//             </ul>

//             {/* Defination of new sequence or edit sequence */}

//             {/* step 1 */}
//             <p>Enter sequence name</p>
//             <p>
//                 Enter sequence by either typing or by selecting block by pressing <strong>ENter block</strong> button
//             </p>
//             <p>
//                 Validation of enterd block : if user enter block (Amedite bloxk) which is not used in bottle mapping will throw invalidation error
//             </p>

//             {/* step 2 */}
//             <h6>Generate block</h6>
//             <p>
//                 based on entered sequence blocks it will ask to generate blocks two of kinds either of 1 option or 3 option
//                 <span>1 options will generate block as each block is seperated</span>
//                 <span>3 options will generate block as 3 block being combined</span>
//             </p>

//             {/* step 3 */}
//             <h6>Assing method to blocks</h6>
//             <p>
//                 Select blocks from input of sequence (user can select as many blocks as he wants)  Selected block will show in yellow in right section
//             </p>

//             <p>
//                 After selecting block select method which user want to assign to selected block/s from right section
//             </p>

//             <p>
//                 as user assign method this block in right section shows in color of method color and to see method color press icon <InfoIcon />
//             </p>

//             <p>Press save to save this method</p>

//             {/* user also can import sequence from .txt file from computer starts */}
//             <h6>Import Sequence</h6>

//             <p>
//                 Press button of <strong>Import sequence button</strong>
//             </p>

//             <p>Two type of import : File import & Predefined sequence </p>

//             {/* File import start */}
//             <h6>File import</h6>

//             <p>
//                 to import from notepad click to upload and select as many file as user wants
//             </p>

//             <p>
//                 After selection it will generate sequence blocks. And press import selected sequnce.
//             </p>

//             <p>
//                 To define mutiple sequence in single .txt (Text file) seperate each sequence with unique key word : 'NEW ~ '
//                 <pre>
//                 NEW ~ AG TTG CG T CGT GT TT G G T T CCACACA GTC CAGT AG TTG CG T CGT GT TT G G T T
// NEW ~ CCACACA GTC CAGT AG TTG CG T CGT GT TT G G T
// NEW ~ CAGT AG TTG CG T CGT GT TT G G T T CCACACA GTC CAGT AG TTG CG T CGT GT
//                 </pre>

//                 while user import this file it will create three sequences
//             </p>
//             {/* File import end */}

// {/* Predefiened import starts */}
//             <h6>Predefiened seuqence</h6>

//             <p>from dropdown select as many sequence want to import and then press : "import selected sequence" button </p>
// {/* Predefiened import ends */}

//             <p>
//                 From top user can select which sequence need to operate on and then generate block and assign method as step 2 and step 3.
//             </p>

//             {/* user also can import sequence from .txt file from computer end */}

//         </>

//     );
// }

import React from "react";
import { List, PlusCircle, FileText, Edit, Trash2, Eye, Info, Upload, FileUp, Database } from "lucide-react";

const ProcessStep = ({ number, title, children }) => (
    <div className="relative border-l-4 border-blue-400 pl-6 pb-6">
        <div className="absolute -left-[14px] top-0 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">{number}</div>
        <h3 className="font-semibold text-lg mb-3">{title}</h3>
        {children}
    </div>
);

export default function SequenceDocumentation() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 overflow-auto scrollbar-style h-[calc(100vh-130px)]">
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <List className="w-6 h-6 text-blue-600" />
                    <h1 className="text-2xl font-bold">Sequence Management</h1>
                </div>

                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h2 className="font-semibold mb-2">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { icon: Eye, text: "View sequence blocks" },
                                { icon: Edit, text: "Edit existing sequences" },
                                { icon: PlusCircle, text: "Create new sequences" },
                                { icon: Trash2, text: "Delete sequences" },
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <feature.icon className="w-4 h-4 text-blue-600" />
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sequence Creation Process */}
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold">Sequence Creation Process</h2>
                </div>

                <div className="space-y-6">
                    <ProcessStep number="1" title="Initial Setup">
                        <div className="space-y-3">
                            <div className="bg-neutral-50 p-3 rounded">
                                <p className="font-medium">Enter sequence name</p>
                                <p className="text-neutral-600 mt-1">Provide a unique identifier for your sequence</p>
                            </div>

                            <div className="bg-neutral-50 p-3 rounded">
                                <p className="font-medium">Enter Sequence</p>
                                <ul className="mt-2 space-y-2 text-neutral-600">
                                    <li>Type directly by typing or use "Enter block" button to create sequence by selecting blocks</li>
                                    <li className="text-red-600">Note: Invalid blocks (not in bottle mapping) will trigger validation errors</li>
                                </ul>
                            </div>
                        </div>
                    </ProcessStep>

                    <ProcessStep number="2" title="Block Generation">
                        <div className="bg-neutral-50 p-4 rounded">
                            <h4 className="font-medium mb-2">Generation Options</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-white rounded border border-neutral-200">
                                    <span className="font-medium">1-Block Option</span>
                                    <p className="text-sm text-neutral-600 mt-1">Each block generated separately</p>
                                </div>
                                <div className="p-3 bg-white rounded border border-neutral-200">
                                    <span className="font-medium">3-Block Option</span>
                                    <p className="text-sm text-neutral-600 mt-1">Combines three blocks together</p>
                                </div>
                            </div>
                        </div>
                    </ProcessStep>

                    <ProcessStep number="3" title="Method Assignment">
                        <div className="space-y-3">
                            <div className="bg-neutral-50 p-3 rounded">
                                <ol className="space-y-2 text-neutral-600">
                                    <li>1. Select blocks from input sequence (multiple selection allowed)</li>
                                    <li>2. Selected blocks highlighted in yellow in right section</li>
                                    <li>3. Choose method for selected block(s)</li>
                                    <li>4. Blocks color-coded by assigned method</li>
                                    <li>5. Press save to confirm assignments</li>
                                </ol>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                                <Info className="w-4 h-4" />
                                <span>Click info icon to view method color reference</span>
                            </div>
                        </div>
                    </ProcessStep>
                </div>
            </section>

            {/* Sequence Import Options */}
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Upload className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold">Import Options</h2>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* File Import */}
                        <div className="border border-neutral-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <FileUp className="w-5 h-5 text-blue-600" />
                                <h3 className="font-semibold">File Import</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-neutral-600">Import from text files with multiple sequences</p>
                                <div className="bg-neutral-50 p-3 rounded text-sm font-mono">
                                    NEW ~ AG TTG CG T CGT GT
                                    <br />
                                    NEW ~ CCACACA GTC CAGT
                                    <br />
                                    NEW ~ CAGT AG TTG CG T
                                </div>
                                <p className="text-sm text-neutral-600">Separate sequences with 'NEW ~' keyword</p>
                            </div>
                        </div>

                        {/* Predefined Import */}
                        <div className="border border-neutral-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Database className="w-5 h-5 text-purple-600" />
                                <h3 className="font-semibold">Predefined Sequences</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-neutral-600">Import from predefined sequence library:</p>
                                <ol className="space-y-2 text-neutral-600 ml-4">
                                    <li>1. Select sequences from dropdown</li>
                                    <li>2. Click "Import Selected Sequence"</li>
                                    <li>3. Generate blocks and assign methods</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
