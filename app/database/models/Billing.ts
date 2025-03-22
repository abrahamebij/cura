import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" }, // e.g., paid, pending
  date: { type: Date, default: Date.now },
  services: [String], // List of services billed
});

const Billing =
  mongoose.models["Billing"] || mongoose.model("Billing", billingSchema);

export default Billing;
export { billingSchema };
