import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteSynthesisProcedure, loadProcedure, selectSavedProcedures } from "../../../../../redux/reducers/synthesis-procedure"
import { useSerialEngine } from "../../../../../utils/context/serial-engine-context"
import { Input } from "../../../../Components/Input/Input"

export const FlowListTable = () => {
    const savedFlows = useSelector(selectSavedProcedures)

    const dispatch = useDispatch()

    const [ports, setPorts] = useState([])

    const [selectedPort, setSelectedPort] = useState(null)

    const [responseFromSerial, setResponseFromSerial] = useState([])

    const [interval, setInterval] = useState(0)

    const engine = useSerialEngine()

    const getAndSetPorts = async () => {
        try {
            const ports = await engine.refreshPorts()

            setPorts(ports)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAndSetPorts()
    }, [])

    useEffect(() => {
        engine.setUniversalDelayTime(interval)
    }, [interval])

    const handleSelectPort = async (port) => {
        try {
            await engine.openPort(port)
            setSelectedPort(port)
        } catch (err) {
            console.error("Failed to open port:", err)
        }
    }

    const appendLog = (entry) => {
        setResponseFromSerial((prev) => [...prev, entry])
    }

    const generateCommands = (flowCommand) => {
        const maxChildLength = Math.max(...flowCommand.map((el) => el.length))

        const commands = {}

        for (let i = 0; i < maxChildLength; i++) {
            const threadName = `thread${i + 1}`

            commands[threadName] = flowCommand.map((subArray) => (subArray[i] !== undefined ? subArray[i] : null))
        }

        return commands
    }

    const handleRun = async (flow) => {
        engine.setLogger(appendLog)

        const commands = generateCommands(flow.commands)

        try {
            await engine.run({ loop: false, commands })
        } catch (err) {
            appendLog({ type: "error", content: err.toString() })
        }
    }

    const handleDelete = (flowId) => {
        if (window.confirm(`Are you sure you want to delete flow ${flowId}?`)) {
            dispatch(deleteSynthesisProcedure(flowId))
        }
    }

    const handleLoad = (flowId) => {
        dispatch(loadProcedure(flowId))
    }

    // const logsByThread = responseFromSerial.reduce((acc, log) => {
    //     if (!acc[log.thread]) {
    //         acc[log.thread] = []
    //     }
    //     acc[log.thread].push(log)
    //     return acc
    // }, {})

    // // Calculate relative time for each log within its thread
    // Object.keys(logsByThread).forEach((thread) => {
    //     logsByThread[thread].forEach((log, index) => {
    //         if (index > 0) {
    //             log.relativeTime = log.time - logsByThread[thread][index - 1].time
    //         } else {
    //             log.relativeTime = 0
    //         }
    //     })
    // })

    return (
        <div className="p-4 border-t border-gray-300 bg-gray-50">
            <div className="flex flex-row items-center gap-6">
                <div className="flex items-center space-x-4 mb-4">
                    <select
                        onChange={(e) => handleSelectPort(e.target.value)}
                        value={selectedPort ?? ""}
                        className="border border-neutral-300 px-3 py-2 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" disabled>
                            Select Port
                        </option>
                        {ports.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>

                <Input value={interval} onChange={setInterval} />
            </div>

            <div className="mt-4 bg-gray-100 p-3 relative pt-10">
                <button className="absolute top-2 right-2 hover:border-b border-neutral-800 pb-1" onClick={() => setResponseFromSerial([])}>
                    Clear
                </button>

                <ul className="text-sm">
                    {responseFromSerial.map((log, index) => {
                        return (
                            <li
                                key={index}
                                className={`mb-1 ${
                                    log.type === "error" ? "text-red-500" : "text-black"
                                } gap-4 w-full justify-between flex odd:bg-gray-200 hover:bg-green-300 px-2 py-1 rounded-lg`}
                            >
                                <span>
                                    <strong>{log?.type?.toUpperCase()}</strong>
                                    {log}
                                </span>
                                {/* <strong>Delay Time : {log?.time - responseFromSerial?.[index - 1]?.time} </strong> */}
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* {Object.keys(logsByThread).map((thread) => (
                <div key={thread} className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Thread {thread}</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Type</th>
                                <th className="py-2 px-4 border-b text-left">Content</th>
                                <th className="py-2 px-4 border-b text-left">Absolute Time (ms)</th>
                                <th className="py-2 px-4 border-b text-left">Relative Time (ms)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logsByThread[thread].map((log, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-green-300`}>
                                    <td className={`py-2 px-4 border-b ${log.type === "error" ? "text-red-500" : "text-black"}`}>
                                        <strong>{log?.type?.toUpperCase()}</strong>
                                    </td>
                                    <td className="py-2 px-4 border-b">{log?.content}</td>
                                    <td className="py-2 px-4 border-b">{log?.time - responseFromSerial[0]?.time}</td>
                                    <td className="py-2 px-4 border-b">{log?.relativeTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))} */}

            <h2 className="text-lg font-semibold mb-3 text-gray-700">Saved Synthesis Procedures</h2>
            {savedFlows?.length === 0 ? (
                <p className="text-sm text-gray-500">No saved procedures yet.</p>
            ) : (
                <table className="w-full text-sm text-left text-gray-600 table-auto shadow">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Nodes</th>
                            <th className="px-4 py-2">Edges</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedFlows?.map((flow) => (
                            <tr key={flow.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{flow.name || `Procedure ${flow.id.slice(0, 6)}`}</td>
                                <td className="px-4 py-2">{flow.nodes?.length || 0}</td>
                                <td className="px-4 py-2">{flow.edges?.length || 0}</td>
                                <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                    <button
                                        onClick={() => handleLoad(flow.id)}
                                        className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                                    >
                                        Load
                                    </button>
                                    <button
                                        onClick={() => handleDelete(flow.id)}
                                        className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                    <button onClick={() => handleRun(flow)} className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition">
                                        ▶ Run
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
