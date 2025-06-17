import mongoose, { Schema } from "mongoose";

const descriptionSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

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
    salary: { type: String },
    remote: { type: String },
    tags: { type: [String], default: [] },
    description: [descriptionSchema],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Offer || mongoose.model("Offer", offerSchema);
