import mysql from 'mysql2/promise';

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
    port: Number(process.env.DB_PORT),
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

export async function getCountryByCode(code: string): Promise<Country | null> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.query("SELECT * FROM country WHERE Code = ?", [code]);
    const countries = rows as Country[];
    return countries.length > 0 ? countries[0] : null;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

export async function getCountriesByPopulation(minPopulation: number): Promise<Country[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.query("SELECT * FROM country WHERE Population >= ?", [minPopulation]);
    return rows as Country[];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

