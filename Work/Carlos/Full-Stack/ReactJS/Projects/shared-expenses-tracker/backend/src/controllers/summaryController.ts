import { Request, Response } from "express";
import { pool } from "../db";

// This endpoint calculates how much each person owes or is owed
export const getSummary = async (req: Request, res: Response) => {
  try {
    // Get all people
    const [peopleRows] = await pool.query("SELECT id, name FROM people");
    const people = peopleRows as { id: number; name: string }[];

    // Get all expenses with participants
    const [expensesRows] = await pool.query(`
      SELECT e.id, e.amount, e.paid_by, ep.person_id
      FROM expenses e
      JOIN expense_participants ep ON e.id = ep.expense_id
    `);

    // Calculate balances
    const balances: { [personId: number]: number } = {};
    people.forEach((p) => (balances[p.id] = 0));

    // Group expenses by expense_id
    const expensesMap: { [expenseId: number]: { amount: number; paid_by: number; participants: number[] } } = {};
    (expensesRows as any[]).forEach((row) => {
      if (!expensesMap[row.id]) {
        expensesMap[row.id] = { amount: row.amount, paid_by: row.paid_by, participants: [] };
      }
      expensesMap[row.id].participants.push(row.person_id);
    });

    // For each expense, split the amount among participants
    Object.values(expensesMap).forEach((expense) => {
      const share = expense.amount / expense.participants.length;
      expense.participants.forEach((pid) => {
        balances[pid] -= share; // Each participant owes their share
      });
      balances[expense.paid_by] += expense.amount; // The payer gets credited the full amount
    });

    // Prepare summary
    const summary = people.map((p) => ({
      id: p.id,
      name: p.name,
      balance: Math.round((balances[p.id] + Number.EPSILON) * 100) / 100, // round to 2 decimals
    }));

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate summary", details: err });
  }
};