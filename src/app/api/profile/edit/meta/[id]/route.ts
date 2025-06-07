import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/admin";
import Company from "@/models/company";
import mongoose from "mongoose";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();

  const params = await context.params;
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const formData = await req.formData();
  const image = formData.get("pfp") as File | null;

  if (!image) {
    return NextResponse.json({ error: "Nenhuma imagem fornecida" }, { status: 400 });
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const objectId = new mongoose.Types.ObjectId(id);

    const company = await Company.findOne({ "team._id": objectId });
    if (company) {
      const teamMember = company.team.id(objectId);

      if (!teamMember) {
        return NextResponse.json({ error: "Membro da equipa não encontrado" }, { status: 404 });
      }

      if (teamMember.logo.public_id) {
        await deleteFromCloudinary(teamMember.logo.public_id);
      }

      const uploadResult = await uploadToCloudinary(buffer);

      teamMember.logo.secure_url = uploadResult.secure_url;
      teamMember.logo.public_id = uploadResult.public_id;

      await company.save();

      return NextResponse.json({ message: "Imagem do membro da equipa atualizada com sucesso", data: teamMember });
    }

    const admin = await Admin.findById(objectId);
    if (!admin) {
      return NextResponse.json({ error: "Admin não encontrado" }, { status: 404 });
    }

    if (admin.logo.public_id) {
      await deleteFromCloudinary(admin.logo.public_id);
    }

    const uploadResult = await uploadToCloudinary(buffer);

    admin.logo.secure_url = uploadResult.secure_url;
    admin.logo.public_id = uploadResult.public_id;

    await admin.save();

    return NextResponse.json({ message: "Imagem do admin atualizada com sucesso", data: admin });

  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    return NextResponse.json({ error: "Erro ao atualizar a imagem" }, { status: 500 });
  }
}
