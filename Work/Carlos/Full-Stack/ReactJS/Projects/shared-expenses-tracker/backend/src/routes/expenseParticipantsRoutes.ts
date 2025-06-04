import { Router } from "express";
import {
  getParticipantsByExpense,
  addParticipant,
  removeParticipant,
} from "../controllers/expenseParticipantsController";

const router = Router();

router.get("/:expense_id", getParticipantsByExpense);
router.post("/", addParticipant);
router.delete("/", removeParticipant);

export default router;