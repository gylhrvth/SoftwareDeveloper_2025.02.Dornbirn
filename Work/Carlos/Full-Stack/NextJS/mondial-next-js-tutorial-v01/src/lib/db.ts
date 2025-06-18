// src/lib/db.ts

//Imports
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { Country, Language, Religion } from '../types';

// Connection pool Setup
export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    database: process.env.MYSQL_DATABASE, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Fetch all countries
export async function getAllCountries(): Promise<Country[]> { //The function returns a promise that resolves to an array of Country objects
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM country");
        return rows as Country[];
} catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
} finally {
    if (connection) connection.release();
    }
}

// Fetch languages for a specific country
export async function getCountryLanguages(countryCode: string): Promise<Language[]> {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(`
            SELECT 
                Name AS name, 
                Percentage AS percentage 
            FROM language 
            WHERE Country = ? 
            ORDER BY Percentage DESC
        `, [countryCode]
        );
            
            return rows as Language[];
    } catch (error) {
        console.error('Error fetching languages:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
}

}
// Fetch religions for a specific country
export async function getCountryReligions(countryCode: string): Promise<Religion[]> {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(`
            SELECT
                Name AS name,
                Percentage AS percentage
            FROM religion
            WHERE Country = ?
            ORDER BY Percentage DESC
        `, [countryCode]
        );

        return rows as Religion[];
    } catch (error) {
        console.error('Error fetching religions:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

