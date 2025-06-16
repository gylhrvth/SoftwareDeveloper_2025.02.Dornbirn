
import mysql from "mysql2/promise";

export interface Country {
  Name: string;
  Code: string;
  Capital: string;
  Province: string;
  Area: number;
  Population: number;
}

const pool = mysql.createPool({
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

