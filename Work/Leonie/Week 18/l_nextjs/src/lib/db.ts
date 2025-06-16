import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
});

export default db;