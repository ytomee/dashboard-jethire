import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import companyRequest from "@/models/companyRequest";
import Company from "@/models/company";
import { Resend } from "resend";
import CredentialsEmail from "@/emails/CredentialsEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  await dbConnect();
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Token e palavra-passe obrigatórios." }, { status: 400 });
  }

  const requests = await companyRequest.find({
    status: "approved",
    activationToken: { $exists: true, $ne: null },
  });

  for (const reqCompany of requests) {
    const isValid = await bcrypt.compare(token, reqCompany.activationToken);
    const notExpired = reqCompany.activationExpires && reqCompany.activationExpires > new Date();

    if (isValid && notExpired) {
      const baseUsername = reqCompany.companyName.toLowerCase().replace(/\s+/g, "");
      let username = baseUsername;
      let counter = 1;

      while (await Company.exists({ user: username })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newCompany = await Company.create({
        user: username,
        type: "company",
        pass: hashedPassword,
        name: reqCompany.companyName,
        city: reqCompany.city,
        country: reqCompany.country,
        address: reqCompany.address,
        foundationYear: reqCompany.foundedYear,
        contact: {
          email: reqCompany.generalEmail,
          phone: reqCompany.phone,
          website: reqCompany.website,
        },
      });

      await companyRequest.findByIdAndUpdate(reqCompany._id, {
        $unset: { activationToken: 1, activationExpires: 1 },
      });

      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: reqCompany.responsibleEmail,
        subject: `A conta da empresa ${reqCompany.companyName} foi criada com sucesso!`,
        react: CredentialsEmail({
          companyName: reqCompany.companyName,
          username,
          password,
        }),
      });

      return NextResponse.json({ success: true, companyId: newCompany._id });
    }
  }

  return NextResponse.json({ error: "Token inválido ou expirado." }, { status: 401 });
}