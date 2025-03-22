import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  diagnosis: String,
  treatment: String,
  date: { type: Date, default: Date.now },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
});

const Record =
  mongoose.models["Record"] || mongoose.model("Record", recordSchema);

export default Record;
export { recordSchema };
