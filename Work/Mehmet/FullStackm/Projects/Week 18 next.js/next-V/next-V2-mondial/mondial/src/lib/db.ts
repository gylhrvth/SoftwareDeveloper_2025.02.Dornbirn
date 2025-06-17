// /lib/db.ts

import mysql, { PoolConnection } from "mysql2/promise";

// Interfaces
export interface Country {
  Name: string;
  Code: string;
  Capital: string;
  Province: string;
  Area: number;
  Population: number;
}

export interface City {
  Name: string;
  Population: number;
}

export interface Continent {
  Name: string;
}

// Check required environment variables
const required = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing env: ${key}`);
}

// Create the MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
});

// Utility to get a connection
export async function getConnection(): Promise<PoolConnection> {
  return pool.getConnection();
}

// Get all countries
export async function getAllCountries(): Promise<Country[]> {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM country");
    return rows as Country[];
  } catch (err) {
    console.error("Error in getAllCountries:", err);
    return [];
  } finally {
    conn.release();
  }
}

// Get a country by its code
export async function getCountryByCode(code: string): Promise<Country | null> {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM country WHERE Code = ?", [code]);
    const result = rows as Country[];
    return result[0] || null;
  } catch (err) {
    console.error("Error in getCountryByCode:", err);
    return null;
  } finally {
    conn.release();
  }
}

// Get top 10 cities by population for a given country code
export async function getCitiesByCountryCode(code: string): Promise<City[]> {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT Name, Population FROM city WHERE CountryCode = ? ORDER BY Population DESC LIMIT 10",
      [code]
    );
    return rows as City[];
  } catch (err) {
    console.error("Error in getCitiesByCountryCode:", err);
    return [];
  } finally {
    conn.release();
  }
}

// Get continent name by country code
export async function getContinentByCountryCode(code: string): Promise<Continent | null> {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT continent.Name FROM continent 
       JOIN country ON country.Continent = continent.Code 
       WHERE country.Code = ?`,
      [code]
    );
    const result = rows as Continent[];
    return result[0] || null;
  } catch (err) {
    console.error("Error in getContinentByCountryCode:", err);
    return null;
  } finally {
    conn.release();
  }
}
