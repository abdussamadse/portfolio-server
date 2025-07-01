import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stack: {
      type: [String],
      required: true,
    },
    current: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
