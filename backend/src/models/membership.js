import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;
