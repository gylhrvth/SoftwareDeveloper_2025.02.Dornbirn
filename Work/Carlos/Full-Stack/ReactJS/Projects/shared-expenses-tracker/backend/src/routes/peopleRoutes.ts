import { Router } from "express";
import {
  getAllPeople,
  getPersonById,
  addPerson,
  updatePerson,
  deletePerson,
} from "../controllers/peopleController";

const router = Router();

router.get("/", getAllPeople);
router.get("/:id", getPersonById);
router.post("/", addPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

export default router;