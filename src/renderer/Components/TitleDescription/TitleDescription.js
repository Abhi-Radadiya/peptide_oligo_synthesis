import React from "react";

export default function TitleDescription(props) {
    const { title, disabled, description, className, maxWidth } = props;

    return (
        <div className={`w-full md:max-w-full ${className} ${maxWidth ?? "max-w-[636px] lg:max-w-[462px]"}`}>
            <h1 className={`font-medium text-lg text-neutral-900 leading-7 w-full ${disabled && "text-neutral-300"}`}>{title}</h1>
            <span className={`font-normal text-base text-neutral-900 leading-6 italic ${disabled ? "text-neutral-300" : "text-neutral-500"}`}>{description}</span>
        </div>
    );
}
