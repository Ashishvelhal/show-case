import express from "express";
import { createInquiry, getInquiries, updateInquiry, deleteInquiry } from "../controllers/inquiry.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route for contact form submissions
router.post("/", createInquiry);

// Protected routes for admin access
router.get("/", protectRoute, getInquiries);
router.put("/:id", protectRoute, updateInquiry);
router.delete("/:id", protectRoute, deleteInquiry);

export default router;
