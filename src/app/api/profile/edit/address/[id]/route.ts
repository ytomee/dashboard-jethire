import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; 
import Admin from "@/models/admin";
import Company from "@/models/company";
import mongoose from "mongoose";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  
    await dbConnect();

  const { city, country } = await req.json();

  const params = await context.params;
  const { id } = params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    const objectId = new mongoose.Types.ObjectId(id);

    const updatedTeamMember = await Company.findOneAndUpdate(
      { "team._id": objectId },
      {
        $set: {
          "team.$.city": city,
          "team.$.country": country,
        },
      },
      { new: true }
    );

    if (updatedTeamMember) {
      return NextResponse.json({ message: "Membro da equipa atualizado com sucesso", data: updatedTeamMember });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { city, country },
      { new: true }
    );

    if (updatedAdmin) {
      return NextResponse.json({ message: "Admin atualizado com sucesso", data: updatedAdmin });
    }

    return NextResponse.json({ error: "ID não encontrado" }, { status: 404 });

  } catch {
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}
