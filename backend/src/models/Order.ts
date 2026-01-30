
import { Schema, model, Types } from "mongoose";

const OrderSchema = new Schema({
  companyId: { type: Types.ObjectId, ref: "User", required: true },
  items: Array,
  customer: {
    name: String,
    phone: String,
    address: String
  },
  status: {
    type: String,
    enum: ["RECEBIDO", "PREPARANDO", "PRONTO", "SAIU_PARA_ENTREGA"],
    default: "RECEBIDO"
  },
  total: Number
}, { timestamps: true });

export default model("Order", OrderSchema);
