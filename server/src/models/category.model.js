import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create index for better search performance
categorySchema.index({ name: 1 });

const Category = mongoose.model("Category", categorySchema);

export default Category;
