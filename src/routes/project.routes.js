import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectBySlug,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { uploadMultiple } from "../middlewares/multer.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(protect, uploadMultiple("images", 10), createProject);

router.get("/:id", getProjectById);
router.get("/:slug", getProjectBySlug);
router.put("/:id", protect, uploadMultiple("images", 10), updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
