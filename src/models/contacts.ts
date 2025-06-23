import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);