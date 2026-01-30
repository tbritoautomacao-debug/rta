
import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("✅ MongoDB conectado");
}
