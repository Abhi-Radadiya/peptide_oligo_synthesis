import React from "react";
import { Button } from "../../../Components/Buttons/Buttons";
import { ReactComponent as ExportIcon } from "../../../Assets/export.svg";
import { ReactComponent as ImportIcon } from "../../../Assets/cross-arrow.svg";
import { store } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { openToast } from "../../../../redux/reducers/toastStateReducer/toastStateReducer";
import { SUCCESS, ERROR } from "../../../Helpers/Icons";

export default function ApplicationData() {
    const exportStore = () => {
        const state = store.getState();

        const serializedState = JSON.stringify(state);

        const blob = new Blob([serializedState], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `redux-store-backup-${new Date().toISOString()}.json`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const success = await importStoreData(file);

            if (success) {
                dispatch(openToast({ text: "Data imported successfully.", icon: SUCCESS }));
            } else {
                dispatch(openToast({ text: "Error importing data!", icon: ERROR }));
            }
        }
    };

    const dispatch = useDispatch();

    const importStoreData = async (file) => {
        try {
            const text = await file.text();
            const state = JSON.parse(text);

            dispatch({ type: "IMPORT_STATE", payload: state });

            return true;
        } catch (error) {
            console.error("Error importing store data:", error);
            return false;
        }
    };

    return (
        <>
            <div className="flex flex-row gap-4">
                <input type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} id="import-input" />

                {/* <label htmlFor="import-input">
                    <Button
                        onClick={() => document.getElementById("import-input").click()}
                        className="duration-[0.3s] shadow-[6px_6px_12px_#c5c5c5] border-[#e8e8e8] hover:border hover:border-solid hover:border-[white] active:shadow-[4px_4px_12px_#c5c5c5,-4px_-4px_12px_#ffffff] w-fit"
                        label="Import"
                        leftIcon={<ImportIcon className="rotate-90 h-6 w-6 stroke-neutral-900" />}
                        bgClassName="bg-amber-100 hover:bg-amber-200"
                    />
                </label> */}

                <Button
                    onClick={exportStore}
                    leftIcon={<ExportIcon />}
                    label="Export"
                    bgClassName="bg-amber-100 hover:bg-amber-200"
                    className="duration-[0.3s] shadow-[6px_6px_12px_#c5c5c5] border-[#e8e8e8] hover:border hover:border-solid hover:border-[white] active:shadow-[4px_4px_12px_#c5c5c5,-4px_-4px_12px_#ffffff] w-fit"
                />
            </div>
        </>
    );
}
