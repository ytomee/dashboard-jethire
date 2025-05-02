import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL || "";

if (!MONGODB_URI) {
  throw new Error("Definir MONGODB_URI nas variáveis de ambiente");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}