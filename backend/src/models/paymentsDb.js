import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true, unique: true },
  order_id: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, required: true },
  payer: {
    name: { type: String, required: true },
    document: { type: String, required: true },
    profession: { type: String, required: true },
    email: { type: String, required: true },
    prefix: { type: String, required: true },
    phone: { type: String, required: true },
  },
  description: { type: String, required: true },
  redirect_url: { type: String, required: true },
  approved_date: { type: Date },
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon"},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

PaymentSchema.index({ order_id: 1 });

const PaymentDb = mongoose.model("Payment", PaymentSchema);
export default PaymentDb;
