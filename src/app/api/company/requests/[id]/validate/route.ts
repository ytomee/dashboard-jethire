import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/dbConnect";
import CompanyRequest from "@/models/companyRequest";
import { Resend } from "resend";
import TokenEmail from "@/emails/TokenEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
      await connectDB();
  
      const { id } = await params;
  
      const company = await CompanyRequest.findById(id);
  
      if (!company) {
        return NextResponse.json({ message: "Empresa não encontrada" }, { status: 404 });
      }
  
      const rawToken = Math.random().toString(36).substr(2);
      const hashedToken = await bcrypt.hash(rawToken, 10); 
  
      company.status = "approved";
      company.activationToken = hashedToken;
      company.activationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expira em 24h
      await company.save();
  
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: company.responsibleEmail,
        subject: `A sua empresa ${company.companyName} foi validada!`,
        react: TokenEmail({ token: rawToken }),
      });
  
      return NextResponse.json({ message: "Empresa validada e email enviado com sucesso" });
    } catch (error) {
      console.error("Erro ao validar a empresa:", error);
      return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}
  
