
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

import peopleRoutes from "./routes/peopleRoutes";
import expensesRoutes from "./routes/expensesRoutes";
import expenseParticipantsRoutes from "./routes/expenseParticipantsRoutes";
import summaryRoutes from "./routes/summaryRoutes";

app.use(express.json());
app.use("/api/people", peopleRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/expense-participants", expenseParticipantsRoutes);
app.use("/api/summary", summaryRoutes);

// Test routes...
app.get("/", (req, res) => {
  res.send("Shared Expenses Tracker backend is running!");
});
app.get("/test-db", async (req, res) => {
  // ...your test-db code...
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});