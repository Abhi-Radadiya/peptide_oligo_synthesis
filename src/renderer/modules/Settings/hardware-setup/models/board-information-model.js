import React from "react";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";

export default function BoardInformationModel(props) {
    const { onClose } = props;

    return (
        <ModelWrapper header="Board Details" width="w-[600px]" onClose={onClose}>
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Valve Board</h2>
            <div className="border-b border-neutral-500 pb-4 mb-4">
                <ul className="list-disc space-y-2 ml-6">
                    <li className="text-gray-700">
                        This board controls <strong>16 valves</strong>.
                    </li>
                    <li className="text-gray-700">Each valve can be individually controlled for precise fluid management.</li>
                </ul>
            </div>

            <h2 className="text-lg font-semibold text-gray-600 mb-4">Analog Board</h2>

            <div>
                <ul className="list-disc space-y-2 ml-6">
                    <li className="text-gray-700">
                        This board includes <strong>1 pump</strong> and <strong>8 liquid sensors</strong>.
                    </li>
                    <li className="text-gray-700">The pump ensures consistent flow, while the sensors monitor liquid levels.</li>
                </ul>
            </div>
        </ModelWrapper>
    );
}
