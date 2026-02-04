
import { Router } from "express";
import Order from "../models/Order";
import User from "../models/User";
import { emitOrderUpdate } from "../socket";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, restaurantId, items, amount } = req.body;
  let client = await User.findOne({ email });
  if (!client) client = await User.create({ name, email, role: "client" });

  const order = await Order.create({ restaurantId, clientId: client._id, items, amount });
  emitOrderUpdate(restaurantId, order);
  res.json(order);
});

router.put("/:id/status", async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (order) emitOrderUpdate(order.restaurantId.toString(), order);
  res.json(order);
});

export default router;
