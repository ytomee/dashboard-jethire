import mongoose, { Schema } from "mongoose";

const descriptionSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const candidateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const offerSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    role: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: String, required: true },
    experience: { type: String },
    salary: {
      salaryMin: {
        type: Number,
        required: false,
      },
      salaryMax: {
        type: Number,
        required: false,
      },
    },
    remote: { type: String },
    tags: { type: [String], default: [] },
    description: [descriptionSchema],
    candidates: [candidateSchema],
    isMinorFriendly: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Offer || mongoose.model("Offer", offerSchema);
