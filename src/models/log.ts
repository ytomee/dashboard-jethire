import mongoose, { Schema } from "mongoose";

const logSchema = new Schema(
  {
    message: { type: String, required: true },

    type: {
      type: String,
      enum: ["admin", "company", "user", "system"],
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      refPath: "type",
    },

    level: {
      type: String,
      enum: ["info", "warn", "error"],
      default: "info",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Log || mongoose.model("Log", logSchema);
