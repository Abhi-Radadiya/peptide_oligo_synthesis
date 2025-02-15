import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import "tailwindcss/tailwind.css";
import { Button } from "../../Components/Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { addCommand, editCommand } from "../../../redux/reducers/commands/commands";
import { Info, Save, SquareX } from "lucide-react";
import CommandModel from "./Models/CommandModel";
import InputField from "../../Components/Input/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CommandEditor = (props) => {
    const { id } = props;

    const commandList = useSelector((state) => state.commands.commands);

    const editorRef = useRef(null);

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [showCommandModel, setShowCommandModel] = useState(false);

    const { handleSubmit, control, reset, setValue, watch } = useForm();

    useEffect(() => {
        if (id) {
            setValue("fileName", commandList?.find((command) => command.id === id)?.fileName);
        }
    }, [id]);

    // Define the validation rules
    const validation = {
        words: ["START", "PUMP", "OPEN", "VALVE", "WAIT", "LOOP", "CLOSE", "BOTTLE"],
        commands: [
            "START PUMP _(number)",
            "OPEN VALVE _(string must be inside amediteList array) _(number)",
            "WAIT _(number)MS",
            "LOOP _(number)",
            "CLOSE PUMP _(number)",
            "CLOSE VALVE _(string must be inside amediteList array) _(number)",
        ],
        amediteList: ["AMEDITE1", "AMEDITE2", "AMEDITE3"], // Example list for validation
    };

    // Function to validate commands
    const validateCommands = (commands) => {
        const errors = [];

        const regexPatterns = validation.commands.map((command) => {
            // Replace placeholders with regex patterns
            let pattern = command.replace(/_\(number\)/g, "(\\d+)");
            pattern = pattern.replace(/_\(string must be inside amediteList array\)/g, "(" + validation.amediteList.join("|") + ")");
            pattern = pattern.replace(/_\(.*?\)/g, "(\\w+)"); // Default to word characters for unspecified placeholders
            return { pattern: new RegExp(`^${pattern}$`), original: command };
        });

        commands.forEach((command, index) => {
            const words = command.trim().split(/\s+/);
            const isValid = regexPatterns.some((regex) => regex.pattern.test(command.trim()));

            if (!isValid) {
                errors.push({ line: index + 1, message: "Invalid command format" });
            }

            words.forEach((word, wordIndex) => {
                if (!validation.words.includes(word.toUpperCase()) && !/\d+/.test(word)) {
                    errors.push({ line: index + 1, column: wordIndex + 1, message: `Invalid word: ${word}` });
                }
            });
        });

        return errors;
    };

    // Handle editor change
    const handleEditorChange = (value) => {
        const commands = value.split("\n");
        const newErrors = validateCommands(commands);
        setErrors(newErrors);
    };

    // Handle editor mount
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = { editor, monaco };

        monaco.editor.defineTheme("myCustomTheme", {
            base: "vs-dark", // Inherit from the dark theme
            inherit: true, // Inherit other settings from the base theme
            rules: [], // You can define custom syntax highlighting rules here
            colors: {
                "editor.background": "#f5f3e6", // Change the background color
                "editor.foreground": "#000000", // Change the text color
                "editorCursor.foreground": "#000000", // Change the cursor color
                "editor.selectionBackground": "#d1cdcd", // Change the selection background color
                "editor.lineHighlightBorder": "#c4c4c4", // Change the line highlight color
            },
        });

        // Apply the custom theme
        monaco.editor.setTheme("myCustomTheme");

        setEditCommand();
    };

    const setEditCommand = () => {
        if (!id) return;

        const selectedCommand = commandList?.find((command) => command.id === id);

        // set commands with line breaks
        editorRef.current.editor.setValue(selectedCommand.text.join("\n"));
    };

    // Highlight errors in the editor
    useEffect(() => {
        if (editorRef.current) {
            const { editor, monaco } = editorRef.current;
            const model = editor.getModel();
            const markers = errors.map((error) => ({
                severity: monaco.MarkerSeverity.Error,
                startLineNumber: error.line,
                startColumn: error.column || 1,
                endLineNumber: error.line,
                endColumn: error.column || 1,
                message: error.message,
            }));
            monaco.editor.setModelMarkers(model, "owner", markers);
        }
    }, [errors]);

    const handleSave = (data) => {
        const commands = editorRef.current.editor
            .getValue()
            .split("\n")
            .map((command) => command.replace("\r", ""));

        if (id) {
            dispatch(editCommand({ id, newCommand: { text: commands, fileName: data.fileName, id } }));
            navigate("/sequence-command");
            return;
        }

        dispatch(addCommand({ text: commands, fileName: data.fileName }));
        navigate("/sequence-command");

        handleReset();
    };

    const handleReset = () => {
        editorRef.current.editor.setValue("");
        setErrors([]);
        reset();
    };

    // Determine if save button should be disabled
    const isSaveDisabled = (errors.length > 0 || !editorRef.current?.editor?.getValue().trim()) && !watch("fileName");

    return (
        <>
            <div className="p-4">
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className="flex flex-row justify-between mb-4 items-start">
                        <InputField placeholder="Enter file name" control={control} name="fileName" rules={{ required: "Please enter file name to save" }} />

                        <div className="space-x-2 flex flex-row">
                            <Button leftIcon={<Info />} label="Commands" onClick={() => setShowCommandModel(true)} />
                            <Button type="submit" leftIcon={<Save />} label="Save" disabled={isSaveDisabled} bgClassName="bg-green-300" />
                            <Button leftIcon={<SquareX />} label="Reset" onClick={handleReset} bgClassName="bg-amber-300" />
                        </div>
                    </div>
                </form>

                <Editor height="55vh" defaultLanguage="plaintext" defaultValue={""} onChange={handleEditorChange} onMount={handleEditorDidMount} />

                {errors.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-red-500">Errors:</h3>
                        <ul className="list-disc list-inside text-red-500">
                            {errors.map((error, index) => (
                                <li key={index}>
                                    Line {error.line}, Column {error.column || "1"}: {error.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {showCommandModel && <CommandModel onClose={() => setShowCommandModel(false)} command={validation.commands} />}
        </>
    );
};

export default CommandEditor;
