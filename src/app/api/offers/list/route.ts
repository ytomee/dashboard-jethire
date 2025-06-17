// Exemplo em Next.js 13/14 (app router)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Offer from "@/models/offer";
import Company from "@/models/company";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const company = await Company.findOne({ "team.email": session.user.email });
  if (!company) {
    return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 });
  }

  const offers = await Offer.find({ company: company._id });
  return NextResponse.json(offers);
}
