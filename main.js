const { app, BrowserWindow, ipcMain, screen } = require("electron");

const path = require("path");
const { SerialPort } = require("serialport");

let mainWindow;
let activePort = null;

async function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    let screenDimention = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({
        width: screenDimention.width,
        height: screenDimention.height,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadURL("http://localhost:3000");

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
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

const dbPath = path.join(__dirname, "settings", "bottle_mapping", "ameditePositions.db");
let db;
const sqlite3 = require("sqlite3").verbose();

function initializeDB() {
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error("Could not open database: " + err.message);
        }
    });

    db.run(
        `
                CREATE TABLE IF NOT EXISTS amedite_positions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    position TEXT NOT NULL UNIQUE,
                    value TEXT NOT NULL
                );
            `,
        (err) => {
            if (err) {
                console.error("Could not create table: " + err.message);
            }
        }
    );

    db.run(
        `
                CREATE TABLE IF NOT EXISTS reagent_positions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    position TEXT NOT NULL UNIQUE,
                    value TEXT NOT NULL
                );
            `,
        (err) => {
            if (err) {
                console.error("Could not create table: " + err.message);
            }
        }
    );

    db.run(
        `
        CREATE TABLE IF NOT EXISTS amedites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            wm TEXT NOT NULL,
            case_no TEXT NOT NULL,
            msds TEXT NOT NULL,
            concentration REAL NOT NULL
        );
    `,
        (err) => {
            if (err) {
                console.error("Could not create `amedites` table: " + err.message);
            }
        }
    );

    console.log("db intialide");
}

ipcMain.handle("save-bottle-mapping-positions", async (event, positions, mappingOption) => {
    console.log(`positions : `, positions, mappingOption);

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${mappingOption}`, [], (err, rows) => {
            if (err) {
                console.error("Error fetching data: " + err.message);
                reject(err);
                return;
            }

            db.serialize(() => {
                db.run("BEGIN TRANSACTION");

                const queries = Object.entries(positions).map(([position, value]) => {
                    return new Promise((resolve, reject) => {
                        db.run(`INSERT INTO ${mappingOption} (position, value) VALUES (?, ?) ON CONFLICT(position) DO UPDATE SET value=?`, [position, value, value], (err) => {
                            if (err) {
                                console.log(`err for ${position}: `, err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
                });

                Promise.all(queries)
                    .then(() => {
                        db.run("COMMIT", (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    })
                    .catch((err) => {
                        db.run("ROLLBACK");
                        reject(err);
                    });
            });
        });
    });
});

ipcMain.handle("get-bottle-mapping-positions", async (event, mappingOption) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${mappingOption}`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

ipcMain.handle("save-bottle-mapping-details", async (event, amediteDetails) => {
    const { full_name, wm, case_no, msds, concentration } = amediteDetails;

    console.log(`amediteDetails : `, amediteDetails);

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO amedites (full_name, wm, case_no, msds, concentration) 
            VALUES (?, ?, ?, ?, ?)`,
            [full_name, wm, case_no, msds, concentration],
            (err) => {
                if (err) {
                    console.error("Error inserting amedite details: " + err.message);
                    reject(err);
                } else {
                    resolve("Amedite details saved successfully");
                }
            }
        );
    });
});

ipcMain.handle("get-bottle-mapping-details", async (_) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM amedites", [], (err, rows) => {
            if (err) {
                console.error("Error fetching amedite details: " + err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

app.on("before-quit", () => {
    if (db) {
        db.close();
    }
});

app.on("ready", () => {
    initializeDB();
    createWindow();
});
