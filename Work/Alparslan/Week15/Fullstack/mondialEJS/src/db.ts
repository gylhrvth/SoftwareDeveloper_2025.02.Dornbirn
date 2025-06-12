import mysql from 'mysql2/promise';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2/promise';

import dotenv from 'dotenv';



dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
let connection: mysql.Connection;

export const dbConnect = async () => {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database.');
    } catch (error) {
        console.error('MySQL connection error:', error);
        process.exit(1);
    }
}


export const dbCountryList = async () => {
    if (!connection) {
        throw new Error('Database not connected.');
    }
    const [rows, _fields] : [RowDataPacket[], FieldPacket[]] = await connection.query("SELECT code, name FROM country ORDER BY Name", []);
    return rows; 
};


export const dbCountryDetails = async (code: string) => {
    if (!connection) {
        throw new Error('Database not connected.');
    }
    const [rows, _fields] : [RowDataPacket[], FieldPacket[]] = await connection.query("SELECT * FROM country WHERE code = ?", [code]);
    return rows.length !== 0 ? rows[0] : null;
};


export const dbCountrySave = async (country: { Code: string, Name: string, Capital: string, Province: string, Population: Number, Area: Number }) => {
    if (!connection) {
        throw new Error('Database not connected.');
    }
    const [result, _] : [ResultSetHeader, FieldPacket[]] = 
        await connection.execute(
            "UPDATE Country SET Name = ?, Capital=?, Province=?, Area=?, Population=? WHERE code=?", 
            [country.Name, country.Capital, country.Province, country.Area, country.Population, country.Code]
        );
    if (result.affectedRows === 0) {
        throw new Error(`No country found with code ${country.Code}`);
    }
    return;
};