import { Check, FolderCheck, Pencil, X } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { SelectionController } from "../../../../Components/Dropdown/Dropdown"
import { useDispatch, useSelector } from "react-redux"
import { updateOtherValve } from "../../../../../redux/reducers/settings/hardwareSetup"
import { isEmpty } from "lodash"

export default function SingleSensingValveBlock(props) {
    const { valveName, valveMenuItem, valveType } = props

    const valveSelection = useSelector((state) => state.hardwareSetup.otherValve[valveType])

    const [isModify, setIsModify] = useState(false)

    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            bottleName: "",
            selectedContainer: "",
            selectedValve: ""
        }
    })

    const dispatch = useDispatch()

    const assignValve = (data) => {
        dispatch(updateOtherValve({ valveType, assignedValve: { valve: data[valveType].value } }))

        !!isModify && setIsModify(false)
    }

    return (
        <>
            <div className="flex-1 min-w-0 flex items-center border bg-neutral-100 border-neutral-300 rounded-lg justify-between p-3 text-neutral-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span className="font-normal text-sm">
                    Name : <strong className="">{valveName}</strong>
                </span>

                <strong className="mx-4">|</strong>

                <span className="font-normal text-sm flex-shrink-0 mr-2">Valve :</span>

                {isModify ? (
                    <>
                        {/* TODO : Check any valve is assign twice */}
                        <SelectionController width={250} height={40} placeholder="Select Valve Type" menuItem={valveMenuItem} name={valveType} control={control} />

                        <button
                            onClick={handleSubmit(assignValve)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-green-300"
                        >
                            <Check className="h-5 w-5 text-green-500" />
                        </button>
                        <button
                            onClick={() => setIsModify(false)}
                            className="ml-2 text-black opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-red-300"
                        >
                            <X className="h-5 w-5 text-red-500" />
                        </button>
                    </>
                ) : (
                    <>
                        {isEmpty(valveSelection) ? (
                            <>
                                <SelectionController width={300} height={40} placeholder="Select Valve Type" menuItem={valveMenuItem} name={valveType} control={control} />
                                <button
                                    onClick={handleSubmit(assignValve)}
                                    disabled={!watch(valveType)}
                                    className="ml-2 opacity-80 disabled:focus:ring-0 disabled:opacity-35 disabled:border-neutral-300 disabled:bg-neutral-300 hover:opacity-100 flex-shrink-0 border-2 p-2 rounded-lg border-amber-400 focus:ring ring-blue-300"
                                >
                                    <FolderCheck className={`h-5 w-5 ${watch(valveType) ? "text-amber-400" : "text-neutral-800"}`} />
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>{valveSelection?.valve?.index}</strong>

                                <div className="grow"></div>

                                <button
                                    onClick={() => setIsModify(true)}
                                    className="ml-2 opacity-80 hover:opacity-100 flex-shrink-0 border p-2 rounded-lg border-neutral-500 focus:ring ring-blue-300"
                                >
                                    <Pencil className="h-5 w-5 text-blue-700" />
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
