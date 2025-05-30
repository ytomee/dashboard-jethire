import { NextRequest, NextResponse } from "next/server";
import Company from "@/models/company";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ message: "ID do administrador em falta." }, { status: 400 });
  }

  try {
    await dbConnect();

    const company = await Company.findOne({ "team._id": id });

    if (!company) {
      return NextResponse.json({ message: "Admin não associado a nenhuma empresa." }, { status: 404 });
    }

    return NextResponse.json({ pending: company.pending || [] });
  } catch (error) {
    console.error("Erro ao listar convites:", error);
    return NextResponse.json({ message: "Erro ao obter convites pendentes." }, { status: 500 });
  }
}
