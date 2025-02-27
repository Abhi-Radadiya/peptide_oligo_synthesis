import React, { useState } from "react";
import ModelWrapper from "../../../../../../Components/Model/ModelWrapper";
import { Input } from "../../../../../../Components/Input/Input";
import { ModelButton } from "../../../../../../Components/Buttons/Buttons";
import OpenValveToggleSwitch from "../Components/open-valve-toggle-switch";
import { Droplet, FlaskConical } from "lucide-react";

export default function BottleOperationModel(props) {
    const { onClose, bottleOperationDetails, handleOpenValve } = props;

    const [isMicroLitre, setIsMicroLitre] = useState(true);

    const [volume, setVolume] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        handleOpenValve(volume, isMicroLitre ? "microLitre" : "miliLitre");
    };

    return (
        <>
            <ModelWrapper header="Open Valve" width="w-96" onClose={onClose}>
                <div className="p-4 mb-4 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border border-amber-200">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center">
                            <FlaskConical size={20} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-amber-800">Selected Chemical</div>
                        <div className="text-base font-semibold text-slate-800">{bottleOperationDetails?.label || "Chemical"}</div>
                    </div>
                </div>

                <form onSubmit={handleSave}>
                    <div className="mt-6 space-y-4">
                        {/* TODO need to transform this component into radio must not be switch */}
                        <OpenValveToggleSwitch
                            isChecked={isMicroLitre}
                            handleChange={setIsMicroLitre}
                            leftSwitchLabel="Mili Litre"
                            label="Volume Unit"
                            rightSwitchLabel="Micro Litre"
                        />

                        <Input
                            name="volume"
                            required={true}
                            placeholder={`Enter volume in ${isMicroLitre ? "micro" : "mili"} litre`}
                            type="number"
                            value={volume}
                            onChange={setVolume}
                            label="Volume"
                            labelClassName="font-medium text-base"
                        />

                        {!!volume && (
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                                <div className="flex items-start">
                                    <div className="mt-0.5 mr-2 text-blue-500">
                                        <Droplet size={16} />
                                    </div>
                                    <div>
                                        Valve will be opened until Amedite <span className="font-semibold text-blue-600">{bottleOperationDetails?.label || "Chemical"}</span> flows{" "}
                                        <span className="font-semibold text-blue-600">
                                            {volume} {isMicroLitre ? "micro" : "mili"} litre
                                        </span>
                                        .
                                    </div>
                                </div>
                            </div>
                        )}

                        <ModelButton onCancel={onClose} type={"submit"} />
                    </div>
                </form>
            </ModelWrapper>
        </>
    );
}

// import React, { useState } from "react";
// import { X, Droplet, ChevronRight, FlaskConical } from "lucide-react";

// // Model Wrapper Component
// const ModelWrapper = ({ header, width, onClose, children }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
//         <div className={`${width} max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-2xl p-6 transform transition-all duration-300 scale-100`}>
//             <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
//                 <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
//                     <FlaskConical size={20} className="text-amber-500" />
//                     {header}
//                 </h2>
//                 <button onClick={onClose} className="rounded-full p-1 text-slate-500 hover:bg-slate-100 transition-colors">
//                     <X size={20} />
//                 </button>
//             </div>

//             {children}
//         </div>
//     </div>
// );

// // Toggle Switch for Volume Units
// const OpenValveToggleSwitch = ({ isChecked, handleChange, leftSwitchLabel, rightSwitchLabel, label }) => (
//     <div className="flex flex-col space-y-2">
//         <label className="font-medium text-slate-700 text-sm">{label}</label>
//         <div className="relative flex items-center">
//             <span className={`transition-colors text-sm mr-3 cursor-pointer ${isChecked ? "text-slate-500" : "text-blue-600 font-medium"}`} onClick={() => handleChange(false)}>
//                 {leftSwitchLabel}
//             </span>

