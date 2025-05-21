import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; 
import Admin from "@/models/admin";
import Company from "@/models/company";
import mongoose from "mongoose";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();

  const { phone, socials } = await req.json();

  const params = await context.params;
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const objectId = new mongoose.Types.ObjectId(id);

  try {
    const updatedTeamMember = await Company.findOneAndUpdate(
      { "team._id": objectId },
      { $set: { "team.$.phone": phone, "team.$.socials": socials } },
      { new: true }
    );

    if (updatedTeamMember) {
      return NextResponse.json({
        message: "Membro da equipa atualizado com sucesso",
        data: updatedTeamMember,
      });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { phone, socials },
      { new: true }
    );

    if (updatedAdmin) {
      return NextResponse.json({
        message: "Admin atualizado com sucesso",
        data: updatedAdmin,
      });
    }

    return NextResponse.json({ error: "ID não encontrado" }, { status: 404 });

  } catch (error) {
    console.error("Erro ao atualizar:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}
