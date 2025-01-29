import React from "react";
import { Button } from "../Buttons/Buttons";

export default function LeftPanel(props) {
    const { tabs, setActiveStep, activeStep, errors } = props;

    // TODO add error handling case for all tabs
    const findError = (tab) => {
        let isError = false;

        if (tab.value === "detail") {
            isError = !!errors.color;
        }

        return isError;
    };

    return (
        <div className="flex flex-col gap-6 max-w-[176px] mr-4 w-full">
            {tabs.map((el, index) => {
                const isActive = activeStep === index;

                const isError = findError(el);

                return (
                    <div className="w-[176px]" key={index}>
                        <Button
                            className="w-full justify-center"
                            {...el}
                            bgClassName={isError ? "bg-red-300" : isActive && "bg-amber-200"}
                            onClick={() => setActiveStep(index)}
                            isActive={isActive}
                        />
                    </div>
                );
            })}
        </div>
    );
}
