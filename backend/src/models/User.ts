
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["business", "client"], required: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" }
}, { timestamps: true });

export default model("User", UserSchema);
