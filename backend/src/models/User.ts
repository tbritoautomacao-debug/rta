
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["business"], default: "business" },
  plan: { type: String, enum: ["free", "pro"], default: "free" }
}, { timestamps: true });

export default model("User", UserSchema);
