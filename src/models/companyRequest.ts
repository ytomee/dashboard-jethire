import mongoose, { Schema } from "mongoose";

const companyRequestSchema = new Schema(
  {
    companyName: { type: String, required: true },
    nif: { type: String, required: true },
    foundedYear: { type: Number },
    country: String,
    city: String,
    address: String,
    generalEmail: {
      type: String,
      match: /.+@.+\..+/,
    },
    phone: String,
    website: String,

    responsiblePerson: { type: String, required: true },
    responsibleEmail: {
      type: String,
      required: true,
      match: /.+@.+\..+/,
    },
    responsiblePhone: { type: String, required: true },

    activationToken: String,
    activationExpires: Date,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const companyRequest =
  mongoose.models.companyRequest ||
  mongoose.model("companyRequest", companyRequestSchema);

export default companyRequest;