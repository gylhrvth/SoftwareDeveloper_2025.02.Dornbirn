export interface Expense {
  id: number;
  description: string;
  amount: number;
  paid_by: number;
  date: string; // or Date if you prefer
}