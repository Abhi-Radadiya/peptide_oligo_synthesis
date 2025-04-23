import React, { useRef, useState } from "react"
import { Play, Pause, Square, RotateCcw } from "lucide-react"
import SequenceSelection from "../../Model/sequence-selection"

export default function HeaderManualMode() {
    const [status, setStatus] = useState("idle")

    const [showSequenceSelectionModel, setShowSequenceSelectionModel] = useState(false)

    const intervalRef = useRef(null)

    const buttonClasses = {
        base: "flex items-center justify-center py-2 px-3 rounded-md transition-all duration-200",
        run: "bg-green-300 hover:bg-green-400 text-black",
        pause: "bg-amber-300 hover:bg-amber-400 text-black",
        stop: "bg-red-400 hover:bg-red-500 text-black",
        resume: "bg-blue-300 hover:bg-blue-400 text-black",
        reset: "bg-neutral-500 hover:bg-neutral-600 text-white"
    }

    const indexRef = useRef(0)

    const operationsRef = useRef([])

    const formatSequenceOperation = async (sequence) => {
        indexRef.current = 0

        startExecution()
    }

    const startExecution = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            indexRef.current++

            if (indexRef.current >= operationsRef.current.length) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
                setStatus("idle")
            }
        }, 1000)

        setStatus("running")
    }

    const handleRun = () => {
        setShowSequenceSelectionModel(true)
    }

    const handlePause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            setStatus("paused")
        }
    }

    const handleResume = () => {
        if (status === "paused") {
            startExecution()
        }
    }

    const handleStop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        indexRef.current = 0
    }

    const handleReset = () => {
        handleStop()
    }

    return (
        <>
            <div className="bg-gradient-to-r from-neutral-100 to-neutral-200 p-4 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-neutral-800">Control Panel</h2>

                    <div className="flex space-x-2">
                        {status === "idle" && (
                            <button onClick={handleRun} className={`${buttonClasses.base} ${buttonClasses.run} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                <Play className="mr-2" size={20} /> Run
                            </button>
                        )}

                        {status === "running" && (
                            <button onClick={handlePause} className={`${buttonClasses.base} ${buttonClasses.pause}`}>
                                <Pause className="mr-2" /> Pause
                            </button>
                        )}

                        {status === "paused" && (
                            <button onClick={handleResume} className={`${buttonClasses.base} ${buttonClasses.resume}`}>
                                <Play className="mr-2" /> Resume
                            </button>
                        )}

                        {status !== "idle" && (
                            <button onClick={handleStop} className={`${buttonClasses.base} ${buttonClasses.stop}`}>
                                <Square className="mr-2" /> Stop
                            </button>
                        )}

                        <button onClick={handleReset} className={`${buttonClasses.base} ${buttonClasses.reset}`}>
                            <RotateCcw className="mr-2" /> Reset
                        </button>
                    </div>
                </div>
            </div>

            {showSequenceSelectionModel && <SequenceSelection onClose={() => setShowSequenceSelectionModel(false)} />}
        </>
    )
}
