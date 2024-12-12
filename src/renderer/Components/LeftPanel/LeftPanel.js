import React from "react";
import { Button } from "../Buttons/Buttons";

export default function LeftPanel(props) {
    const { tabs, setActiveStep, activeStep } = props;

    return (
        <div className="flex flex-col gap-6 max-w-[224px] w-full">
            {tabs.map((el, index) => {
                const isActive = activeStep === index;

                return (
                    <div className="w-[176px]" key={index}>
                        <Button className="w-full justify-center" {...el} bgClassName={isActive && "bg-amber-200"} onClick={() => setActiveStep(index)} isActive={isActive} />
                    </div>
                );
            })}
        </div>
    );
}
