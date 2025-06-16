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
  host: "localhost",
  user: "gyula",
  password: "gyula",
  database: "mondial",
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
