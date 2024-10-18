import React from "react";
import { Tab } from "../Tabs/Tab";

export default function LeftPanel(props) {
    const { tabs, setActiveStep, activeStep } = props;

    return (
        <div className="flex flex-col gap-6 max-w-[224px] w-full">
            {tabs.map((el, index) => {
                return (
                    <React.Fragment key={index}>
                        <Tab label={el.label} onClick={() => setActiveStep(el.value)} isActive={activeStep == el.value} />
                    </React.Fragment>
                );
            })}
        </div>
    );
}
