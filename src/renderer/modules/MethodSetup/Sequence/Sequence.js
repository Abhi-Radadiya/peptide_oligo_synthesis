import { useWindowSize } from "@uidotdev/usehooks";
import React from "react";
import Footer from "../Component/Footer/Footer";

export default function Sequence(props) {
    const { setActiveStep } = props;

    const { height } = useWindowSize();

    const saveMethods = () => {
        setActiveStep("finalSynthesisStep");
    };

    return (
        <>
            <div className="overflow-auto scrollbar-style pb-4 pr-3.5" style={{ height: height - 105 }}></div>
            <Footer onSave={saveMethods} />
        </>
    );
}
