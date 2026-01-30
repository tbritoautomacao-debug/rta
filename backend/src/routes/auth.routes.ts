
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { jwtConfig } from "../config/jwt";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });

  res.json({ user, token });
});

export default router;
