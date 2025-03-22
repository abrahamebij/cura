import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
  time: { type: Date, required: true, default: new Date() },
  status: { type: String, default: "scheduled" }, // e.g., scheduled, completed, cancelled
  reason: String,
});

const Appointment =
  mongoose.models["Appointment"] ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
export { appointmentSchema };
