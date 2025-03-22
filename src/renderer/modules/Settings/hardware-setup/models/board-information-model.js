import React from "react";
import ModelWrapper from "../../../../Components/Model/ModelWrapper";

export default function BoardInformationModel(props) {
    const { onClose } = props;

    return (
        <ModelWrapper header="Board Details" onClose={onClose}>
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Valve Board</h2>
            <div className="border-b border-neutral-500 pb-4 mb-4">
                <p className="text-gray-700 mb-2">
                    This board controls <strong>16 valves</strong>.
                </p>
                <p className="text-gray-700">Each valve can be individually controlled for precise fluid management.</p>
            </div>

            <h2 className="text-lg font-semibold text-gray-600 mb-4">Analog Board</h2>

            <div>
                <p className="text-gray-700 mb-2">
                    This board includes <strong>1 pump</strong> and <strong>8 liquid sensors</strong>.
                </p>
                <p className="text-gray-700">The pump ensures consistent flow, while the sensors monitor liquid levels.</p>
            </div>
        </ModelWrapper>
    );
}
