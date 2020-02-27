const util = require("util");
const mysql = require("mysql");
const colors = require("colors");

const { database } = require("../keys");

/**
 * Connection to the database
 */

//Requering the database keys module//
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        throw err;
        console.error("Something went wrong, connecting to the database");
    }
    if (connection) {
        connection.release();
        console.log("DB connected".blue);
        return;
    }
});

pool.query = util.promisify(pool.query);

module.exports = pool;
