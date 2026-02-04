
import { Schema, model } from "mongoose";

const RestaurantSchema = new Schema({
  name: String,
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  plan: { type: String, enum: ["free", "pro"], default: "free" }
});

export default model("Restaurant", RestaurantSchema);
