import { useMemo, useState } from "react"
import { SelectionController } from "../../../../Components/Dropdown/Dropdown"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"
import { selectSavedProcedures } from "../../../../../redux/reducers/synthesis-procedure"
import { Pause, Play, RotateCcw, Square } from "lucide-react"

export default function PrimingProcedure(props) {
    const { section } = props

    const { control, watch, reset } = useFormContext()

    const availableProcedure = useSelector(selectSavedProcedures)

    const procedureMenuItem = useMemo(() => availableProcedure.map((el) => ({ label: el.name, value: el.id })), [availableProcedure])

    const [primingStatus, setPrimingStatus] = useState("idle")

    const buttonClasses = {
        base: "flex items-center justify-center py-2 px-3 rounded-md transition-all duration-200",
        run: "bg-green-300 hover:bg-green-400 text-black",
        pause: "bg-amber-300 hover:bg-amber-400 text-black",
        stop: "bg-red-400 hover:bg-red-500 text-black",
        resume: "bg-blue-300 hover:bg-blue-400 text-black",
        reset: "bg-neutral-500 hover:bg-neutral-600 text-white"
    }

    const handlePause = () => {
        setPrimingStatus("paused")
    }

    const handleRun = () => {
        setPrimingStatus("running")
    }

    const handleResume = () => {
        setPrimingStatus("running")
    }

    const handleStop = () => {
        setPrimingStatus("idle")
    }

    const handleReset = () => {
        handleStop()
        reset()
    }

    return (
        <>
            <div className="flex flex-row items-center gap-4">
                <div className="w-[350px]">
                    <SelectionController control={control} name="primingProcedureName" menuItem={procedureMenuItem} placeholder="Select procedure for priming" />
                </div>

                {primingStatus === "idle" && (
                    <button
                        disabled={!(watch("primingProcedureName") && watch(section)?.some((el) => Boolean(el.check)))}
                        onClick={handleRun}
                        className={`${buttonClasses.base} ${buttonClasses.run} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <Play className="mr-2" size={20} /> Run
                    </button>
                )}
                {primingStatus === "running" && (
                    <button onClick={handlePause} className={`${buttonClasses.base} ${buttonClasses.pause}`}>
                        <Pause className="mr-2" /> Pause
                    </button>
                )}
                {primingStatus === "paused" && (
                    <button onClick={handleResume} className={`${buttonClasses.base} ${buttonClasses.resume}`}>
                        <Play className="mr-2" /> Resume
                    </button>
                )}
                {primingStatus !== "idle" && (
                    <button onClick={handleStop} className={`${buttonClasses.base} ${buttonClasses.stop}`}>
                        <Square className="mr-2" /> Stop
                    </button>
                )}
                <button onClick={handleReset} className={`${buttonClasses.base} ${buttonClasses.reset}`}>
                    <RotateCcw className="mr-2" /> Reset
                </button>

                {/* {!isStartPriming ? (
                    <Button label="Start Priming" bgClassName="bg-green-300" onClick={handleStartPriming} />
                ) : (
                    <>
                        <Button label="Pause" bgClassName="bg-amber-300" onClick={handleStartPriming} />
                        <Button label="Stop" bgClassName="bg-red-400" onClick={handleStartPriming} />
                    </>
                )} */}
            </div>
        </>
    )
}
