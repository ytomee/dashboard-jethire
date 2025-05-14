// src/app/api/company/team/invite/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import Company from "@/models/company";
import crypto from "crypto";
import moment from "moment";
import { Resend } from "resend";
import { InviteEmail } from "@/emails/InviteEmail";

interface PendingInvitation {
  email: string;
  role: 'admin' | 'manager' | 'recruiter';
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  const { name, email, role } = await req.json();

  if (!name || !email || !role) {
    return NextResponse.json({ message: "Nome, email e função são obrigatórios." }, { status: 400 });
  }

  try {
    const company = await Company.findOne({ "team._id": id });
    if (!company) {
      return NextResponse.json({ message: "Admin não associado a uma empresa." }, { status: 404 });
    }

    const admin = company.team.find((member: PendingInvitation) => member.role === 'admin');
    if (!admin) {
      return NextResponse.json({ message: "Administrador não encontrado." }, { status: 404 });
    }

    const alreadyInTeam = company.team.some((member: { email: string }) => member.email === email);
    if (alreadyInTeam) {
      return NextResponse.json({ message: "Este utilizador já faz parte da equipa." }, { status: 400 });
    }

    const existingInvitation = company.pending.find((invite: PendingInvitation) => invite.email === email);
    if (existingInvitation) {
      const isExpired = moment().isAfter(existingInvitation.expiresAt);
      
      if (!isExpired) {
        return NextResponse.json({ message: "Convite já enviado e ainda está válido." }, { status: 400 });
      }
    }

    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = moment().add(1, "hour").toDate();

    company.pending.push({
      name,
      email,
      role,
      token,
      expiresAt,
      status: "pending",
    });

    await company.save();

    const inviteLink = `${process.env.NEXTAUTH_URL}invite/${token}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: `Junte-se à equipa ${company.name} na Jet Hire`,
      react: InviteEmail({
        username: name,
        invitedByUsername: admin.name,
        invitedByEmail: admin.email,
        teamName: company.name,
        inviteLink: inviteLink,
      }),
    });

    return NextResponse.json({
      message: "Convite enviado com sucesso.",
      token,
      expiresAt,
    }, { status: 200 });
  } catch (error) {
    console.error("Erro ao convidar membro:", error);
    return NextResponse.json({ message: "Erro ao adicionar membro à empresa." }, { status: 500 });
  }
}
