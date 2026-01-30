
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token ausente" });

  const [, token] = authHeader.split(" ");
  try {
    req.user = jwt.verify(token, jwtConfig.secret);
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
