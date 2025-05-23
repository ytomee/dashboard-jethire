import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Company from "@/models/company";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import mongoose from "mongoose";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();

  const params = await context.params;
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slogan = formData.get("slogan") as string;
    const city = formData.get("city") as string;
    const country = formData.get("country") as string;
    const remote = formData.get("remote") as string;
    const contacts = JSON.parse(formData.get("contacts") as string);
    const tags = JSON.parse(formData.get("tags") as string);
    const descriptions = JSON.parse(formData.get("descriptions") as string);

    const bannerFile = formData.get("banner") as File | null;
    const logoFile = formData.get("logo") as File | null;

    const company = await Company.findOne({ "team._id": id }).select("-team -pending");
    if (!company) {
      return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 });
    }

    if (bannerFile && bannerFile.size > 0) {
      if (company.banner?.public_id) {
        await deleteFromCloudinary(company.banner.public_id);
      }
      const arrayBuffer = await bannerFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploaded = await uploadToCloudinary(buffer);
      company.banner = uploaded;
    }

    if (logoFile && logoFile.size > 0) {
      if (company.logo?.public_id) {
        console.log("Já existia logo. Vai ser agora apagado!");
        await deleteFromCloudinary(company.logo.public_id);
      }
      const arrayBuffer = await logoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploaded = await uploadToCloudinary(buffer);
      company.logo = uploaded;
    }

    company.name = name;
    company.slogan = slogan;
    company.city = city;
    company.country = country;
    company.remote = remote;
    company.contact = contacts;
    company.tags = tags;
    company.description = descriptions;

    await company.save();

    return NextResponse.json({ message: "Perfil atualizado com sucesso" });
  } catch (error) {
    console.error("Erro na atualização do perfil da empresa:", error);
    return NextResponse.json({ error: "Erro ao atualizar o perfil da empresa" }, { status: 500 });
  }
}
