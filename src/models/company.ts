import mongoose, { Schema } from "mongoose";

const descriptionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'manager', 'recruiter'],
      default: 'recruiter',
    },
    pfp: { type: String },
    pfp_id: { type: String },  
    city: { type: String },
    country: { type: String },
    phone: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const companySchema = new Schema(
  {
    type: { type: String, default: "company" },

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

    team: [userSchema],

  },
  { timestamps: true }
);

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;