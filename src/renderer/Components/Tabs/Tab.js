import React, { useEffect, useState } from "react";

const Button = (props) => {
    const { label, active, disabled, className, onClick } = props;
    return (
        <button
            className={`border font-medium border-neutral-300 rounded-lg px-5 py-1.5 hover:bg-neutral-300 hover:text-black ${
                active ? "bg-neutral-400 text-white" : "bg-neutral-200"
            } ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

const Tabs = (props) => {
    const { tabs, className } = props;

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const onChangeTab = (tabValue) => {
        setActiveTab(tabValue);
        props.setActiveTab(tabValue);
    };

    useEffect(() => {
        setActiveTab(props.activeTab);
    }, []);

    return (
        <>
            <div className={`flex flex-row gap-4 ${className}`}>
                {tabs.map((el, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Button {...el} active={activeTab === el.value} onClick={() => onChangeTab(el.value)} />
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );
};

const Tab = (props) => {
    const { onClick, label, isActive } = props;
    return (
        <>
            <button
                className={`px-3 py-1 font-medium border max-w-[200px] w-full rounded-lg hover:border-blue-700 hover:text-blue-700 ${
                    isActive ? "border-blue-700 text-blue-700 bg-blue-50" : "border-neutral-500 text-neutral-700"
                }`}
                onClick={onClick}
            >
                {label}
            </button>
        </>
    );
};

export { Button, Tabs, Tab };
