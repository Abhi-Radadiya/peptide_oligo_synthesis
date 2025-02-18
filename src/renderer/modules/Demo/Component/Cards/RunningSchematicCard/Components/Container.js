import React from "react";
import SingleBottle from "./SingleBottle";

export default function Container(props) {
    const { className, bottleDetails, name, position } = props;

    return (
        <>
            <div className={`${className} w-full mx-auto flex flex-col items-center`}>
                <span className="font-medium justify-center mx-auto flex text-center text-lg">{name}</span>

                <div className={`${position === "left" && "flex flex-row"} ${position === "right" && "flex flex-row-reverse"} relative`}>
                    <div className={`border border-neutral-300 rounded-lg shadow-lg h-96 w-96 p-3 mt-2 grid grid-cols-3 relative`}>
                        {bottleDetails.map((el, index) => {
                            return <SingleBottle key={index} details={el} />;
                        })}
                    </div>

                    {position === "left" && (
                        <div className="flex flex-row items-start z-0 absolute w-52 -right-52 -bottom-[42%]">
                            <div className="w-44 h-5 bg-yellow-800" />
                            <div className="h-64 w-5 bg-yellow-800 -ml-[1px]"></div>
                        </div>
                    )}

                    {position === "right" && (
                        <div className="flex flex-row items-start z-0 absolute w-48 -left-48 -bottom-[42%]">
                            <div className="h-64 w-5 bg-yellow-800 -ml-[1px]"></div>
                            <div className="w-44 h-5 bg-yellow-800" />
                        </div>
                    )}
                    {position === "middle" && <div className="absolute h-64 w-5 -my-[1px] left-[calc(50%-10px)] border -bottom-[65.5%] border-neutral-300 bg-yellow-800" />}
                </div>
            </div>
        </>
    );
}
