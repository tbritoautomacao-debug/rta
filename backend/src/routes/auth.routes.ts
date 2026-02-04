
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Restaurant from "../models/Restaurant";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password, restaurantName } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role: "business" });
  const restaurant = await Restaurant.create({ name: restaurantName, ownerId: user._id });
  user.restaurantId = restaurant._id;
  await user.save();
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password) return res.sendStatus(401);
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.sendStatus(401);
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string);
  res.json({ token, user });
});

export default router;
