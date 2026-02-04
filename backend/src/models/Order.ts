
import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  clientId: { type: Schema.Types.ObjectId, ref: "User" },
  items: Array,
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "paid", "preparing", "ready", "out_for_delivery", "delivered"],
    default: "pending"
  }
}, { timestamps: true });

export default model("Order", OrderSchema);
