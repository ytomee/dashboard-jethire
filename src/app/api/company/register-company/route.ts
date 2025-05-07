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
      function removeAccents(str: string): string {
        return str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/\s+/g, "");
      }

      const baseAdminUsername = removeAccents(reqCompany.responsiblePerson);
      const baseCompanyUsername = removeAccents(reqCompany.companyName);
      let username = `${baseCompanyUsername}-${baseAdminUsername}`;
      let adminCounter = 1;

      while (await Company.exists({ "team.user": username })) {
        username = `${baseCompanyUsername}-${baseAdminUsername}${adminCounter}`;
        adminCounter++;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newAdmin = {
        user: username,
        name: reqCompany.responsiblePerson,
        email: reqCompany.responsibleEmail,
        password: hashedPassword,
        role: "admin",
        phone: reqCompany.responsiblePhone,
        isActive: true,
      };

      const newCompany = await Company.create({
        type: "company",
        name: reqCompany.companyName,
        address: reqCompany.address,
        foundationYear: reqCompany.foundationYear,
        contact: {
          email: reqCompany.generalEmail,
          phone: reqCompany.phone,
          website: reqCompany.website,
        },
        isActive: true,
        team: [newAdmin],
      });

      await companyRequest.findByIdAndUpdate(reqCompany._id, {
        $unset: { activationToken: 1, activationExpires: 1 },
      });

      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: reqCompany.responsibleEmail,
        subject: `A conta de administrador da empresa ${reqCompany.companyName} foi criada com sucesso!`,
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