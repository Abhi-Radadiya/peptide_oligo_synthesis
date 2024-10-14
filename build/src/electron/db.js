const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { dialog } = require("electron");

let db;

const fs = require("fs");

let dbDir = "D:/software/peptide_synthesis/settings";
let dbPath = path.join(dbDir, "bottle_mapping.db");

const initializeDB = () => {
    // dialog.showMessageBox({
    //     type: "info",
    //     message: `Attempting to create or access directory at: ${dbDir}`,
    // });

    // Check if the directory exists, if not create it
    if (!fs.existsSync(dbDir)) {
        try {
            dialog.showMessageBox({
                type: "info",
                message: "Directory does not exist, creating...",
            });
            fs.mkdirSync(dbDir, { recursive: true });
            dialog.showMessageBox({
                type: "info",
                message: `Directory created successfully at: ${dbDir}`,
            });
        } catch (err) {
            dialog.showErrorBox("Error", "Failed to create directory: " + err.message);
            return; // Stop execution if the directory can't be created
        }
    } else {
        dialog.showMessageBox({
            type: "info",
            message: "Directory already exists.",
        });
    }

    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            dialog.showErrorBox("Database Error", "Could not open database: " + err.message);
        } else {
            dialog.showMessageBox({
                type: "info",
                message: `Database opened successfully at: ${dbPath}`,
            });
        }
    });

    // db = new sqlite3.Database(dbPath, (err) => {
    //     if (err) {
    //         console.error("Could not open database: " + err.message);
    //     }
    // });

    db.run(
        `CREATE TABLE IF NOT EXISTS amedite_positions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        position TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL);`,
        (err) => {
            if (err) {
                console.error("Could not create table: " + err.message);
            }
        }
    );

    db.run(
        ` CREATE TABLE IF NOT EXISTS reagent_positions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position TEXT NOT NULL UNIQUE,
            value TEXT NOT NULL);`,
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

    db.run(
        `
        CREATE TABLE IF NOT EXISTS reagent (
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
                console.error("Could not create `reagent` table: " + err.message);
            }
        }
    );

    console.log("db initialized ;) ");
};

const quitDb = () => {
    if (db) {
        db.close();
    }
};

const runTransaction = async (queries) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run("BEGIN TRANSACTION");

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
};

const saveBottleMappingData = async (positions, mappingOption) => {
    const queries = Object.entries(positions).map(([position, value]) => {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO ${mappingOption} (position, value) VALUES (?, ?) ON CONFLICT(position) DO UPDATE SET value=?`, [position, value, value], (err) => {
                if (err) {
                    console.error(`Error for ${position} ${mappingOption}: `, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    return runTransaction(queries);
};

const getBottleMappingData = (mappingOption) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${mappingOption}`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const saveBottleMappingDetails = (amediteDetails, mappingOption) => {
    const { full_name, wm, case_no, msds, concentration } = amediteDetails;

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO ${mappingOption} (full_name, wm, case_no, msds, concentration) 
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
};

const getBottleMappingDetails = (mappingOption) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${mappingOption}`, [], (err, rows) => {
            if (err) {
                console.error("Error fetching amedite details: " + err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const updateBottleMappingDetails = (amediteDetails, mappingOption) => {
    const { full_name, wm, case_no, msds, concentration, id } = amediteDetails;

    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE ${mappingOption} 
             SET full_name = ?, wm = ?, case_no = ?, msds = ?, concentration = ?
             WHERE id = ?`,
            [full_name, wm, case_no, msds, concentration, id],
            (err) => {
                if (err) {
                    console.error(`Error updating ${mappingOption} details: ` + err.message);
                    reject(err);
                } else {
                    resolve(`${mappingOption} details updated successfully`);
                }
            }
        );
    });
};

const deleteBottleMappingDetails = (id, mappingOption) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM ${mappingOption} WHERE id = ?`, [id], (err) => {
            if (err) {
                console.error(`Error deleting ${mappingOption} details: ` + err.message);
                reject(err);
            } else {
                resolve(`Amedite with id ${id} deleted successfully`);
            }
        });
    });
};

module.exports = {
    quitDb,
    initializeDB,
    getBottleMappingData,
    saveBottleMappingData,
    getBottleMappingDetails,
    saveBottleMappingDetails,
    updateBottleMappingDetails,
    deleteBottleMappingDetails,
};
