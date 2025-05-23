import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Company from "@/models/company";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  await dbConnect();

  try {
    const company = await Company.findOne({ "team._id": id }).select("-team -pending").lean();
    if (!company) {
      return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao procurar a empresa." }, { status: 500 });
  }
}
