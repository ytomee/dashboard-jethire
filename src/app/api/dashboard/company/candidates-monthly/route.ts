import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/dbConnect";
import Company from "@/models/company";
import Offer from "@/models/offer";

interface Candidate {
  createdAt?: string | Date;
}

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

  const offers = await Offer.find({ company: company._id });

  const now = new Date();
  const data = [];

  for (let i = 11; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

    let count = 0;

    for (const offer of offers) {
      if (Array.isArray(offer.candidates)) {
        const filtered = offer.candidates.filter((c: Candidate) => {
          const date = c.createdAt ? new Date(c.createdAt) : null;
          return date && date >= start && date < end;
        });
        count += filtered.length;
      }
    }

    data.push({
      month: start.toISOString(),
      count,
    });
  }

  return NextResponse.json(data);
}
