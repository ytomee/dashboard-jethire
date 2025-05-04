import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/dbConnect";
import CompanyRequest from "@/models/companyRequest";
import { Resend } from "resend";
import ValidationEmail from "@/emails/ValidationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
      await connectDB();
  
      // Garantir que os parâmetros dinâmicos estão carregados corretamente
      const { id } = await params;
  
      // Encontrar a empresa no banco de dados
      const company = await CompanyRequest.findById(id);
  
      if (!company) {
        return NextResponse.json({ message: "Empresa não encontrada" }, { status: 404 });
      }
  
      // Gerar o token de acesso
      const rawToken = Math.random().toString(36).substr(2); // Token gerado aleatoriamente
      const hashedToken = await bcrypt.hash(rawToken, 10); // Encriptar o token
  
      // Atualizar o estado da empresa para "válido" e adicionar o token e data de expiração
      company.status = "approved";
      company.activationToken = hashedToken;
      company.activationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expira em 24h
      await company.save();
  
      // Enviar o token por email para o responsável
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: company.responsibleEmail,
        subject: `A sua empresa ${company.companyName} foi validada!`,
        react: ValidationEmail({ companyName: company.companyName, token: rawToken }),
      });
  
      return NextResponse.json({ message: "Empresa validada e email enviado com sucesso" });
    } catch (error) {
      console.error("Erro ao validar a empresa:", error);
      return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}
  
