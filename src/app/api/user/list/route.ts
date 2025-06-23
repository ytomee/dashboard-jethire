import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/dbConnect";
import User from "@/models/user";

export async function GET() {
  try {
    await connectMongoDB();

    const users = await User.find({}, {
      name: 1,
      email: 1,
      "profile.pfp": 1,
      "profile.role": 1,
      "profile.city": 1,
      "profile.country": 1
    }).sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro ao buscar utilizadores:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
