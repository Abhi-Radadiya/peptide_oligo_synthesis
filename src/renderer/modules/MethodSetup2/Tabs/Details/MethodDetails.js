import React from "react";
import InputField from "../../../../Components/Input/Input";

export default function MethodDetails() {
    return (
        <>
            <InputField
                wrapperClassName="max-w-64"
                name="method_name"
                rules={{ required: "Please enter method name" }}
                label="Method Name"
                labelClassName="text-lg text-neutral-500 font-bold"
                placeholder="Enter Method Name"
            />
        </>
    );
}
