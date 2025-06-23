import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/dbConnect";
import Offer from "@/models/offer";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.type !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const data = [];

  for (let i = 11; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

    const count = await Offer.countDocuments({
      createdAt: { $gte: start, $lt: end },
    });

    data.push({
      month: start.toISOString(),
      count,
    });
  }

  return NextResponse.json(data);
}
