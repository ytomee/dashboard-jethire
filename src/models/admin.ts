import mongoose from "mongoose";

const administratorSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  pass: { type: String, required: true },
});

export default mongoose.models.Administrator ||
  mongoose.model("Administrator", administratorSchema);