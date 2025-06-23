import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/contacts";

export async function GET() {
  await dbConnect();

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Erro ao obter contactos:", error);
    return NextResponse.json({ message: "Erro no servidor" }, { status: 500 });
  }
}
