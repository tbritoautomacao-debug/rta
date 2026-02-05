import { Router } from "express";
import Order from "../models/Order";
import User from "../models/User";
import { emitOrderUpdate } from "../socket";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, restaurantId, items, amount } = req.body;

    let client = await User.findOne({ email });
    if (!client) {
      client = await User.create({ name, email, role: "client" });
    }

    const order = await Order.create({
      restaurantId,
      clientId: client._id,
      items,
      amount
    });

    if (restaurantId) {
      emitOrderUpdate(restaurantId.toString(), order);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (order?.restaurantId) {
      emitOrderUpdate(order.restaurantId.toString(), order);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar status do pedido" });
  }
});

export default router;

