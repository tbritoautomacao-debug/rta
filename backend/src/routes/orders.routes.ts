
import { Router } from "express";
import Order from "../models/Order";

const router = Router();

router.post("/", async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
});

router.get("/:id/status", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json({ status: order?.status });
});

export default router;
