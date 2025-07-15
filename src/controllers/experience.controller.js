import Experience from "../models/experience.model.js";
import apiError from "../utils/api-error.js";
import catchAsync from "../utils/catch-async.js";

// Create a new experience
export const createExperience = catchAsync(async (req, res, next) => {
  const {
    company,
    website,
    location,
    role,
    duration,
    description,
    stack,
    current,
  } = req.body;

  const existing = await Experience.findOne({ company, role, duration });
  if (existing) {
    return next(new apiError("Experience already exists", 409));
  }

  const experience = await Experience.create({
    company,
    website,
    location,
    role,
    duration,
    description,
    stack,
    current,
  });

  res.status(201).json({
    status: "success",
    message: "Experience created successfully",
    data: experience,
  });
});

// Get all experiences
export const getAllExperiences = catchAsync(async (req, res, next) => {
  const experiences = await Experience.find().sort({
    current: -1,
    duration: -1,
  });

  res.json({
    status: "success",
    message: "Experiences retrieved successfully",
    data: experiences,
  });
});

// Get experience by ID
export const getExperienceById = catchAsync(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return next(new apiError("Experience not found", 404));
  }

  res.json({
    status: "success",
    message: "Experience retrieved successfully",
    data: experience,
  });
});

// Update experience by ID
export const updateExperience = catchAsync(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return next(new apiError("Experience not found", 404));
  }

  const updatableFields = [
    "company",
    "website",
    "location",
    "role",
    "duration",
    "description",
    "stack",
    "current",
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      experience[field] = req.body[field];
    }
  });

  await experience.save();

  res.json({
    status: "success",
    message: "Experience updated successfully",
    data: experience,
  });
});

// Delete experience by ID
export const deleteExperience = catchAsync(async (req, res, next) => {
  const deleted = await Experience.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return next(new apiError("Experience not found", 404));
  }

  res.json({
    status: "success",
    message: "Experience deleted successfully",
    data: null,
  });
});
