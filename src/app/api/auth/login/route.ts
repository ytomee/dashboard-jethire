import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import Administrator from "@/models/admin";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { user, pass } = await req.json();

    if (!user || !pass) {
      return NextResponse.json(
        { message: "Credenciais em falta." },
        { status: 400 }
      );
    }

    const admin = await Administrator.findOne({ user });

    if (!admin) {
      return NextResponse.json(
        { message: "Utilizador não encontrado." },
        { status: 401 }
      );
    }
    
    const isPasswordValid = await bcrypt.compare(pass, admin.pass);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Palavra-passe incorreta." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login com sucesso.",
      userType: "admin",
      userId: admin._id,
    });
  } catch (error) {
    console.error("Erro no processo de login:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro no servidor." },
      { status: 500 }
    );
  }
}