/*
    This file contains database related functions. All of the functions are asynchronous and connect to the
    database using a connection pool.

    The credentials to connect to the database are adquired from the project's environment variables
*/

import * as mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    queueLimit: process.env.DB_QUEUE_LIMIT,
    database: "bootcamp_tht",
    waitForConnections: true
}).promise();

/**
 * Returns an object with a specified user's information. If the user's not found, an empty object is returned
 * @param {String} username
 * @returns {Promise} Object that contains the user's information
 */
export async function GetUser(username){
    if(!username || typeof(username) != 'string'){
        throw new TypeError("username argument should be a string");
    }

    let user_info = {};
    let query = "SELECT username, role, salt FROM users WHERE username = ?";

    let [rows, _] = await pool.query(query, [username]);

    if(rows.length == 1){
        user_info = {username: rows[0].username, salt: rows[0].salt, role: rows[0].role};
    }

    return user_info;
}