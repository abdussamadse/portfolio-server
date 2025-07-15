import Skill from "../models/skill.model.js";
import apiError from "../utils/api-error.js";
import catchAsync from "../utils/catch-async.js";

// Create a new skill
export const createSkill = catchAsync(async (req, res, next) => {
  const { name, category, proficiency } = req.body;

  const skillExists = await Skill.findOne({ name });
  if (skillExists) {
    return next(new apiError("Skill already exists", 409));
  }

  const skill = await Skill.create({ name, category, proficiency });

  res.status(201).json({
    status: "success",
    message: "Skill created successfully",
    data: skill,
  });
});

// Get all skills, optionally filtered by category
export const getAllSkills = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category.toLowerCase();
  }

  const skills = await Skill.find(filter).sort({ name: 1 });

  res.json({
    status: "success",
    message: "Skills retrieved successfully",
    data: skills,
  });
});

// Get skill by ID
export const getSkillById = catchAsync(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(new apiError("Skill not found", 404));
  }
  res.json({
    status: "success",
    message: "Skill retrieved successfully",
    data: skill,
  });
});

// Update skill by ID
export const updateSkill = catchAsync(async (req, res, next) => {
  const { name, category, proficiency } = req.body;

  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(new apiError("Skill not found", 404));
  }

  if (name) skill.name = name;
  if (category) skill.category = category.toLowerCase();
  if (proficiency) skill.proficiency = proficiency;

  await skill.save();

  res.json({
    status: "success",
    message: "Skill updated successfully",
    data: skill,
  });
});

// Delete skill by ID
export const deleteSkill = catchAsync(async (req, res, next) => {
  const deleted = await Skill.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return next(new apiError("Skill not found", 404));
  }
  res.json({
    status: "success",
    message: "Skill deleted successfully",
    data: null,
  });
});
