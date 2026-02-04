
import { Router } from "express";
import Menu from "../models/Menu";

const router = Router();

router.get("/:restaurantId", async (req, res) => {
  res.json(await Menu.find({ restaurantId: req.params.restaurantId, active: true }));
});

router.post("/", async (req, res) => {
  res.json(await Menu.create(req.body));
});

export default router;
