import { Router } from "express";
import Stripe from "stripe";
import Order from "../models/Order";

const router = Router();

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.warn("STRIPE_SECRET_KEY não configurada.");
}

const stripe = new Stripe(stripeSecret as string);

router.post("/create-intent", async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.sendStatus(404);
    }

    const amount = Math.round(((order.amount ?? 0) as number) * 100);

    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "brl",
      metadata: { orderId }
    });

    res.json({ clientSecret: intent.client_secret });
  } catch (error) {
    console.error("Erro ao criar payment intent:", error);
    res.status(500).json({ error: "Erro ao processar pagamento" });
  }
});

export default router;

