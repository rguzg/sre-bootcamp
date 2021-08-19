/*
    This file contains database related functions. All of the functions are asynchronous and connect to the
    database using a connection pool.

    The credentials to connect to the database are adquired from the project's environment variables
*/

import * as mysql from "mysql2";
import { createHash } from "crypto";

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

/**
 * Compares a password hash with a user's stored password hash. Returns true if they're the same
 * @param {String} username 
 * @param {String} password
 * @returns {Promise<Boolean>}
 */
export async function ComparePasswords(username, password){
    if(!username || typeof(username) != 'string' || !password || typeof(password) != 'string' ){
        throw new TypeError("Arguments should be a string");
    }

    let query = "SELECT salt FROM users WHERE username = ?"
    let [rows, _] = await pool.query(query, [username]);

    let userSalt = rows[0].salt;
    let generatedHash = createHash('sha512').update(password + userSalt).digest('hex');

    query = "SELECT password FROM users WHERE username = ? AND password = ?";
    [rows, _] = await pool.query(query, [username, generatedHash]);

    if(rows.length == 1){
        return rows[0].password == generatedHash;
    }

    return false;
}