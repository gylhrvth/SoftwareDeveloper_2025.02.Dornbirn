import mysql from "mysql2/promise";
import { config } from "dotenv";

try {
  config(); // Load environment variables from .env file
} catch (error) {
  console.error("Failed to load environment variables:", error);
}

export interface Country {
  Name: string;
  Code: string;
  Capital: string;
  Province: string;
  Area: number;
  Population: number;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "user",
  database: process.env.DB_NAME || "mondial",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getConnection() {
  return pool.getConnection();
}

export async function getAllCountries(): Promise<Country[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.query("SELECT * FROM country");
    return rows as Country[];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}
