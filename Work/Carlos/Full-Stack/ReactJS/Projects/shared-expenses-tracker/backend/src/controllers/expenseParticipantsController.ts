import { Request, Response } from "express";
import { pool } from "../db";
import { ExpenseParticipant } from "../types/expenseParticipant";

// Get all participants for an expense
export const getParticipantsByExpense = async (req: Request, res: Response) => {
  const { expense_id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT person_id FROM expense_participants WHERE expense_id = ?",
      [expense_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch participants", details: err });
  }
};

// Add a participant to an expense
export const addParticipant = async (req: Request, res: Response) => {
  const { expense_id, person_id } = req.body;
  if (!expense_id || !person_id) {
    return res.status(400).json({ error: "expense_id and person_id are required" });
  }
  if (typeof expense_id !== "number" || typeof person_id !== "number") {
    return res.status(400).json({ error: "expense_id and person_id must be numbers" });
  }
  try {
    await pool.query(
      "INSERT INTO expense_participants (expense_id, person_id) VALUES (?, ?)",
      [expense_id, person_id]
    );
    res.status(201).json({ expense_id, person_id });
  } catch (err) {
    res.status(500).json({ error: "Failed to add participant", details: err });
  }
};

// Remove a participant from an expense
export const removeParticipant = async (req: Request, res: Response) => {
  const { expense_id, person_id } = req.body;
  if (!expense_id || !person_id) {
    return res.status(400).json({ error: "expense_id and person_id are required" });
  }
  if (typeof expense_id !== "number" || typeof person_id !== "number") {
    return res.status(400).json({ error: "expense_id and person_id must be numbers" });
  }
  try {
    const [result] = await pool.query(
      "DELETE FROM expense_participants WHERE expense_id = ? AND person_id = ?",
      [expense_id, person_id]
    );
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: "Participant not found" });
    }
    res.json({ message: "Participant removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove participant", details: err });
  }
};