import React from "react";
import Select from "react-select";

export default function RunCard() {
    return (
        <>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden min-w-[400px] w-[400px] border border-neutral-200 transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4">
                    <h2 className="text-lg font-semibold text-neutral-800">Run Methods</h2>
                </div>

                <div className="p-4 space-y-2">
                    <div className="bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors duration-200 flex justify-between p-2">
                        <span className="font-medium text-neutral-600">Mode</span>

                        <div className="flex flex-row gap-3">
                            <button className="border border-neutral-300 rounded-lg px-2 py-0.5 text-base bg-blue-200">Auto</button>
                            <button className="border border-neutral-300 rounded-lg px-2 py-0.5 text-base">Manual</button>
                        </div>
                    </div>

                    <div className="bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors duration-200 flex justify-between items-center p-2">
                        <span className="font-medium text-neutral-600">Method option</span>

                        <Select placeholder="Select method option" />
                    </div>

                    <div className="bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors duration-200 p-2">
                        <div className="flex flex-row items-center justify-between mb-3">
                            <span className="font-medium text-neutral-600">Sequence Blocks</span>

                            <div className="flex flex-row gap-3">
                                <button className="border border-neutral-300 rounded-lg px-2 py-0.5 text-base bg-blue-200">1 Block</button>
                                <button className="border border-neutral-300 rounded-lg px-2 py-0.5 text-base bg-amber-200">Select</button>
                            </div>
                        </div>

                        <p>fU fC A mA A T G A C y U fC A mA A T G A C y U fC A mA A T G A C y OM1</p>
                    </div>
                </div>
            </div>
        </>
    );
}
