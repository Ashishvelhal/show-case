import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// GET /api/categories - Get all categories
router.get("/", getCategories);

// GET /api/categories/:id - Get a single category
router.get("/:id", getCategory);

// POST /api/categories - Create a new category
router.post("/", createCategory);

// PUT /api/categories/:id - Update a category
router.put("/:id", updateCategory);

// DELETE /api/categories/:id - Delete a category
router.delete("/:id", deleteCategory);

export default router;
