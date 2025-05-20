import mongoose from "mongoose";

const administratorSchema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'jethire-admin',
    required: true,
  },
  pfp: { type: String },
  pfp_id: { type: String },  
  city: { type: String },
  country: { type: String },
  phone: { type: String },
  isActive: {
    type: Boolean,
    default: true,
  }},
  { _id: true }
);

export default mongoose.models.Administrator ||
  mongoose.model("Administrator", administratorSchema);