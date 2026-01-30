
import { Router } from "express";
import Order from "../models/Order";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.use(authMiddleware);

router.get("/", async (req: any, res) => {
  const orders = await Order.find({ companyId: req.user.id });
  res.json(orders);
});

router.patch("/:id/status", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

export default router;
