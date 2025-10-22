import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getCategories,
} from "../controllers/product.controller.js";

const router = express.Router();

// GET /api/products - Get all products (with optional category filter)
router.get("/", getProducts);

// GET /api/products/categories - Get all unique categories
router.get("/categories/all", getCategories);

// GET /api/products/category/:category - Get products by category
router.get("/category/:category", getProductsByCategory);

// GET /api/products/:id - Get a single product
router.get("/:id", getProduct);

// POST /api/products - Create a new product
router.post("/", createProduct);

// PUT /api/products/:id - Update a product
router.put("/:id", updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete("/:id", deleteProduct);

export default router;
