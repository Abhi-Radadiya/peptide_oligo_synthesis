import React from "react";
import { FlaskRound, LayoutGrid, Columns, AlignStartHorizontal, RadioTower, RotateCcw, ArrowRight } from "lucide-react";

const OptionCard = ({ icon: Icon, title, children }) => (
    <div className="border border-neutral-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-2 mb-3">
            <Icon className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">{title}</h3>
        </div>
        {children}
    </div>
);

export default function SynthesisSetup() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 overflow-auto scrollbar-style h-[calc(100vh-130px)]">
            {/* Header Section */}
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <FlaskRound className="w-6 h-6 text-blue-600" />
                    <h1 className="text-2xl font-bold">Synthesis Setup</h1>
                </div>
                <p className="text-neutral-600">Configure your synthesis parameters and options before starting the process.</p>
            </section>

            {/* Configuration Options */}
            <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-semibold mb-6">Configuration Options</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Column Settings */}
                    <OptionCard icon={LayoutGrid} title="Column Position">
                        <div className="bg-neutral-50 p-3 rounded">
                            <p className="text-neutral-600">Select from positions 1-6</p>
                            <div className="mt-2 text-sm bg-white p-2 rounded border border-neutral-200">Available via dropdown selection</div>
                        </div>
                    </OptionCard>

                    {/* Column Type */}
                    <OptionCard icon={Columns} title="Column Type">
                        <div className="bg-neutral-50 p-3 rounded">
                            <p className="text-neutral-600">Choose from columns defined in Column Editor</p>
                            <div className="mt-2 text-sm bg-white p-2 rounded border border-neutral-200">Configured in Settings → Column Editor</div>
                        </div>
                    </OptionCard>

                    {/* Sequence Selection */}
                    <OptionCard icon={AlignStartHorizontal} title="Sequence">
                        <div className="bg-neutral-50 p-3 rounded">
                            <p className="text-neutral-600">Select your predefined sequence</p>
                            <div className="mt-2 text-sm bg-white p-2 rounded border border-neutral-200">Choose from available sequences</div>
                        </div>
                    </OptionCard>

                    {/* Direction Option */}
                    <OptionCard icon={RadioTower} title="Synthesis Direction">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded">
                                <div className="flex-1">
                                    <p className="font-medium">3" Option</p>
                                    <p className="text-sm text-neutral-600">Reverses sequence for synthesis</p>
                                </div>
                                <span className="text-blue-600 text-sm">Default</span>
                            </div>
                            <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded">
                                <div className="flex-1">
                                    <p className="font-medium">5" Option</p>
                                    <p className="text-sm text-neutral-600">Maintains original sequence</p>
                                </div>
                            </div>
                        </div>
                    </OptionCard>
                </div>

                {/* Resin Selection */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Resin Type Selection</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-blue-900">Standard Resin</h4>
                                <span className="text-sm text-blue-600">Default</span>
                            </div>
                            <p className="text-blue-800">
                                Starts synthesis from <strong>second</strong> block
                            </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-medium text-purple-900 mb-2">Universal Resin</h4>
                            <p className="text-purple-800">
                                Starts synthesis from <strong>first</strong> block
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-neutral-600">
                            <RotateCcw className="w-4 h-4" />
                            <span>Reset returns all options to defaults</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                            <ArrowRight className="w-4 h-4" />
                            <span>Proceed to sequence execution</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
