import mongoose from "mongoose";
import { billingSchema } from "./Billing";
import { recordSchema } from "./Record";
import { appointmentSchema } from "./Appointment";
import { prescriptionSchema } from "./Prescription";

const PatientSchema = new mongoose.Schema({
  // patientId: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  bloodGroup: { type: String, required: true }, // e.g., "A+"
  appointments: [appointmentSchema],
  prescriptions: [prescriptionSchema],
  records: [recordSchema],
  bills: [billingSchema],
  // notifications: [notificationSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Patient =
  mongoose.models["Patient"] || mongoose.model("Patient", PatientSchema);

export default Patient;
