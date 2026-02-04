
import { Router } from "express";
import Stripe from "stripe";
import Order from "../models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const router = Router();

router.post("/create-intent", async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.sendStatus(404);

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(order.amount * 100),
    currency: "brl",
    metadata: { orderId }
  });

  res.json({ clientSecret: intent.client_secret });
});

export default router;
