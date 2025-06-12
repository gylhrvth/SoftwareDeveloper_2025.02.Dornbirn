import { Request, Response } from "express";
import { pool } from "../db";
import { Person } from "../types/person";
import { isValidEmail } from "../utils/validate";

export const getAllPeople = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM people");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch people", details: err });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM people WHERE id = ?", [id]);
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json((rows as any[])[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch person", details: err });
  }
};

export const addPerson = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (email && !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO people (name, email) VALUES (?, ?)",
      [name, email || null]
    );
    res.status(201).json({ id: (result as any).insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: "Failed to add person", details: err });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const [result] = await pool.query(
      "UPDATE people SET name = ?, email = ? WHERE id = ?",
      [name, email || null, id]
    );
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json({ id, name, email });
  } catch (err) {
    res.status(500).json({ error: "Failed to update person", details: err });
  }
};

export const deletePerson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM people WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json({ message: "Person deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete person", details: err });
  }
};