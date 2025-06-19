import mongoose, { Schema } from "mongoose";

const workExperienceSchema = new Schema({
    institute: { type: String, required: true },
    role: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: false },
}, { _id: false });

const educationSchema = new Schema({
    institute: { type: String, required: true },
    course: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: false },
}, { _id: false });

const skillsSchema = new Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true }
}, { _id: false });

const portfolioSchema = new Schema({
    label: { type: String, required: false },
    link: {type: String, required: true },
    image: { 
        url: {type: String, required: true },
        id: {type: String, required: true }
    }
}, { _id: false });

const userSchema = new Schema(
    {
        type: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        profile: {
            city: String,
            country: String,
            aboutMe: String,
            aboutMeShort: String,
            yearsExperience: String,
            role: String,
            languages: [String],
            educationLevel: String,
            phone: String,
            contactEmail: String,
            site: String,
            github: String,
            linkedin: String,

            workExperience: [workExperienceSchema],
            education: [educationSchema],
            skills: [skillsSchema],
            portfolio: [portfolioSchema],
            
            pfp: String,
            pfp_id: String,
            banner: String,
            banner_id: String,
            cv: String,
            cv_id: String
        },
        savedOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }],
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;