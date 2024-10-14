const { app, BrowserWindow, screen, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
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

let mainWindow;

async function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    let screenDimention = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({
        // width: 300,
        // height: 300,
        width: screenDimention.width,
        height: screenDimention.height,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadURL("http://localhost:3000/");

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    // Trigger update check once the window is ready
    mainWindow.once("ready-to-show", () => {
        autoUpdater.checkForUpdatesAndNotify(); // Check for updates
    });
}

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// Auto-updater events
autoUpdater.on("update-available", () => {
    console.log("Update available!");
    mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
    console.log("Update downloaded; will install now");
    mainWindow.webContents.send("update_downloaded");
    autoUpdater.quitAndInstall();
});

app.on("before-quit", () => {
    quitDb();
});

app.on("ready", () => {
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
