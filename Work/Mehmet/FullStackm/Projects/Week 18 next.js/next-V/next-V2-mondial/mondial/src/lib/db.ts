// lib/db.ts
import mysql from "mysql2/promise";

// ---------- TYPES ----------
export interface Country {
  Name: string;
  Code: string;
  Capital: string;
  Province: string;
  Area: number;
  Population: number;
}

export interface Language {
  name: string;         // language name (e.g., English)
  percentage: number;   // percentage of speakers
}

export interface Religion {
  name: string;         // religion name (e.g., Christianity)
  percentage: number;   // percentage of practitioners
}

export interface City {
  Name: string;         // city name (e.g., Berlin)
  Population: Number | null;   // population of the city
  // Removed `percentage` — not needed unless you calculate % of total country pop
}

// ---------- DATABASE POOL ----------
// Creates a connection pool using credentials from .env file
export const pool = mysql.createPool({
  host: process.env.DB_HOST,      // e.g. "localhost"
  user: process.env.DB_USER,      // e.g. "root"
  password: process.env.DB_PASSWORD, // your db password
  database: process.env.DB_NAME,  // e.g. "world"
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ---------- GET ALL COUNTRIES ----------
// Loads all countries from the "country" table
export async function getAllCountries(): Promise<Country[]> {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM country");
    return rows as Country[];
  } catch (error) {
    console.error("Error loading countries:", error);
    throw error;
  } finally {
    if (connection) connection.release(); // Always release to avoid leaks
  }
}

// ---------- GET LANGUAGES BY COUNTRY ----------
// Returns all languages spoken in a given country (by country code)
export async function getCountryLanguages(code: string): Promise<Language[]> {
  const [rows] = await pool.query(`
    SELECT 
      Name AS name,
      Percentage AS percentage
    FROM 
      language
    WHERE 
      Country = ?
    ORDER BY 
      Percentage DESC
  `, [code]); // Use parameterized queries to avoid SQL injection

  return rows as Language[];
}

// ---------- GET RELIGIONS BY COUNTRY ----------
// Returns all religions practiced in a given country
export async function getCountryReligions(code: string): Promise<Religion[]> {
  const [rows] = await pool.query(`
    SELECT 
      Name AS name,
      Percentage AS percentage
    FROM 
      religion
    WHERE 
      Country = ?
    ORDER BY 
      Percentage DESC
  `, [code]);

  return rows as Religion[];
}

// ---------- GET CITIES BY COUNTRY ---------- ✅ FIXED
// Returns major cities in a country (ordered by population)
// ⚠️ Fixed issues:
// - Removed extra comma after SELECT field
// - Return type changed to City[]
export async function getCountryCities(code: string): Promise<City[]> {
  const [rows] = await pool.query(`
    SELECT 
      Name,
      Population
    FROM 
      city
    WHERE 
      Country = ?
    ORDER BY 
      Population DESC
  `, [code]);

  return rows as City[];
}
