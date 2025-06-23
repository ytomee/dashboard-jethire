import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/logEvent";

import dbConnect from "@/lib/dbConnect";

import Offer from "@/models/offer";
import Company from "@/models/company";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  await dbConnect();
  const company = await Company.findOne({ "team.email": session.user.email });
  if (!company) {
    return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 });
  }

  const data = await req.json();
  const {
    salaryMin,
    salaryMax,
    ...rest
  } = data;

  const newOffer = await Offer.create({
    ...rest,
    salary: {
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
    },
    company: company._id,
  });

  await logEvent({
    message: `A empresa "${company.name}" criou uma nova oferta: ${newOffer.role}`,
    type: "company",
    userId: session?.user?.id,
    level: "info",
  });

  return NextResponse.json(newOffer, { status: 201 });
}
