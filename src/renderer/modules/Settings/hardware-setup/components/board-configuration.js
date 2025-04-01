import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { SelectionController } from "../../../../Components/Dropdown/Dropdown"
import { InfoIcon, Trash } from "lucide-react"
import BoardInformationModel from "../models/board-information-model"
import { useDispatch, useSelector } from "react-redux"
import { addBoard, deleteBoard } from "../../../../../redux/reducers/settings/hardwareSetup"
import { getUniqueId } from "../../../../Helpers/Constant"
import ConfirmationPopup from "../../../../Components/Popup/ConfirmationPopup"
import { openToast } from "../../../../../redux/reducers/toastStateReducer/toastStateReducer"
import { SUCCESS } from "../../../../Helpers/Icons"

export default function BoardConfiguration() {
    const [showInfoCard, setShowInfoCard] = useState(false)

    const { control, handleSubmit } = useForm({ defaultValues: { boardType: "" } })

    const { analogBoard, valveBoard } = useSelector((state) => state.hardwareSetup)

    const initialShowConfirmationBoardDelete = { isOpen: false, id: null, type: "" }

    const [showConfirmationBoardDelete, setShowConfirmationBoardDelete] = useState(initialShowConfirmationBoardDelete)

    const dispatch = useDispatch()

    const createAnalogBoard = () => {
        return {
            boardId: getUniqueId(),
            pumpId: getUniqueId(),
            sensors: [...Array(8)].map(() => {
                return { id: getUniqueId() }
            })
        }
    }

    const createValveBoard = () => {
        return {
            boardId: getUniqueId(),
            valve: [...Array(16)].map(() => ({ id: getUniqueId() }))
        }
    }

    const onSubmit = (data) => {
        const boardType = data?.boardType?.value

        if (boardType) {
            dispatch(
                addBoard({
                    boardType,
                    boardData: boardType === "valveBoard" ? createValveBoard() : createAnalogBoard()
                })
            )

            dispatch(openToast({ text: boardType === "valveBoard" ? "Valve board added successfully." : "Analog board added successfully.", icon: SUCCESS }))
        }
    }

    const handleDeleteBoard = () => {
        dispatch(deleteBoard({ boardType: showConfirmationBoardDelete.type, boardId: showConfirmationBoardDelete.id }))

        setShowConfirmationBoardDelete(initialShowConfirmationBoardDelete)
    }

    const boardMenuItem = [
        { label: "Valve Board", value: "valveBoard" },
        { label: "Analog Board", value: "analogBoard" }
    ]

    return (
        <>
            <div className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-3xl border border-amber-400 p-8">
                <div className="flex flex-row items-center gap-2 mb-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-end">
                        <SelectionController
                            width={300}
                            height={40}
                            placeholder="Select Board Type"
                            label="Board Type"
                            menuItem={boardMenuItem}
                            name="boardType"
                            control={control}
                        />

                        <div className="flex flex-row items-center gap-2">
                            <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                                Add Board
                            </button>
                            <InfoIcon className="cursor-pointer" onClick={() => setShowInfoCard(true)} />
                        </div>
                    </form>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">Valve Board</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {valveBoard.map((el, index) => {
                        return (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                                <div className="flex justify-between">
                                    <p className="text-gray-700 mb-2 font-medium text-base">Board : {index + 1}</p>
                                    <Trash
                                        size={18}
                                        className="cursor-pointer"
                                        color="red"
                                        onClick={() => setShowConfirmationBoardDelete({ id: el.boardId, isOpen: true, type: "valveBoard" })}
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    {el?.valve?.map((_, i) => (
                                        <div key={i} className="bg-gray-200 p-2 text-center rounded-lg text-gray-700">
                                            Valve {index * 16 + 1 + i}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">Analog Board</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {analogBoard.map((board, index) => {
                        return (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                                <div className="flex justify-between">
                                    <p className="text-gray-700 mb-2 font-medium text-base">Board : {index + 1}</p>

                                    <Trash
                                        size={18}
                                        className="cursor-pointer"
                                        color="red"
                                        onClick={() => setShowConfirmationBoardDelete({ id: board.boardId, isOpen: true, type: "analogBoard" })}
                                    />
                                </div>

                                <div className="bg-gray-200 p-2 text-center rounded-lg text-gray-700 mb-4">Pump {index + 1}</div>

                                <div className="grid grid-cols-4 gap-2">
                                    {board?.sensors?.map((_, i) => (
                                        <div key={i} className="bg-gray-200 p-2 text-center rounded-lg text-gray-700">
                                            Sensor {index * 8 + 1 + i}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {showInfoCard && <BoardInformationModel onClose={() => setShowInfoCard(false)} />}

            <ConfirmationPopup
                handleConfirm={handleDeleteBoard}
                header="Delete Board"
                desc="Are you sure to processed?"
                isOpen={showConfirmationBoardDelete.isOpen}
                closePopup={() => setShowConfirmationBoardDelete(initialShowConfirmationBoardDelete)}
            />
        </>
    )
}
