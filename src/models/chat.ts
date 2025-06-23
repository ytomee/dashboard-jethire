import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderName: { type: String, required: true },
    senderAvatar: { type: String },
    text: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const chatRoomSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true, unique: true },
    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);
