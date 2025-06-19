import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    images: [{ type: String }],
    demoLink: { type: String },
    sourceCode: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

projectSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  let baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Check for existing slugs
  while (await Project.exists({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
  next();
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
