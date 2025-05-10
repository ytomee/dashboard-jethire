import { NextRequest, NextResponse } from "next/server";
import Company from "@/models/company";
import dbConnect from "@/lib/dbConnect";

export async function GET() {

  try {
    await dbConnect();

    const company = await Company.find().select("-pending -team");

    return NextResponse.json(company);
    
  } catch (error) {
    console.error("Erro ao listar convites:", error);
    return NextResponse.json({ message: "Erro ao obter convites pendentes." }, { status: 500 });
  }
}
