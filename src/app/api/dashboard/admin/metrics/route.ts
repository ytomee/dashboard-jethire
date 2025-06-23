import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import User from "@/models/user";
import Company from "@/models/company";
import Offer from "@/models/offer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.type !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await User.countDocuments();
  const companies = await Company.countDocuments();
  const offers = await Offer.countDocuments();

  return NextResponse.json({ users, companies, offers });
}
