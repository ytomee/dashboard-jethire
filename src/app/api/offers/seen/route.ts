import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/dbConnect";
import Offer from "@/models/offer";

interface CandidateEntry {
  user: { toString(): string };
  isSeen: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { offerId, userId } = await req.json();

    if (!offerId || !userId) {
      return NextResponse.json({ message: "Faltam parâmetros." }, { status: 400 });
    }

    await connectMongoDB();

    const offer = await Offer.findById(offerId);
    if (!offer) {
      return NextResponse.json({ message: "Oferta não encontrada." }, { status: 404 });
    }

    const candidate = (offer.candidates as CandidateEntry[]).find(
      (c) => c.user.toString() === userId
    );

    if (!candidate) {
      return NextResponse.json({ message: "Candidato não encontrado nesta oferta." }, { status: 404 });
    }

    candidate.isSeen = !candidate.isSeen;
    await offer.save();

    return NextResponse.json({
      message: "Estado atualizado com sucesso.",
      isSeen: candidate.isSeen,
    });
  } catch (error) {
    console.error("Erro ao atualizar isSeen:", error);
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
  }
}
