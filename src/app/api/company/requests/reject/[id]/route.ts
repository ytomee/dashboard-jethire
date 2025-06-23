import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import CompanyRequest from '@/models/companyRequest';
import { logEvent } from '@/lib/logEvent';

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    const company = await CompanyRequest.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );

    if (!company) {
      return NextResponse.json(
        { message: 'Empresa não encontrada' },
        { status: 404 }
      );
    }

    await logEvent({
      message: `Pedido de registo da empresa "${company.companyName}" foi rejeitado.`,
      type: "admin",
      level: "warn",
    });

    return NextResponse.json({
      message: 'Empresa rejeitada com sucesso',
      company,
    });
  } catch (error) {
    console.error('Erro ao rejeitar empresa:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}