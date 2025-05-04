import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import CompanyRequest from "@/models/companyRequest";

export async function PATCH(
    request: Request,
    context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const company = await CompanyRequest.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!company) {
      return NextResponse.json({ message: "Empresa não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Empresa rejeitada com sucesso", company });
  } catch (error) {
    console.error("Erro ao rejeitar empresa:", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
