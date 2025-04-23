import { PlusIcon, Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { UseActiveFileDetails } from "../context/active-file-details-context"
import { useEffect, useState } from "react"
import { addCommand, deleteCommand } from "../../../../redux/reducers/commands/commands"
import { getUniqueId } from "../../../Helpers/Constant"
import ConfirmationPopup from "../../../Components/Popup/ConfirmationPopup"
import { openToast } from "../../../../redux/reducers/toastStateReducer/toastStateReducer"
import { SUCCESS } from "../../../Helpers/Icons"

export default function FileSidebar() {
    const commandFileList = useSelector((state) => state.commands.commands)

    const [deleteConfirmationId, setDeleteConfirmationId] = useState(null)

    const { fileDetails, setFileDetails } = UseActiveFileDetails()

    const dispatch = useDispatch()

    const onNew = () => {
        const uniqueId = getUniqueId()

        const newCommandDetails = { commands: [], name: "File Name", id: uniqueId }

        dispatch(addCommand(newCommandDetails))

        setFileDetails(newCommandDetails)
    }

    useEffect(() => {
        setFileDetails(commandFileList[0])
    }, [])

    const handleDeleteFile = () => {
        dispatch(deleteCommand([deleteConfirmationId]))
        dispatch(openToast({ text: "File deleted successfully.", icon: SUCCESS }))
        setDeleteConfirmationId(null)
    }

    return (
        <>
            <div className="w-64 border-r p-4 bg-gray-100">
                <div className="flex justify-between mb-2 items-center">
                    <h2 className="text-lg font-semibold">Files</h2>
                    <PlusIcon size={24} onClick={onNew} className="cursor-pointer m-2" />
                </div>

                {!!commandFileList.length ? (
                    <ul>
                        {commandFileList.map((file) => {
                            const isActive = file.id === fileDetails.id
                            return (
                                <li
                                    key={file.id}
                                    className={`flex justify-between group items-center cursor-pointer p-2 rounded ${isActive ? "bg-blue-100" : ""}`}
                                    onClick={() => setFileDetails(file)}
                                >
                                    <span className="w-[170px] truncate">{isActive ? fileDetails.name : file.name}</span>

                                    <span className="group-hover:block hidden">
                                        <Trash2 size={18} className="text-red-400" onClick={() => setDeleteConfirmationId(file.id)} />
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <div className="text-center flex flex-col justify-center h-full my-auto">
                        <div className="flex-1" />
                        <span className="text-sm font-medium text-neutral-500 italic">No Files Yet!</span>
                        <div className="flex-1" />
                    </div>
                )}
            </div>

            <ConfirmationPopup
                isOpen={!!deleteConfirmationId}
                closePopup={() => setDeleteConfirmationId(null)}
                handleConfirm={handleDeleteFile}
                desc="Are you sure to proceed? This action will delete command file."
                header="Delete"
            />
        </>
    )
}
