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