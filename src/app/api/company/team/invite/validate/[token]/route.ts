import { NextRequest, NextResponse } from "next/server";
import Company from "@/models/company";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { CredentialsEmail } from "@/emails/CredentialsEmail";
import dbConnect from "@/lib/dbConnect";

const resend = new Resend(process.env.RESEND_API_KEY);

interface PendingMember {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'recruiter';
  status: 'pending' | 'active';
  token: string;
  expiresAt: Date;
}

export async function POST(req: NextRequest) {

  const url = new URL(req.url);
  const token = url.pathname.split('/').pop();

  const { password } = await req.json();
  await dbConnect();
  
  try {

    const company = await Company.findOne({ "pending.token": token });

    if (!company) {
      return NextResponse.json({ error: "Convite inválido." }, { status: 404 });
    }

    const pendingMember = company.pending.find((p: PendingMember) => p.token === token);

    if (!pendingMember || pendingMember.status !== "pending") {
      return NextResponse.json({ error: "Este convite já foi utilizado ou expirou." }, { status: 400 });
    }

    if (new Date(pendingMember.expiresAt) < new Date()) {
      return NextResponse.json({ error: "O convite expirou." }, { status: 400 });
    }

    function removeAccents(str: string): string {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "");
    }

    const baseUsername = `${removeAccents(company.name)}-${removeAccents(pendingMember.name)}`;
    let username = baseUsername;
    let counter = 1;

    while (await Company.exists({ "team.user": username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = {
      user: username,
      name: pendingMember.name,
      email: pendingMember.email,
      password: hashedPassword,
      role: pendingMember.role,
      isActive: true,
    };

    company.team.push(newMember);
    company.pending = company.pending.map((p: PendingMember) => {
      if (p.token === token) {
        return { ...p, status: "active" };
      }
      return p;
    });

    await company.save();

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: pendingMember.email,
      subject: `A sua conta na empresa ${company.name} foi criada com sucesso!`,
      react: CredentialsEmail({
        companyName: company.name,
        username: newMember.user,
        password,
      }),
    });

    return NextResponse.json({ success: true, message: "Conta criada e email enviado." });

  } catch (error) {
    console.error("Erro ao validar convite:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
  
}
