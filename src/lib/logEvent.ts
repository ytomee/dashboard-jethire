import Log from "@/models/log";
import { Types } from "mongoose";

export async function logEvent({
  message,
  type,
  userId,
  level = "info",
}: {
  message: string;
  type: "admin" | "company" | "user" | "system";
  userId?: Types.ObjectId | string;
  level?: "info" | "warn" | "error";
}) {
  try {
    await Log.create({ message, type, userId, level });
  } catch (err) {
    console.error("Erro ao gravar log:", err);
  }
}
