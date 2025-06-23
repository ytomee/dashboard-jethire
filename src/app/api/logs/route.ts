import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Log from "@/models/log";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || session.user.type !== "admin") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const logs = await Log.find()
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("Erro ao obter logs:", error);
    return NextResponse.json({ error: "Erro ao obter logs" }, { status: 500 });
  }
}
