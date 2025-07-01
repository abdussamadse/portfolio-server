import express from "express";
import {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getAllExperiences).post(protect, createExperience);

router
  .route("/:id")
  .get(getExperienceById)
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

export default router;
