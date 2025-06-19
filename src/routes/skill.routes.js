import express from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getAllSkills).post(protect, createSkill);

router
  .route("/:id")
  .get(getSkillById)
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

export default router;
