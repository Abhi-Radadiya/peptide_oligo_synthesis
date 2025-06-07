import { useState, useEffect } from "react"
import axios from "axios"
import ApexCharts from "react-apexcharts"

const LogViewer = () => {
    const [logFiles, setLogFiles] = useState([])
    const [selectedLog, setSelectedLog] = useState(null)
    const [logContent, setLogContent] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        // Fetch log files from the directory
        const fetchLogFiles = async () => {
            try {
                const response = await axios.get("/api/logs") // Replace with your actual API endpoint
                setLogFiles(response.data)
            } catch (error) {
                console.error("Error fetching log files:", error)
            }
        }

        fetchLogFiles()
    }, [])

    const handleLogClick = async (logFile) => {
        try {
            const response = await axios.get(`/api/logs/${logFile.name}`) // Replace with your actual API endpoint
            const content = response.data.split("\n").filter((line) => line.trim() !== "")
            setLogContent(content)
            setSelectedLog(logFile)
            setIsModalOpen(true)

            // Parse data for chart
            prepareChartData(content)
        } catch (error) {
            console.error("Error fetching log content:", error)
        }
    }

    const prepareChartData = (content) => {
        // Extract command execution times
        const commandData = content
            .filter((line) => line.includes("Command completed in"))
            .map((line) => {
                const match = line.match(/\[thread(\d+)\].*Command completed in (\d+\.?\d*)(ms|s)/)
                if (!match) return null

                const thread = match[1]
                let time = parseFloat(match[2])
                const unit = match[3]

                // Convert to milliseconds if in seconds
                if (unit === "s") time *= 1000

                return { thread, time }
            })
            .filter(Boolean)

        // Group by thread
        const thread1Data = commandData.filter((item) => item.thread === "1").map((item) => item.time)
        const thread2Data = commandData.filter((item) => item.thread === "2").map((item) => item.time)

        setChartData({
            options: {
                chart: {
                    type: "line",
                    height: 350,
                    toolbar: { show: false }
                },
                colors: ["#008FFB", "#00E396"],
                stroke: { curve: "smooth", width: 2 },
                markers: { size: 5 },
                xaxis: {
                    categories: Array.from({ length: Math.max(thread1Data.length, thread2Data.length) }, (_, i) => i + 1),
                    title: { text: "Command Sequence" }
                },
                yaxis: {
                    title: { text: "Execution Time (ms)" },
                    min: 0
                },
                legend: { position: "top" },
                tooltip: {
                    y: { formatter: (value) => `${value.toFixed(2)} ms` }
                }
            },
            series: [
                { name: "Thread 1", data: thread1Data },
                { name: "Thread 2", data: thread2Data }
            ]
        })
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Application Logs</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {logFiles.map((file) => (
                            <tr key={file.name} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleLogClick(file)}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{file.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{file.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.modified}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Log Details Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Log Details: {selectedLog?.name}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-6">
                            {/* Chart Section */}
                            {chartData && (
                                <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Command Execution Times</h3>
                                    <ApexCharts options={chartData.options} series={chartData.series} type="line" height={350} />
                                </div>
                            )}

                            {/* Log Content Section */}
                            <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                                <pre className="text-gray-300 text-sm font-mono">
                                    {logContent.map((line, index) => {
                                        let colorClass = "text-gray-400"
                                        if (line.includes("[ERROR]")) colorClass = "text-red-400"
                                        else if (line.includes("[WARNING]")) colorClass = "text-yellow-400"
                                        else if (line.includes("[INFO]")) colorClass = "text-blue-400"

                                        return (
                                            <div key={index} className={`${colorClass} py-1`}>
                                                {line}
                                            </div>
                                        )
                                    })}
                                </pre>
                            </div>
                        </div>

                        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LogViewer
