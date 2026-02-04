
import { Schema, model } from "mongoose";

const MenuSchema = new Schema({
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  name: String,
  price: Number,
  description: String,
  active: { type: Boolean, default: true }
});

export default model("Menu", MenuSchema);
