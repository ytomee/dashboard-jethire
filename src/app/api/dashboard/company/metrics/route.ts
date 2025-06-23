import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/dbConnect";
import Company from "@/models/company";
import Offer from "@/models/offer";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.type !== "company") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const company = await Company.findOne({ "team.email": session.user.email });

  if (!company) {
    return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 });
  }

  const team = company.team?.length || 0;

  const offers = await Offer.find({ company: company._id }, "candidates");

  const offerCount = offers.length;

  const candidates = offers.reduce((total, offer) => {
    return total + (offer.candidates?.length || 0);
  }, 0);

  return NextResponse.json({ team, offers: offerCount, candidates });
}
