import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/admin";
import Company from "@/models/company";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type TeamMember = {
  _id: string;
  password?: string;
  name: string;
  role: string;
  city: string;
  country: string;
  pfp: string;
  socials?: {
    platform: string;
    url: string;
  }[];
};

type CompanyLean = {
  team: TeamMember[];
  name: string;
};

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

  const session = await getServerSession(authOptions);

  if (!session || session.user.id !== id) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  await dbConnect();

  const company = await Company.findOne(
    { "team._id": id },
    { "team.$": 1, name: 1 }
  ).lean<CompanyLean | null>();

  if (company) {
    const user = company.team[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      ...userWithoutPassword,
      companyName: company.name,
    });
  }

  const admin = await Admin.findById(id).select("-password").lean();

  if (admin) {
    return NextResponse.json(admin);
  }

  return NextResponse.redirect(new URL("/", request.url));
}
