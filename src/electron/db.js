const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { app, dialog } = require("electron");

let db;

const fs = require("fs");

let dbDir = path.join(app.getPath("userData"), "settings");
let dbPath = path.join(dbDir, "bottle_mapping.db");

const initializeDB = () => {
    if (!fs.existsSync(dbDir)) {
        try {
            fs.mkdirSync(dbDir, { recursive: true });
        } catch (err) {
            dialog.showErrorBox("Error", `Failed to create directory: ${dbPath} ` + err.message);
            return;
        }
    } else {
    }

    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            dialog.showErrorBox("Database Error", "Could not open database: " + err.message);
        } else {
        }
    });

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

    db.run(
        `
        CREATE TABLE IF NOT EXISTS solvent (
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

    // prime

    db.run(
        `CREATE TABLE IF NOT EXISTS amedite_positions_prime (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        position TEXT NOT NULL UNIQUE,
        value TEXT,
        'check' INTEGER);`, // New column for 'check' (stored as integer: 1 for true, 0 for false, NULL for undefined)
        (err) => {
            if (err) {
                dialog.showErrorBox("Database Error", "Could not create amedite_positions_prime: " + err.message);
            }
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS solvent_positions_prime (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        position TEXT NOT NULL UNIQUE,
        value TEXT,
        'check' INTEGER);`,
        (err) => {
            if (err) {
                console.error("Could not create table: " + err.message);
            }
        }
    );

    // liquid detection

    // db.run(`DROP TABLE IF EXISTS uv_setting`, (err) => {
    //     if (err) {
    //         console.error("Could not drop table: " + err.message);
    //     } else {
    //         console.log("Table fixed_positions dropped successfully.");
    //     }
    // });

    db.run(
        `CREATE TABLE IF NOT EXISTS liquid_detection (
            position TEXT PRIMARY KEY,  
            threshold TEXT,  
            checked INTEGER  
        );`,
        (err) => {
            if (err) {
                dialog.showErrorBox("Database Error", "Could not create liquid_detection: " + err.message);
            }
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS uv_setting (
            id INTEGER PRIMARY KEY,  
            value TEXT,              
            checked INTEGER          
        );`,
        (err) => {
            if (err) {
                dialog.showErrorBox("Database Error", "Could not create uv_setting: " + err.message);
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

// function to get any table data
const getTableData = async (tableName) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
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

// prime function

const savePrimeDetails = async (positions, mappingOption) => {
    const queries = Object.entries(positions).map(([position, { value, check }]) => {
        const checkValue = check === true ? 1 : check === false ? 0 : null;

        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO ${mappingOption} (position, value, "check") VALUES (?, ?, ?)
                ON CONFLICT(position) DO UPDATE SET value=?, "check"=?`,
                [position, value, checkValue, value, checkValue],
                (err) => {
                    if (err) {
                        console.error(`Error for ${position} ${mappingOption}: `, err);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    });

    return runTransaction(queries);
};

const getPrimePosition = (mappingOption) => {
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

// liquid detection
const saveLiquidDetectionDetails = async (positions) => {
    const queries = Object.entries(positions).map(([position, { threshold, checked }]) => {
        const checkedValue = checked === true ? 1 : checked === false ? 0 : null;

        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO liquid_detection (position, threshold, checked) VALUES (?, ?, ?)
                ON CONFLICT(position) DO UPDATE SET threshold=?, checked=?`,
                [position, threshold, checkedValue, threshold, checkedValue],
                (err) => {
                    if (err) {
                        console.error(`Error for ${position}: `, err);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    });

    return runTransaction(queries);
};

const getLiquidDetection = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM liquid_detection`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// uv setting
const saveUVSettings = async (uvSettings) => {
    const queries = Object.entries(uvSettings).map(([id, { value, checked }]) => {
        const checkedValue = checked === true ? 1 : checked === false ? 0 : null;

        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO uv_setting (id, value, checked) VALUES (?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET value=?, checked=?`,
                [id, value, checkedValue, value, checkedValue],
                (err) => {
                    if (err) {
                        console.error(`Error for id ${id}: `, err);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    });

    return runTransaction(queries);
};

module.exports = {
    quitDb,
    initializeDB,

    // get any table data
    getTableData,

    getPrimePosition,
    savePrimeDetails,
    getBottleMappingData,
    saveBottleMappingData,
    getBottleMappingDetails,
    saveBottleMappingDetails,
    updateBottleMappingDetails,
    deleteBottleMappingDetails,

    // liquid detection
    saveLiquidDetectionDetails,
    getLiquidDetection,

    // uv setting
    saveUVSettings,
};
