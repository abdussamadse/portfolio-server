import Project from "../models/project.model.js";
import apiError from "../utils/apiError.js";
import { cloudinaryImageUpload } from "../utils/cloudinary.js";

// Create Project
export const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, demoLink, sourceCode, featured } =
      req.body;

    if (!req.files || req.files.length === 0) {
      return next(new apiError("At least one image is required", 400));
    }

    const uploadedImages = await Promise.all(
      req.files.map((file, index) =>
        cloudinaryImageUpload(
          file.buffer,
          `${title}-${index}`,
          "portfolio/projects"
        )
      )
    );

    const imageUrls = uploadedImages.map((img) => img.secure_url);

    const newProject = new Project({
      title,
      description,
      techStack,
      demoLink,
      sourceCode,
      featured,
      images: imageUrls,
    });

    await newProject.save();

    res.status(201).json({
      status: "success",
      message: "Project created successfully",
      data: newProject,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Projects
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({
      status: "success",
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

// Get Project by Slug
export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return next(new apiError("Project not found", 404));
    res.json({
      status: "success",
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// Get Project by ID
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(new apiError("Project not found", 404));
    res.json({
      status: "success",
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// Update Project
export const updateProject = async (req, res, next) => {
  try {
    const { title, description, techStack, demoLink, sourceCode, featured } =
      req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return next(new apiError("Project not found", 404));

    if (title) project.title = title;
    if (description) project.description = description;
    if (techStack) project.techStack = techStack;
    if (demoLink) project.demoLink = demoLink;
    if (sourceCode) project.sourceCode = sourceCode;
    if (featured !== undefined) project.featured = featured;

    if (req.files?.length) {
      const uploadedImages = await Promise.all(
        req.files.map((file, index) =>
          cloudinaryImageUpload(
            file.buffer,
            `${project.title}-${Date.now()}-${index}`,
            "portfolio/projects"
          )
        )
      );
      project.images = uploadedImages.map((img) => img.secure_url);
    }

    await project.save();

    res.json({
      status: "success",
      message: "Project updated successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Project
export const deleteProject = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new apiError("Project not found", 404));
    res.json({
      status: "success",
      message: "Project deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
