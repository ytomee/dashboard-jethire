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

  const offersPerMonth = Array(12).fill(0);
  const candidatesPerMonth = Array(12).fill(0);

  const allOffers = await Offer.find({ company: company._id });

  for (const offer of allOffers) {
    const offerDate = new Date(offer.createdAt);
    const offerMonth = offerDate.getMonth();
    offersPerMonth[offerMonth] += 1;

    if (Array.isArray(offer.candidates)) {
      for (const candidate of offer.candidates) {
        const createdAt = candidate?.createdAt
          ? new Date(candidate.createdAt)
          : null;

        if (createdAt) {
          const month = createdAt.getMonth();
          candidatesPerMonth[month] += 1;
        }
      }
    }
  }

  return NextResponse.json({
    offers: offersPerMonth,
    applications: candidatesPerMonth,
  });
}
