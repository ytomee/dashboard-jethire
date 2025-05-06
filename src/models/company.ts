import mongoose, { Schema } from "mongoose";

const descriptionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    type: { type: String, default: "company" },

    user: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },

    pass: {
      type: String,
      required: true,
    },

    name: { type: String, required: true },
    slogan: String,

    city: String,
    country: String,
    address: String,

    shortDesc: String,
    description: [descriptionSchema],

    field: String, 
    workType: String, 
    foundationYear: Number,

    banner: String,
    banner_id: String,
    pfp: String,
    pfp_id: String,

    contact: {
      email: String,
      phone: String,
      website: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true }
);

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;