import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/admin";
import Company from "@/models/company";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";

async function deleteFromCloudinary(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Erro ao apagar imagem do Cloudinary:", error);
  }
}

async function uploadToCloudinary(buffer: Buffer) {
  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "pfp",
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
          } else {
            resolve({ secure_url: result.secure_url, public_id: result.public_id });
          }
        }
      )
      .end(buffer);
  });
}

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

      if (teamMember.pfp_id) {
        await deleteFromCloudinary(teamMember.pfp_id);
      }

      const uploadResult = await uploadToCloudinary(buffer);

      teamMember.pfp = uploadResult.secure_url;
      teamMember.pfp_id = uploadResult.public_id;

      await company.save();

      return NextResponse.json({ message: "Imagem do membro da equipa atualizada com sucesso", data: teamMember });
    }

    const admin = await Admin.findById(objectId);
    if (!admin) {
      return NextResponse.json({ error: "Admin não encontrado" }, { status: 404 });
    }

    if (admin.pfp_id) {
      await deleteFromCloudinary(admin.pfp_id);
    }

    const uploadResult = await uploadToCloudinary(buffer);

    admin.pfp = uploadResult.secure_url;
    admin.pfp_id = uploadResult.public_id;

    await admin.save();

    return NextResponse.json({ message: "Imagem do admin atualizada com sucesso", data: admin });

  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    return NextResponse.json({ error: "Erro ao atualizar a imagem" }, { status: 500 });
  }
}
