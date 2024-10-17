const { app, BrowserWindow, ipcMain, screen, dialog } = require("electron");

const fs = require("fs");

const path = require("path");
const { SerialPort } = require("serialport");
const {
    initializeDB,
    saveBottleMappingData,
    getBottleMappingData,
    saveBottleMappingDetails,
    getBottleMappingDetails,
    quitDb,
    updateBottleMappingDetails,
    deleteBottleMappingDetails,
} = require("./db");
const { autoUpdater } = require("electron-updater");

let mainWindow;
let activePort = null;

async function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    let screenDimention = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({
        width: screenDimention.width,
        // height: 100,
        height: screenDimention.height,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadURL("https://peptide-oligo-synthesis.vercel.app/");

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    mainWindow.once("ready-to-show", () => {
        autoUpdater.checkForUpdatesAndNotify(); // Check for updates
    });
}

autoUpdater.on("update-available", () => {
    console.log("Update available!");
    mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
    console.log("Update downloaded; will install now");
    mainWindow.webContents.send("update_downloaded");
    autoUpdater.quitAndInstall();
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.handle("list-ports", async () => {
    try {
        const ports = await SerialPort.list();
        return ports;
    } catch (error) {
        console.error("Error listing ports:", error);
        throw error;
    }
});

ipcMain.handle("get-port-info", async () => {
    try {
        const ports = await SerialPort.list();
        const selectedPort = activePort ? activePort.path : null;
        return { ports, selectedPort };
    } catch (error) {
        console.error("Error fetching port info:", error);
        throw error;
    }
});

ipcMain.handle("open-port", async (event, portPath) => {
    if (!portPath) {
        throw new Error("No port path provided");
    }

    if (activePort) {
        if (activePort.path === portPath) {
            return "Port already opened";
        }
        activePort.close((err) => {
            if (err) console.error("Error closing previous port:", err);
        });
        activePort = null;
    }

    activePort = new SerialPort({
        path: portPath,
        baudRate: 9600,
    });

    activePort.on("data", (data) => {
        console.log("Data received:", data.toString());
        mainWindow.webContents.send("serial-data", data.toString());
    });

    activePort.on("close", () => {
        console.log("Port closed", activePort);
        mainWindow.webContents.send("port-disconnected");
        activePort = null;
    });

    activePort.on("error", (err) => {
        console.error("Serial port error:", err);
    });

    return "Port opened successfully";
});

ipcMain.handle("send-data", async (event, data) => {
    if (!activePort) {
        throw new Error("Port is not opened");
    }

    return new Promise((resolve, reject) => {
        activePort.write(`${data}\n`, (err) => {
            if (err) {
                console.error("Error sending data:", err);
                return reject(err);
            }
            console.log("Data sent:", data);
            resolve("Data sent successfully");
        });
    });
});

// <------------- Save SQL

app.on("before-quit", () => {
    quitDb();
});

app.on("ready", () => {
    dialog.showMessageBox({
        type: "info",
        message: "Ready and web can load here !!...",
    });

    initializeDB();
    createWindow();
});

// bottle-mapping-positions --------------->
ipcMain.handle("save-bottle-mapping-positions", async (_, data, mappingOption) => {
    try {
        await saveBottleMappingData(data, mappingOption);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle("get-bottle-mapping-positions", async (_, mappingOption) => {
    try {
        const data = await getBottleMappingData(mappingOption);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// bottle-mapping-details ------------------------>

ipcMain.handle("save-bottle-mapping-details", async (_, amediteDetails, mappingOption) => {
    console.log(`amediteDetails : `, amediteDetails);
    try {
        await saveBottleMappingDetails(amediteDetails, mappingOption);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle("get-bottle-mapping-details", async (_, mappingOption) => {
    try {
        const data = await getBottleMappingDetails(mappingOption);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle("update-bottle-mapping-details", async (_, amediteDetails, mappingOption) => {
    try {
        const data = await updateBottleMappingDetails(amediteDetails, mappingOption);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle("delete-bottle-mapping-details", async (_, id, mappingOption) => {
    try {
        const data = await deleteBottleMappingDetails(id, mappingOption);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
});
