
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";

import authRoutes from "./routes/auth.routes";
import menuRoutes from "./routes/menu.routes";
import orderRoutes from "./routes/orders.routes";
import orderAdminRoutes from "./routes/orders.admin.routes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", orderAdminRoutes);

export default app;
