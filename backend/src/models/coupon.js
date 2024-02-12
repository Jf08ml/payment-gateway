import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  active: { type: Boolean, default: true },
  limit: { type: Number, required: true },
  used: { type: Number, default: 0 },
  expiration: { type: Date, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
