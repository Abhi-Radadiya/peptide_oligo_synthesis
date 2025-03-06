import React from "react";

export const PipeFlow = (props) => {
    const { className, is_flowing = false } = props;

    return (
        <>
            <div className={`absolute flex items-center justify-center border overflow-hidden ${className}`}>
                {is_flowing && (
                    <div className="w-[200%] h-full absolute animate-flow" style={{ background: "linear-gradient(90deg, transparent, currentColor, transparent)" }}></div>
                )}
            </div>

            <style jsx>{`
                @keyframes flowAnimation {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-flow {
                    animation: flowAnimation 1s linear infinite;
                }
            `}</style>
        </>
    );
};

// import React from "react";

// const PipeFlow = ({ points, color = "#3498db", is_flowing = false }) => {
//     if (!points.start || !points.end) return null;

//     const { start } = points;

//     const pipeStyle = {
//         top: start.top,
//         left: start.left,
//         width: "90px",
//         height: "25px",
//         border: `4px solid ${color}`,
//         background: "transparent",
//         overflow: "hidden",
//     };

//     return (
//         <>
//             <div className="relative">
//                 <div className="absolute flex items-center justify-center overflow-hidden" style={pipeStyle}>
//                     {is_flowing && (
//                         <div className="w-[200%] h-full absolute animate-flow" style={{ background: "linear-gradient(90deg, transparent, currentColor, transparent)" }}></div>
//                     )}
//                 </div>
//             </div>

//             <style jsx>{`
//                 @keyframes flowAnimation {
//                     0% {
//                         transform: translateX(-100%);
//                     }
//                     100% {
//                         transform: translateX(100%);
//                     }
//                 }

//                 .animate-flow {
//                     animation: flowAnimation 1s linear infinite;
//                 }
//             `}</style>
//         </>
//     );
// };

// export default function RunningSchematicCard2() {
//     return (
//         <div className="relative h-screen w-screen">
//             <PipeFlow points={{ start: { top: "90px", left: "120px" }, end: { top: "90px", left: "400px" } }} color="blue" is_flowing={true} />
//         </div>
//     );
// }