//             <div className="relative w-14 h-7 bg-slate-200 rounded-full cursor-pointer" onClick={() => handleChange(!isChecked)}>
//                 <div className="absolute inset-1">
//                     <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 transform ${isChecked ? "translate-x-7 bg-white" : "translate-x-0"}`} />
//                 </div>
//                 <div
//                     className={`absolute inset-0 rounded-full transition-colors ${isChecked ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-slate-300"}`}
//                     style={{ clipPath: "inset(0 0 0 0 round 9999px)" }}
//                 />
//             </div>

//             <span className={`transition-colors text-sm ml-3 cursor-pointer ${isChecked ? "text-blue-600 font-medium" : "text-slate-500"}`} onClick={() => handleChange(true)}>
//                 {rightSwitchLabel}
//             </span>
//         </div>
//     </div>
// );

// // Input Component
// const Input = ({ name, required, placeholder, type, value, onChange, label, labelClassName }) => (
//     <div className="space-y-1.5">
//         <label htmlFor={name} className={`block text-sm ${labelClassName}`}>
//             {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <div className="relative">
//             <input
//                 id={name}
//                 name={name}
//                 type={type}
//                 required={required}
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 placeholder={placeholder}
//                 className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-slate-800 placeholder-slate-400"
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 <Droplet size={18} className={`text-blue-400 ${value ? "opacity-100" : "opacity-30"}`} />
//             </div>
//         </div>
//     </div>
// );

// // Model Button
// const ModelButton = ({ onCancel, type }) => (
//     <div className="flex justify-end space-x-3 mt-6">
//         <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors duration-300">
//             Cancel
//         </button>
//         <button
//             type={type}
//             className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
//         >
//             Save <ChevronRight size={16} />
//         </button>
//     </div>
// );

// export default function BottleOperationModel({ onClose, bottleOperationDetails, handleOpenValve }) {
//     const [isMicroLitre, setIsMicroLitre] = useState(true);
//     const [volume, setVolume] = useState("");

//     const handleSave = (e) => {
//         e.preventDefault();
//         handleOpenValve(volume, isMicroLitre ? "microLitre" : "miliLitre");
//     };

//     return (
//         <ModelWrapper header="Open Valve" width="w-96" onClose={onClose}>
// <div className="p-4 mb-4 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 flex items-center gap-3">
//     <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border border-amber-200">
//         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center">
//             <FlaskConical size={20} className="text-white" />
//         </div>
//     </div>
//     <div>
//         <div className="text-sm font-medium text-amber-800">Selected Chemical</div>
//         <div className="text-base font-semibold text-slate-800">{bottleOperationDetails?.label || "Chemical"}</div>
//     </div>
// </div>

//             <form onSubmit={handleSave} className="bg-white rounded-lg">
//                 <div className="mt-4 space-y-6">
//                     <OpenValveToggleSwitch
//                         isChecked={isMicroLitre}
//                         handleChange={setIsMicroLitre}
//                         leftSwitchLabel="Mili Litre"
//                         label="Volume Unit"
//                         rightSwitchLabel="Micro Litre"
//                     />

//                     <Input
//                         name="volume"
//                         required={true}
//                         placeholder={`Enter volume in ${isMicroLitre ? "micro" : "mili"} litre`}
//                         type="number"
//                         value={volume}
//                         onChange={setVolume}
//                         label="Volume"
//                         labelClassName="font-medium text-slate-700 text-sm"
//                     />

// {!!volume && (
//     <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
//         <div className="flex items-start">
//             <div className="mt-0.5 mr-2 text-blue-500">
//                 <Droplet size={16} />
//             </div>
//             <div>
//                 Valve will be opened until Amedite <span className="font-semibold text-blue-600">{bottleOperationDetails?.label || "Chemical"}</span> flows{" "}
//                 <span className="font-semibold text-blue-600">
//                     {volume} {isMicroLitre ? "micro" : "mili"} litre
//                 </span>
//                 .
//             </div>
//         </div>
//     </div>
// )}

//                     <ModelButton onCancel={onClose} type="submit" />
//                 </div>
//             </form>
//         </ModelWrapper>
//     );
// }
