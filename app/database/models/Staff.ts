import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["Doctor", "Nurse", "Admin", "Other"],
    required: true,
  },
  specialty: { type: String }, // e.g., "Cardiology", "General Medicine"
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }, // e.g., "+1 (555) 123-4567"
  department: { type: String }, // e.g., "Cardiology Department"
  availability: [
    {
      day: {
        type: String,
        enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      startTime: { type: String }, // e.g., "08:00 AM"
      endTime: { type: String }, // e.g., "05:00 PM"
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Staff = mongoose.models["Staff"] || mongoose.model("Staff", staffSchema);

export default Staff;
