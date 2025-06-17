
import mysql from "mysql2/promise";


export interface Country {
  Name: string;
  Code: string;
  Capital: string;
  Province: string;
  Area: number;
  Population: number;
}

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export async function getAllCountries(): Promise<Country[]> {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM country");
    return rows as Country[];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

export interface Language {
  name: string;
  percentage: number;
};

// lib/db.ts
export async function getCountryLanguages(countryCode: string): Promise<Language[]> {
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
  `, [countryCode]);
  
  return rows as Language[];
}


export interface Religion {
  name: string;
  percentage: number; 
}

export async function getCountryReligions(countryCode: string): Promise<Religion[]> {
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
  `, [countryCode]);
  
  return rows as Religion[];
}

