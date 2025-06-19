import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "database"],
      required: true,
    },
    proficiency: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "beginner",
    },
  },
  { timestamps: true, versionKey: false }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
