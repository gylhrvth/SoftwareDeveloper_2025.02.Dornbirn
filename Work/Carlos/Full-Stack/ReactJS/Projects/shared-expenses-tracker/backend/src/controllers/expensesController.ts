import { Request, Response } from "express";
import { pool } from "../db";
import { Expense } from "../types/expense";
import { isPositiveNumber } from "../utils/validate";

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM expenses");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses", details: err });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM expenses WHERE id = ?", [id]);
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json((rows as any[])[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expense", details: err });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  const { description, amount, paid_by, date } = req.body;
  if (!description || !amount || !paid_by) {
    return res.status(400).json({ error: "Description, amount, and paid_by are required" });
  }
  if (!isPositiveNumber(amount)) {
    return res.status(400).json({ error: "Amount must be a positive number" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO expenses (description, amount, paid_by, date) VALUES (?, ?, ?, ?)",
      [description, amount, paid_by, date || null]
    );
    res.status(201).json({ id: (result as any).insertId, description, amount, paid_by, date });
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense", details: err });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, amount, paid_by, date } = req.body;
  if (!description || !amount || !paid_by) {
    return res.status(400).json({ error: "Description, amount, and paid_by are required" });
  }
  try {
    const [result] = await pool.query(
      "UPDATE expenses SET description = ?, amount = ?, paid_by = ?, date = ? WHERE id = ?",
      [description, amount, paid_by, date || null, id]
    );
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json({ id, description, amount, paid_by, date });
  } catch (err) {
    res.status(500).json({ error: "Failed to update expense", details: err });
  }
};


export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Optionally, delete related participants first if you have foreign key constraints
    await pool.query("DELETE FROM expense_participants WHERE expense_id = ?", [id]);
    const [result] = await pool.query("DELETE FROM expenses WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense", details: err });
  }
};