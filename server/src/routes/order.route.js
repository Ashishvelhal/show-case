import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByStatus,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

// GET /api/orders - Get all orders
router.get("/", getOrders);

// GET /api/orders/status/:status - Get orders by status
router.get("/status/:status", getOrdersByStatus);

// GET /api/orders/:id - Get a single order
router.get("/:id", getOrder);

// POST /api/orders - Create a new order
router.post("/", createOrder);

// PUT /api/orders/:id - Update an order
router.put("/:id", updateOrder);

// PATCH /api/orders/:id/status - Update order status
router.patch("/:id/status", updateOrderStatus);

// DELETE /api/orders/:id - Delete an order
router.delete("/:id", deleteOrder);

export default router;
