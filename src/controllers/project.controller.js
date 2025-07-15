import Project from "../models/project.model.js";
import catchAsync from "../utils/catch-async.js";
import apiError from "../utils/api-error.js";
import { cloudinaryImageUpload } from "../utils/cloudinary.js";

// Create Project
export const createProject = catchAsync(async (req, res, next) => {
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
});

// Get All Projects
export const getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({
    status: "success",
    message: "Projects retrieved successfully",
    data: projects,
  });
});

// Get Project by Slug
export const getProjectBySlug = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return next(new apiError("Project not found", 404));
  res.json({
    status: "success",
    message: "Project retrieved successfully",
    data: project,
  });
});

// Get Project by ID
export const getProjectById = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) return next(new apiError("Project not found", 404));
  res.json({
    status: "success",
    message: "Project retrieved successfully",
    data: project,
  });
});

// Update Project
export const updateProject = catchAsync(async (req, res, next) => {
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
});

// Delete Project
export const deleteProject = catchAsync(async (req, res, next) => {
  const deleted = await Project.findByIdAndDelete(req.params.id);
  if (!deleted) return next(new apiError("Project not found", 404));
  res.json({
    status: "success",
    message: "Project deleted successfully",
    data: null,
  });
});
